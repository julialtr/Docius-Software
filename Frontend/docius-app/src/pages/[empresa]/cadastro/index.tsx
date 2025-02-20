"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { UtensilsCrossed, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function CadastroPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro na senha",
        description: "As senhas não coincidem. Por favor, verifique.",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Aqui você adicionaria a lógica real de cadastro
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulação de requisição

      toast({
        variant: "success",
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso.",
      })

      // Aqui você redirecionaria o usuário ou faria login automático
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Não foi possível criar sua conta. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        {/* Seção do Logo */}
        <div className="text-center lg:w-1/3 space-y-4 order-1 lg:order-none">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-gradient-to-r from-amber-600 to-red-600 p-3">
              <UtensilsCrossed className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Doce Confeitaria
            </h1>
            <p className="text-muted-foreground max-w-[250px]">
              Junte-se a nós e descubra um mundo de sabores especiais
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Doce 1"
              width={200}
              height={200}
              className="rounded-2xl object-cover"
            />
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Doce 2"
              width={200}
              height={200}
              className="rounded-2xl object-cover mt-8"
            />
          </div>
        </div>

        {/* Formulário de Cadastro */}
        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-amber-900">Criar conta</CardTitle>
            <p className="text-muted-foreground">Preencha os dados abaixo para começar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Maria Silva"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="maria@exemplo.com"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
            <div className="mt-6 text-center space-y-4">
              <div className="text-sm">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-amber-700 hover:text-amber-900 hover:underline">
                  Entre aqui
                </Link>
              </div>
              <Button variant="ghost" className="text-amber-700 hover:text-amber-900" asChild>
                <Link href="/login" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para o login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

