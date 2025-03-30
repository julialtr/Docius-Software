"use client";

import type React from "react";
import {
  PlusCircle,
  Pencil,
  ChevronDown,
  ChevronRight,
  MenuIcon,
  FolderPlus,
  ClipboardList,
} from "lucide-react";

import AlertaExclusao from "./(CategoriaProduto)/AlertaExclusao";
import ListaProdutos from "./ListaProdutos";
import { ReadCardapio } from "./interfaces";
import { ReadCategoriaProduto } from "./(CategoriaProduto)/interfaces";
import { ReadProduto } from "../Cadastros/Produtos/interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

export default function ListaItens({
  dados,
  produtos,
  onDadosChange,
  onCategoriaChange,
  onProdutoChange,
  onIsDialogOpenChange,
  onCategoriaSuperiorIdChange,
  onIsDialogProductOpenChange,
}: {
  dados: ReadCardapio;
  produtos: ReadProduto[];
  onDadosChange: (novoDado: ReadCardapio) => void;
  onCategoriaChange: (categoria: ReadCategoriaProduto | null) => void;
  onProdutoChange: (produto: ReadProduto | null) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onCategoriaSuperiorIdChange: (categoriaSuperiorId: number | null) => void;
  onIsDialogProductOpenChange: (isDialogProductOpen: boolean) => void;
}) {
  const handleOpenDialog = (
    isDialogProductOpen: boolean,
    parentId?: number,
    categoria?: ReadCategoriaProduto
  ) => {
    onIsDialogProductOpenChange(isDialogProductOpen);
    onCategoriaSuperiorIdChange(parentId ?? null);

    if (categoria) {
      onCategoriaChange(categoria);
    } else {
      onProdutoChange(null);
      onCategoriaChange(null);
    }

    onIsDialogOpenChange(true);
  };

  const toggleCategoria = (id: number) => {
    const updateOpenState = (
      categorias: ReadCategoriaProduto[]
    ): ReadCategoriaProduto[] => {
      return categorias.map((categoria) => {
        if (categoria.id === id) {
          return { ...categoria, isOpen: !categoria.isOpen };
        }
        return {
          ...categoria,
          categoriaProdutoInferior: updateOpenState(
            categoria.categoriaProdutoInferior
          ),
        };
      });
    };

    const novoCardapio = {
      ...dados,
      categoriaProduto: updateOpenState(dados.categoriaProduto),
    };

    onDadosChange(novoCardapio);
  };

  const renderCategoria = (categoria: ReadCategoriaProduto, level = 0) => {
    return (
      <div key={categoria.id} className={`ml-${level * 4} mb-4`}>
        <Collapsible
          open={categoria.isOpen}
          onOpenChange={() => toggleCategoria(categoria.id)}
          className="border rounded-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between w-full p-4 bg-amber-50 hover:bg-amber-100 transition-colors">
            <CollapsibleTrigger className="flex items-center gap-2 text-left">
              {categoria?.isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="font-medium">{categoria.nome}</span>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      handleOpenDialog(false, categoria.id);
                    }}
                  >
                    <FolderPlus className="mr-2 h-4 w-4" />
                    <span>Adicionar Subcategoria</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 ${
                      produtos.length ? "" : "opacity-50"
                    }`}
                    onClick={() => {
                      handleOpenDialog(true, categoria.id);
                    }}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    <span>Adicionar Produto</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  handleOpenDialog(false, undefined, categoria);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <AlertaExclusao
                dados={dados}
                categoria={categoria}
                onDadosChange={onDadosChange}
              />
            </div>
          </div>
          <CollapsibleContent>
            <div className="p-4 space-y-4 bg-white">
              {/* Itens da categoria */}
              <ListaProdutos
                dados={dados}
                categoria={categoria}
                onDadosChange={onDadosChange}
              />

              {/* Subcategorias */}
              {categoria.categoriaProdutoInferior.map((subcategoria) =>
                renderCategoria(subcategoria, level + 1)
              )}

              {categoria.produto.length === 0 &&
                categoria.categoriaProdutoInferior.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Nenhum produto ou subcategoria adicionada.
                  </div>
                )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {dados.categoriaProduto.length > 0 ? (
        dados.categoriaProduto.map((categoria) => renderCategoria(categoria))
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <MenuIcon className="h-12 w-12 text-amber-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma categoria adicionada
          </h3>
          <p className="text-gray-600 mb-4">
            Comece adicionando uma categoria ao seu cardápio.
          </p>
        </div>
      )}
    </div>
  );
}
