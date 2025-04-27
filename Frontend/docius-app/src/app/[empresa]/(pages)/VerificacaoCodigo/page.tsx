"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { verificacaoCodigo } from "@/services/usuario";

import Logo from "@/app/_components/Logo";
import { Input } from "@/app/_components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { Warning } from "@/hooks/warning";

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const { dadosEmpresa } = useDadosEmpresa();

  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const tamanhoCodigo = 6;

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, [tamanhoCodigo]);

  const handleVerificacaoCodigo = async (codigo: string) => {
    setIsVerifying(true);

    try {
      await verificacaoCodigo({ codigo: codigo });

      toast({
        title: "Código verificado com sucesso",
        description: "Você será redirecionado para redefinir sua senha",
        variant: "success",
      });
  
      router.push(`/${dadosEmpresa?.dominio}/RedefinirSenha`);
      router.refresh();
    } catch (error) {
      if (error instanceof Warning) {
        console.log(error);

        toast({
          variant: "warning",
          title: "Erro ao verificar código",
          description: error.message,
        });
      } else if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao verificar código",
          description: error.message,
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Ignora se não for um número
    if (value && !/^\d*$/.test(value)) return;

    // Pega apenas o último caractere se mais de um for colado
    const ultimoCaractere = value.slice(-1);

    const novoCodigo = [...codigo];
    novoCodigo[index] = ultimoCaractere;
    setCodigo(novoCodigo);

    // Se um dígito foi inserido e não é o último campo, move para o próximo
    if (ultimoCaractere && index < tamanhoCodigo - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verifica se o código está completo
    const codigoCompleto = novoCodigo.join("");
    if (
      codigoCompleto.length === tamanhoCodigo &&
      novoCodigo.every((digit) => digit !== "")
    ) {
      handleVerificacaoCodigo(codigoCompleto);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Se pressionar backspace em um campo vazio, move para o anterior
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Se pressionar seta esquerda, move para o campo anterior
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Se pressionar seta direita, move para o próximo campo
    if (e.key === "ArrowRight" && index < tamanhoCodigo - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const codigoCopiado = e.clipboardData.getData("text/plain").trim();

    // Verifica se o conteúdo colado contém apenas números
    if (!/^\d*$/.test(codigoCopiado)) return;

    // Pega apenas os primeiros 6 caracteres
    const digitos = codigoCopiado.slice(0, tamanhoCodigo).split("");

    const novoCodigo = [...codigo];

    digitos.forEach((digit, index) => {
      if (index < tamanhoCodigo) {
        novoCodigo[index] = digit;
      }
    });

    setCodigo(novoCodigo);

    // Foca no próximo campo vazio ou no último se todos estiverem preenchidos
    const proximoCampoVazio = novoCodigo.findIndex((digit) => !digit);
    if (proximoCampoVazio !== -1) {
      inputRefs.current[proximoCampoVazio]?.focus();
    } else {
      inputRefs.current[tamanhoCodigo - 1]?.focus();
    }

    // Verifica se o código está completo
    const codigoCompleto = novoCodigo.join("");
    if (
      codigoCompleto.length === tamanhoCodigo &&
      novoCodigo.every((digit) => digit !== "")
    ) {
      handleVerificacaoCodigo(codigoCompleto);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        <Logo />

        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm order-2">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-amber-900">
              Código de verificação
            </CardTitle>
            <p className="text-muted-foreground">
              Informe o código de verificação enviado para seu e-mail para
              prosseguir com a redefinição de senha
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2">
              {Array.from({ length: tamanhoCodigo }).map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={codigo[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="h-14 w-12 text-center text-xl font-bold md:h-16 md:w-14"
                  disabled={isVerifying}
                  aria-label={`Dígito ${index + 1} do código de verificação`}
                />
              ))}
            </div>
            <div className="mt-6 text-center text-sm">
              Não recebeu o código?{" "}
              <Link
                href={`/${dadosEmpresa?.dominio}/EsqueceuSenha`}
                className="text-amber-700 hover:text-amber-900 hover:underline"
              >
                Reenviar código
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
