"use client";

import type React from "react";

import { useState } from "react";
import {
  UtensilsCrossed,
  LayoutDashboard,
  ClipboardList,
  ShoppingCart,
  Package,
  Coffee,
  LogOut,
  Users,
  Truck,
  Egg,
  Book,
  DollarSign,
  Search,
  ChevronDown,
  ArrowUpDown,
  ChevronUp,
  ChevronDownIcon,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Button } from "@/app/_components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/_components/ui/collapsible";
import { Input } from "@/app/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";

// Tipos
type SortConfig = {
  key: keyof Cliente;
  direction: "asc" | "desc";
} | null;

interface Cliente {
  id: number;
  nome: string;
  email: string;
  pedidos: number;
}

// Dados mockados para exemplo
const clientesData = [
  { id: 1, nome: "Maria Silva", email: "maria@email.com", pedidos: 15 },
  { id: 2, nome: "João Santos", email: "joao@email.com", pedidos: 8 },
  { id: 3, nome: "Ana Oliveira", email: "ana@email.com", pedidos: 23 },
  { id: 4, nome: "Pedro Costa", email: "pedro@email.com", pedidos: 5 },
  { id: 5, nome: "Lucia Pereira", email: "lucia@email.com", pedidos: 12 },
  { id: 6, nome: "Carlos Souza", email: "carlos@email.com", pedidos: 19 },
  { id: 7, nome: "Julia Lima", email: "julia@email.com", pedidos: 7 },
  { id: 8, nome: "Roberto Alves", email: "roberto@email.com", pedidos: 31 },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Função para ordenar
  const sortData = (data: Cliente[]): Cliente[] => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Função para requisitar ordenação
  const requestSort = (key: keyof Cliente) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const getSortIcon = (columnKey: keyof Cliente) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    );
  };

  // Filtra e ordena os dados
  const filteredClientes = sortData(
    clientesData.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const MenuLink = ({
    href,
    icon: Icon,
    label,
    isActive = false,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
  }) => {
    const content = (
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
          ${
            isActive
              ? "text-amber-900 bg-amber-100"
              : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
          }
          ${isSidebarCollapsed ? "justify-center" : ""}
        `}
      >
        <Icon className="h-5 w-5" />
        {!isSidebarCollapsed && <span>{label}</span>}
      </Link>
    );

    return isSidebarCollapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      content
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
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
            {isSidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>

          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div
              className={`flex items-center gap-2 ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <UtensilsCrossed className="h-6 w-6 text-amber-600" />
              {!isSidebarCollapsed && (
                <span className="font-semibold text-lg text-amber-900">
                  Doce Confeitaria
                </span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            <MenuLink
              href="/admin/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
            />

            <div>
              <Collapsible defaultOpen>
                <CollapsibleTrigger
                  className={`flex w-full items-center px-4 py-2 text-amber-900 bg-amber-50 rounded-md
                  ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
                >
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
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
                    href="/admin/cadastros/clientes"
                    icon={Users}
                    label="Clientes"
                    isActive
                  />
                  <MenuLink
                    href="/admin/cadastros/fornecedores"
                    icon={Truck}
                    label="Fornecedores"
                  />
                  <MenuLink
                    href="/admin/cadastros/ingredientes"
                    icon={Egg}
                    label="Ingredientes"
                  />
                  <MenuLink
                    href="/admin/cadastros/receitas"
                    icon={Book}
                    label="Receitas"
                  />
                  <MenuLink
                    href="/admin/cadastros/gastos-fixos"
                    icon={DollarSign}
                    label="Gastos Fixos"
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>

            <MenuLink
              href="/admin/pedidos"
              icon={ShoppingCart}
              label="Pedidos"
            />

            <MenuLink href="/admin/estoque" icon={Package} label="Estoque" />

            <MenuLink href="/admin/cardapio" icon={Coffee} label="Cardápio" />
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className={`w-full text-gray-700 hover:text-red-600 hover:bg-red-50
                ${
                  isSidebarCollapsed
                    ? "justify-center px-2"
                    : "justify-start px-4"
                }`}
            >
              <LogOut className="h-5 w-5" />
              {!isSidebarCollapsed && <span>Sair</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h1>
            <p className="text-gray-600">
              Gerencie os clientes cadastrados no sistema
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => requestSort("nome")}
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Nome
                      {getSortIcon("nome")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => requestSort("email")}
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Email
                      {getSortIcon("email")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => requestSort("pedidos")}
                      className="hover:bg-transparent p-0 font-semibold flex items-center justify-end ml-auto"
                    >
                      Quantidade de Pedidos
                      {getSortIcon("pedidos")}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {cliente.nome}
                    </TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell className="text-right">
                      {cliente.pedidos}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
