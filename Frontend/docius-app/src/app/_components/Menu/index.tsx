"use client";

import type React from "react";
import { useState } from "react";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { useDadosUsuario } from "@/context/DadosUsuarioContext";
import { useDadosMenu } from "@/context/DadosMenuContext";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FilePlus2,
  ReceiptText,
  Package,
  BookOpenText,
  LogOut,
  Users,
  Truck,
  Book,
  DollarSign,
  ChevronDown,
  Menu,
  Layers,
  ClipboardList,
  Calculator,
  Tag,
} from "lucide-react";

import { logout } from "@/services/autenticacao";

import { Button } from "@/app/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";

import MenuLink from "./Link";

import { useToast } from "@/hooks/use-toast";

export default function MenuComponent() {
  const { toast } = useToast();
  const pathname = usePathname();

  const {isCadastroMenuOpen, setIsCadastroMenuOpen} = useDadosMenu();
  const { dadosEmpresa } = useDadosEmpresa();
  const { setId } = useDadosUsuario();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      setId(0);
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      await logout();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: error.message,
        });
      }
    }
  };

  return (
    dadosEmpresa && (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-20" : "w-64"
          } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative flex flex-col h-screen`}
        >
          <div className="flex flex-col h-full">
            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-white shadow-md z-10"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Logo */}
            <div className="p-1 border-b border-gray-200 shrink-0">
              <div className={`flex items-center gap-2 justify-center`}>
                <Image
                  src={`/assets/${dadosEmpresa?.caminhoLogo}?height=100&width=100`}
                  alt="Logo"
                  width={100}
                  height={100}
                  priority
                />
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <MenuLink
                href={`/${dadosEmpresa?.dominio}/Admin/Dashboard`}
                icon={LayoutDashboard}
                label="Dashboard"
                isSidebarCollapsed={isSidebarCollapsed}
              />

              <div>
                <Collapsible defaultOpen={isCadastroMenuOpen}>
                  <CollapsibleTrigger
                    className={`flex w-full items-center px-4 py-2 ${
                      pathname.includes("Cadastros/")
                        ? "text-amber-900 bg-amber-50"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    } rounded-md
                    ${
                      isSidebarCollapsed ? "justify-center" : "justify-between"
                    }`}
                    onClick={() => setIsCadastroMenuOpen(!isCadastroMenuOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <FilePlus2
                        className={isSidebarCollapsed ? "h4 w-4 " : "h-6 w-6"}
                      />
                      {!isSidebarCollapsed && <span>Cadastros</span>}
                    </div>
                    {!isSidebarCollapsed && <ChevronDown className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent
                    className={`mt-1 space-y-1 ${
                      isSidebarCollapsed ? "" : "pl-4"
                    }`}
                  >
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Clientes`}
                      icon={Users}
                      label="Clientes"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Fornecedores`}
                      icon={Truck}
                      label="Fornecedores"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/CategoriasIngredientes`}
                      icon={Layers}
                      label="Categorias de Ingredientes"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Ingredientes`}
                      icon={Package}
                      label="Ingredientes"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Receitas`}
                      icon={Book}
                      label="Receitas"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Produtos`}
                      icon={ClipboardList}
                      label="Produtos"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/GastosFixos`}
                      icon={DollarSign}
                      label="Gastos Fixos"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Precificacao`}
                      icon={Calculator}
                      label="Precificação"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                    <MenuLink
                      href={`/${dadosEmpresa?.dominio}/Admin/Cadastros/Cardapio`}
                      icon={BookOpenText}
                      label="Cardápio"
                      isSidebarCollapsed={isSidebarCollapsed}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <MenuLink
                href={`/${dadosEmpresa?.dominio}/Admin/Pedidos`}
                icon={ReceiptText}
                label="Pedidos"
                isSidebarCollapsed={isSidebarCollapsed}
              />

              <MenuLink
                href={`/${dadosEmpresa?.dominio}/Admin/CotacaoIngredientes`}
                icon={Tag}
                label="Cotação de Ingredientes"
                isSidebarCollapsed={isSidebarCollapsed}
              />
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200 shrink-0">
              <Link href={`/${dadosEmpresa?.dominio}`} passHref legacyBehavior>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`w-full text-gray-700 hover:text-red-600 hover:bg-red-50
                ${
                  isSidebarCollapsed
                    ? "justify-center px-2"
                    : "justify-start px-4"
                }`}
                >
                  <LogOut
                    className={isSidebarCollapsed ? "h4 w-4" : "h-6 w-6"}
                  />
                  {!isSidebarCollapsed && <span>Sair</span>}
                </Button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    )
  );
}
