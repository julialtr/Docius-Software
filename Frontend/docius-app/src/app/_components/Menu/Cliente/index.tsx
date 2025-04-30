"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, BookOpenText, ReceiptText, LogOut, LogIn } from "lucide-react";

import MenuLink from "../Link";
import { CarrinhoCompras } from "@/app/[empresa]/(pages)/Client/Cardapio/CarrinhoCompras";
import { logout } from "@/services/usuario";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";

import { usePathname } from "next/navigation";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { useDadosUsuario } from "@/context/DadosUsuarioContext";
import { useToast } from "@/hooks/use-toast";

export function MenuCliente() {
  const pathname = usePathname();
  const { toast } = useToast();

  const { dadosEmpresa } = useDadosEmpresa();
  const { id, setId } = useDadosUsuario();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [ehAdmin, setEhAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setEhAdmin(userType === "2");
  }, []);

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

  const navLinks = id
    ? ehAdmin
      ? [
          {
            href: `/${dadosEmpresa?.dominio}/`,
            label: "Cardápio",
            icon: BookOpenText,
          },
          {
            href: "#",
            label: "Sair",
            icon: LogOut,
            onClick: () => {
              handleLogout();
              window.location.href = `/${dadosEmpresa?.dominio}/`;
            },
          },
        ]
      : [
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
            href: "#",
            label: "Sair",
            icon: LogOut,
            onClick: () => {
              handleLogout();
              window.location.href = `/${dadosEmpresa?.dominio}/`;
            },
          },
        ]
    : [
        {
          href: `/${dadosEmpresa?.dominio}/`,
          label: "Cardápio",
          icon: BookOpenText,
        },
        {
          href: `/${dadosEmpresa?.dominio}/Login`,
          label: "Entrar",
          icon: LogIn,
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
              <MenuLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => {
                  setIsSheetOpen(false);
                  if (link.onClick) link.onClick();
                }}
              />
            ))}
          </nav>

          {/* Carrinho de compras */}
          <div className="flex items-center gap-2">
            {id && !ehAdmin ? <CarrinhoCompras /> : null}

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
              <SheetTitle />
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
                          isActive(link.href) ||
                          (link.label === "Cardápio" &&
                            isActive(`/${dadosEmpresa?.dominio}/`))
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                        }`}
                        onClick={() => {
                          setIsSheetOpen(false);
                          if (link.onClick) link.onClick();
                        }}
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
