"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, BookOpenText, ReceiptText, LogOut } from "lucide-react";

import MenuLink from "../Link";
import { CarrinhoCompras } from "@/app/[empresa]/(pages)/Client/Cardapio/CarrinhoCompras";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";

import { usePathname } from "next/navigation";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

export function MenuCliente() {
  const pathname = usePathname();

  const { dadosEmpresa } = useDadosEmpresa();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    {
      href: `/${dadosEmpresa?.dominio}/Client/Cardapio`,
      label: "Cardápio",
      icon: BookOpenText,
    },
    {
      href: `/${dadosEmpresa?.dominio}/Client/Pedidos`,
      label: "Pedidos",
      icon: ReceiptText,
    },
    {
      href: `/${dadosEmpresa?.dominio}/`,
      label: "Sair",
      icon: LogOut,
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    dadosEmpresa && (
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 transition-shadow">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="p-1 shrink-0">
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

          {/* Menu expandido */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <MenuLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Carrinho de compras */}
          <div className="flex items-center gap-2">
            <CarrinhoCompras />

            {/* Menu discreto */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-amber-200"
                >
                  <Menu className="h-5 w-5 text-amber-800" />
                </Button>
              </SheetTrigger>
              <SheetTitle/>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div
                    className={`flex items-center gap-2 justify-center py-4 border-b`}
                  >
                    <Image
                      src={`/assets/${dadosEmpresa?.caminhoLogo}?height=100&width=100`}
                      alt="Logo"
                      width={100}
                      height={100}
                      priority
                    />
                  </div>

                  <nav className="flex flex-col py-4 flex-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                          isActive(link.href)
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                        }`}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    )
  );
}
