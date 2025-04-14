"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QrCodePix } from "qrcode-pix";
import Image from "next/image";
import {
  QrCode,
  Clock,
  Clipboard,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";

import Loading from "@/app/loading";
import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";
import { findProdutos } from "@/services/produto";
import { CreatePedido, DetalhesPedido } from "../../Admin/Pedidos/interfaces";

import { MenuCliente } from "@/app/_components/Menu/Cliente";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";

import { formatDate, formatMoney } from "@/utils/format";
import { useToast } from "@/hooks/use-toast";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { useDadosUsuario } from "@/context/DadosUsuarioContext";
import { DadosCarrinhoComprasProvider } from "@/context/DadosCarrinhoComprasContext";
import { createPedido } from "@/services/pedido";
import { CreatePersonalizacao } from "../Cardapio/interfaces";

export default function Pagamento() {
  const { toast } = useToast();
  const router = useRouter();
  const { dadosEmpresa } = useDadosEmpresa();
  const { id } = useDadosUsuario();
  const [isLoading, setIsLoading] = useState(false);

  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [pixCode, setPixCode] = useState<string>("");

  const [detalhesPedido, setDetalhesPedido] = useState<DetalhesPedido | null>(
    null
  );
  const [produtos, setProdutos] = useState<ReadProduto[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findProdutos();
        setProdutos(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler produtos",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    async function geraPix() {
      const qrCodePix = QrCodePix({
        version: "01",
        key: dadosEmpresa?.chavePix ?? "",
        name: dadosEmpresa?.nome ?? "",
        city: dadosEmpresa?.cidade ?? "",
        transactionId: detalhesPedido?.numeroPedido,
        message: `Pagamento 50% - PED-${detalhesPedido?.numeroPedido}`,
        value: (detalhesPedido?.precoTotal ?? 0) / 2,
      });

      setPixCode(qrCodePix.payload());
      setQrCode(await qrCodePix.base64());
    }

    if (!dadosEmpresa) return;

    if (detalhesPedido?.precoTotal && detalhesPedido?.precoTotal != 0)
      void geraPix();
  }, [detalhesPedido?.precoTotal, dadosEmpresa]);

  const getProduto = (id: number) => {
    return produtos.find((produto) => produto.id === id);
  };

  useEffect(() => {
    const pedido = localStorage.getItem(`pedido-${id}`);
    if (pedido) {
      try {
        setDetalhesPedido(JSON.parse(pedido));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler detalhes do pedido",
            description: error.message,
          });
        }

        handleCloseDialog();
      }
    } else {
      handleCloseDialog();
    }
  }, [router, dadosEmpresa]);

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleCloseDialog = () => {
    if (dadosEmpresa) {
      criaPedido();

      localStorage.removeItem(`pedido-${id}`);
      localStorage.removeItem(`carrinhoCompras-${id}`);
      router.push(`/${dadosEmpresa?.dominio}/Client/Cardapio`);
    }
  };

  const redirecionaPedidos = () => {
    if (detalhesPedido && dadosEmpresa) {
      criaPedido();

      localStorage.removeItem(`pedido-${id}`);
      localStorage.removeItem(`carrinhoCompras-${id}`);
      router.push(`/${dadosEmpresa?.dominio}/Client/Pedidos`);
    }
  };

  const criaPedido = async () => {
    if (!detalhesPedido) return;   

    try {
      const [horas, minutos] = detalhesPedido.horaEntrega.split(":").map(Number);

      const dataComHora = new Date(detalhesPedido.dataEntrega);
      dataComHora.setHours(horas);
      dataComHora.setMinutes(minutos);
    
      const pedido: CreatePedido = {
        identificador: detalhesPedido.numeroPedido,
        dataHoraEntrega: dataComHora.toISOString().replace("Z", ""),
        usuarioId: id,
        pedidoProduto: detalhesPedido.pedidoProduto?.map((pp) => ({
          id: pp.id,
          pedidoId: pp.pedidoId,
          quantidade: pp.quantidade,
          produtoId: pp.produtoId,
          personalizacao: pp.personalizacao
            ? ({
                descricao: pp.personalizacao?.descricao,
                personalizacaoFoto: pp.personalizacao?.personalizacaoFoto.map(
                  (pf) => ({
                    caminhoFoto: pf.caminhoFoto,
                  })
                ),
              } as CreatePersonalizacao)
            : undefined,
        })),
      };

      await createPedido(pedido);

      toast({
        title: "Pedido criado",
        description: "O pedido foi criado com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao concluir pedido",
          description: error.message,
        });
      }
    }
  };

  return isLoading || !detalhesPedido ? (
    <Loading />
  ) : (
    qrCode && (
      <DadosCarrinhoComprasProvider>
        <div className="min-h-screen bg-gray-50">
          <MenuCliente />

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <QrCode className="h-8 w-8 text-amber-600" />
                </div>
                <h1 className="text-3xl font-bold text-amber-900">
                  Pagamento do pedido
                </h1>
                <p className="mt-2 text-gray-600">
                  Pedido #PED-{detalhesPedido.numeroPedido}
                </p>
              </div>

              <Alert className="mb-6 bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">
                  Política de pagamento
                </AlertTitle>
                <AlertDescription className="text-amber-700">
                  Para garantir seu pedido, é necessário o pagamento de 50% do
                  valor total via PIX antecipadamente. O valor restante deverá
                  ser pago no momento da retirada.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <QrCode className="h-5 w-5 text-amber-600" />
                      Pagamento via PIX
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg border mb-4">
                      <Image
                        src={qrCode}
                        alt="QR Code PIX"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>

                    <div className="w-full">
                      <p className="text-sm text-gray-500 mb-1">Código PIX:</p>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-50 p-2 rounded border text-xs overflow-hidden overflow-ellipsis whitespace-nowrap flex-1">
                          {pixCode}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copiarPix}
                          className="shrink-0"
                        >
                          {copied ? (
                            <ClipboardCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clipboard className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2">
                    <p className="font-medium">Valor a pagar agora:</p>
                    <p className="text-2xl font-bold text-amber-700">
                      {formatMoney(detalhesPedido.precoTotal / 2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Valor restante a pagar na entrega:{" "}
                      {formatMoney(detalhesPedido.precoTotal / 2)}
                    </p>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                      Detalhes do pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Data e hora de entrega:
                      </p>
                      <p className="font-medium">
                        {formatDate(detalhesPedido.dataEntrega)} às{" "}
                        {detalhesPedido.horaEntrega}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        Itens do pedido:
                      </p>
                      <ul className="space-y-2">
                        {detalhesPedido.pedidoProduto?.map((item, index) => {
                          const produto = getProduto(item.produtoId);

                          return (
                            <li key={index} className="flex justify-between">
                              <span>
                                {produto?.nome}{" "}
                                {item.quantidade > 1 && `(x${item.quantidade})`}
                              </span>
                              <span className="font-medium">
                                {formatMoney(
                                  produto?.preco ?? 0 * item.quantidade
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatMoney(detalhesPedido.precoTotal)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={redirecionaPedidos}
                      className="w-full"
                      variant="outline"
                    >
                      Acompanhar pedido
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Após realizar o pagamento, seu pedido estará pendente de
                  confirmação com a confeitaria. Acompanhe seu pedido pela aba
                  de Pedidos e caso surgir alguma dúvida, entre em contato com a
                  confeitaria.
                </p>
                <Button
                  onClick={handleCloseDialog}
                  variant="ghost"
                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                >
                  Voltar ao cardápio
                </Button>
              </div>
            </div>
          </main>
        </div>
      </DadosCarrinhoComprasProvider>
    )
  );
}
