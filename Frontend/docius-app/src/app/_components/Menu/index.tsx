"use client";

import type React from "react";
import { useState } from "react";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

import Image from "next/image";
import Link from "next/link";

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
  PackageCheck,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";

import MenuLink from "./Link";

export default function MenuComponent() {
  const { dadosEmpresa } = useDadosEmpresa();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-white shadow-md"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Logo */}
          <div className="p-1 border-b border-gray-200">
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
          <nav className="flex-1 p-4 space-y-1">
            <MenuLink
              href={`/${dadosEmpresa?.dominio}/Dashboard`}
              icon={LayoutDashboard}
              label="Dashboard"
              isSidebarCollapsed={isSidebarCollapsed}
            />

            <div>
              <Collapsible defaultOpen>
                <CollapsibleTrigger
                  className={`flex w-full items-center px-4 py-2 text-amber-900 bg-amber-50 rounded-md
                  ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
                >
                  <div className="flex items-center gap-2">
                    <FilePlus2
                      className={isSidebarCollapsed ? "h4 w-4" : "h-6 w-6"}
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
                    href={`/${dadosEmpresa?.dominio}/Cadastros/Clientes`}
                    icon={Users}
                    label="Clientes"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/Fornecedores`}
                    icon={Truck}
                    label="Fornecedores"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/CategoriasIngredientes`}
                    icon={Layers}
                    label="Categorias de Ingredientes"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/Ingredientes`}
                    icon={Package}
                    label="Ingredientes"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/Receitas`}
                    icon={Book}
                    label="Receitas"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/Produtos`}
                    icon={ClipboardList}
                    label="Produtos"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                  <MenuLink
                    href={`/${dadosEmpresa?.dominio}/Cadastros/GastosFixos`}
                    icon={DollarSign}
                    label="Gastos Fixos"
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>

            <MenuLink
              href={`/${dadosEmpresa?.dominio}/Pedidos`}
              icon={ReceiptText}
              label="Pedidos"
              isSidebarCollapsed={isSidebarCollapsed}
            />

            <MenuLink
              href={`/${dadosEmpresa?.dominio}/Estoque`}
              icon={PackageCheck}
              label="Estoque"
              isSidebarCollapsed={isSidebarCollapsed}
            />

            <MenuLink
              href={`/${dadosEmpresa?.dominio}/Cardapio`}
              icon={BookOpenText}
              label="Cardápio"
              isSidebarCollapsed={isSidebarCollapsed}
            />
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Link href={`/${dadosEmpresa?.dominio}`} passHref legacyBehavior>
              <Button
                variant="ghost"
                className={`w-full text-gray-700 hover:text-red-600 hover:bg-red-50
                ${
                  isSidebarCollapsed
                    ? "justify-center px-2"
                    : "justify-start px-4"
                }`}
              >
                <LogOut className={isSidebarCollapsed ? "h4 w-4" : "h-6 w-6"} />
                {!isSidebarCollapsed && <span>Sair</span>}
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
