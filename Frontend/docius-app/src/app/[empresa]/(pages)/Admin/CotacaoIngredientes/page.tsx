"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Store,
  ExternalLink,
  PlusCircle,
  Pencil,
  Trash2,
  AlertTriangle,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  MapPin,
  Globe,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Label } from "@/app/_components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Menu from "@/app/_components/Menu";

// Tipos
interface Fornecedor {
  id: number;
  nome: string;
  endereco: string;
  site: string;
  automatico?: boolean;
}

interface Cotacao {
  id: string;
  nome: string;
  preco: number;
  fornecedorId: number;
  fornecedor: Fornecedor;
  quantidade: string;
  unidade: string;
  marca?: string;
  url?: string;
  manual?: boolean;
  dataCotacao: Date;
}

// Dados mockados
const fornecedoresData: Fornecedor[] = [
  {
    id: 1,
    nome: "Fort Atacadista",
    endereco:
      "Av. Governador Ivo Silveira, 2445 - Capoeiras, Florianópolis - SC",
    site: "www.fort.com.br",
    automatico: true,
  },
  {
    id: 2,
    nome: "Giassi Supermercados",
    endereco: "R. Fulvio Aducci, 930 - Estreito, Florianópolis - SC",
    site: "www.giassi.com.br",
    automatico: true,
  },
  {
    id: 3,
    nome: "Atacadão",
    endereco: "Rod. SC-401, 3597 - Saco Grande, Florianópolis - SC",
    site: "www.atacadao.com.br",
  },
  {
    id: 4,
    nome: "Distribuidora de Doces Sabor & Cia",
    endereco: "R. Delminda Silveira, 235 - Agronômica, Florianópolis - SC",
    site: "www.saborecia.com.br",
  },
  {
    id: 5,
    nome: "Makro Atacadista",
    endereco: "Rod. BR-101, km 210 - Barreiros, São José - SC",
    site: "www.makro.com.br",
  },
];

// Função para gerar ID único
const generateId = () => Math.random().toString(36).substring(2, 9);

// Função para gerar dados mockados de cotação
const gerarCotacoesMock = (
  termo: string,
  fornecedoresIds: number[]
): Cotacao[] => {
  if (!termo.trim()) return [];

  const cotacoes: Cotacao[] = [];
  const termoLower = termo.toLowerCase();

  // Simula resultados diferentes para cada fornecedor
  fornecedoresIds.forEach((fornecedorId) => {
    const fornecedor = fornecedoresData.find((f) => f.id === fornecedorId);
    if (!fornecedor) return;

    // Simula 1-3 resultados por fornecedor
    const numResultados = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numResultados; i++) {
      // Gera variações de nome baseadas no termo de busca
      let nome = "";
      let marca = "";
      let quantidade = "";
      let unidade = "";

      if (termoLower.includes("chocolate")) {
        nome = `Chocolate ${
          i === 0 ? "em Pó" : i === 1 ? "em Barra" : "Granulado"
        } ${i === 0 ? "50%" : i === 1 ? "Meio Amargo" : "Colorido"}`;
        marca = i === 0 ? "Garoto" : i === 1 ? "Nestlé" : "Dr. Oetker";
        quantidade = i === 0 ? "200" : i === 1 ? "500" : "80";
        unidade = "g";
      } else if (termoLower.includes("leite")) {
        nome = `Leite ${
          i === 0 ? "Condensado" : i === 1 ? "em Pó" : "Integral"
        } ${i === 0 ? "Tradicional" : i === 1 ? "Desnatado" : "UHT"}`;
        marca = i === 0 ? "Moça" : i === 1 ? "Ninho" : "Tirol";
        quantidade = i === 0 ? "395" : i === 1 ? "400" : "1";
        unidade = i === 2 ? "L" : "g";
      } else if (termoLower.includes("farinha")) {
        nome = `Farinha de ${
          i === 0 ? "Trigo" : i === 1 ? "Milho" : "Amêndoas"
        } ${i === 0 ? "Tradicional" : i === 1 ? "Flocada" : "Premium"}`;
        marca = i === 0 ? "Dona Benta" : i === 1 ? "Yoki" : "Qualitá";
        quantidade = i === 0 ? "1" : i === 1 ? "500" : "200";
        unidade = i === 0 ? "kg" : "g";
      } else {
        nome = `${termo.charAt(0).toUpperCase() + termo.slice(1)} ${
          i === 0 ? "Premium" : i === 1 ? "Tradicional" : "Especial"
        }`;
        marca = i === 0 ? "Marca A" : i === 1 ? "Marca B" : "Marca C";
        quantidade = i === 0 ? "500" : i === 1 ? "250" : "1";
        unidade = i === 2 ? "kg" : "g";
      }

      // Gera preço aleatório entre 5 e 50
      const preco = Math.random() * 45 + 5;

      // URL fictícia para o produto
      const url = `https://${fornecedor.site}/produto/${nome
        .toLowerCase()
        .replace(/\s+/g, "-")}`;

      cotacoes.push({
        id: generateId(),
        nome,
        preco: Number(preco.toFixed(2)),
        fornecedorId: fornecedor.id,
        fornecedor,
        quantidade,
        unidade,
        marca,
        url,
        dataCotacao: new Date(),
      });
    }
  });

  return cotacoes;
};

// Unidades de medida disponíveis
const unidadesMedida = [
  { valor: "g", label: "Gramas (g)" },
  { valor: "kg", label: "Quilogramas (kg)" },
  { valor: "ml", label: "Mililitros (ml)" },
  { valor: "l", label: "Litros (l)" },
  { valor: "un", label: "Unidade (un)" },
  { valor: "cx", label: "Caixa (cx)" },
  { valor: "pct", label: "Pacote (pct)" },
];

export default function CotacaoPage() {
  const { toast } = useToast();
  const [termoBusca, setTermoBusca] = useState("");
  const [fornecedoresSelecionados, setFornecedoresSelecionados] = useState<
    number[]
  >([1, 2]); // Fort e Giassi pré-selecionados
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [filtroCotacoes, setFiltroCotacoes] = useState("");
  const [ordenacao, setOrdenacao] = useState<{
    campo: keyof Cotacao;
    direcao: "asc" | "desc";
  }>({
    campo: "preco",
    direcao: "asc",
  });
  const [cotacaoEmEdicao, setCotacaoEmEdicao] = useState<Cotacao | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    preco: "",
    quantidade: "",
    unidade: "",
    fornecedorId: "",
  });

  // Efeito para inicializar o formulário quando uma cotação é selecionada para edição
  useEffect(() => {
    if (cotacaoEmEdicao) {
      setFormData({
        nome: cotacaoEmEdicao.nome,
        marca: cotacaoEmEdicao.marca || "",
        preco: cotacaoEmEdicao.preco.toString(),
        quantidade: cotacaoEmEdicao.quantidade,
        unidade: cotacaoEmEdicao.unidade,
        fornecedorId: cotacaoEmEdicao.fornecedorId.toString(),
      });
    } else {
      resetForm();
    }
  }, [cotacaoEmEdicao]);

  // Função para resetar o formulário
  const resetForm = () => {
    setFormData({
      nome: "",
      marca: "",
      preco: "",
      quantidade: "",
      unidade: "g",
      fornecedorId: fornecedoresSelecionados[0]?.toString() || "1",
    });
  };

  // Função para buscar cotações
  const buscarCotacoes = async () => {
    if (!termoBusca.trim()) {
      toast({
        title: "Termo de busca vazio",
        description: "Digite um termo para buscar cotações.",
        variant: "destructive",
      });
      return;
    }

    if (fornecedoresSelecionados.length === 0) {
      toast({
        title: "Nenhum fornecedor selecionado",
        description: "Selecione pelo menos um fornecedor para buscar cotações.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Gera dados mockados
      const novasCotacoes = gerarCotacoesMock(
        termoBusca,
        fornecedoresSelecionados
      );

      setCotacoes(novasCotacoes);

      toast({
        title: "Cotação realizada",
        description: `Foram encontrados ${novasCotacoes.length} resultados para "${termoBusca}".`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar cotações",
        description: "Ocorreu um erro ao buscar as cotações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para adicionar/editar cotação manual
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.preco ||
      !formData.quantidade ||
      !formData.unidade ||
      !formData.fornecedorId
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const fornecedor = fornecedoresData.find(
      (f) => f.id.toString() === formData.fornecedorId
    );
    if (!fornecedor) {
      toast({
        title: "Fornecedor inválido",
        description: "Selecione um fornecedor válido.",
        variant: "destructive",
      });
      return;
    }

    const novaCotacao: Cotacao = {
      id: cotacaoEmEdicao?.id || generateId(),
      nome: formData.nome,
      marca: formData.marca || undefined,
      preco: Number(formData.preco),
      quantidade: formData.quantidade,
      unidade: formData.unidade,
      fornecedorId: Number(formData.fornecedorId),
      fornecedor,
      manual: true,
      dataCotacao: new Date(),
    };

    if (cotacaoEmEdicao) {
      // Editar cotação existente
      setCotacoes(
        cotacoes.map((c) => (c.id === cotacaoEmEdicao.id ? novaCotacao : c))
      );
      toast({
        title: "Cotação atualizada",
        description: "A cotação foi atualizada com sucesso.",
        variant: "success",
      });
    } else {
      // Adicionar nova cotação
      setCotacoes([...cotacoes, novaCotacao]);
      toast({
        title: "Cotação adicionada",
        description: "A cotação foi adicionada manualmente com sucesso.",
        variant: "success",
      });
    }

    handleCloseDialog();
  };

  // Função para excluir cotação
  const handleDelete = (id: string) => {
    setCotacoes(cotacoes.filter((c) => c.id !== id));
    toast({
      title: "Cotação removida",
      description: "A cotação foi removida com sucesso.",
      variant: "success",
    });
  };

  // Função para abrir o diálogo de edição
  const handleOpenDialog = (cotacao?: Cotacao) => {
    if (cotacao) {
      setCotacaoEmEdicao(cotacao);
    } else {
      setCotacaoEmEdicao(null);
      resetForm();
    }
    setIsDialogOpen(true);
  };

  // Função para fechar o diálogo
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCotacaoEmEdicao(null);
    resetForm();
  };

  // Função para alternar a seleção de um fornecedor
  const toggleFornecedor = (id: number) => {
    setFornecedoresSelecionados((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Função para ordenar as cotações
  const ordenarCotacoes = (campo: keyof Cotacao) => {
    setOrdenacao((prev) => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === "asc" ? "desc" : "asc",
    }));
  };

  // Função para formatar preço
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Filtra e ordena as cotações
  const cotacoesFiltradas = cotacoes
    .filter(
      (cotacao) =>
        cotacao.nome.toLowerCase().includes(filtroCotacoes.toLowerCase()) ||
        cotacao.marca?.toLowerCase().includes(filtroCotacoes.toLowerCase()) ||
        cotacao.fornecedor.nome
          .toLowerCase()
          .includes(filtroCotacoes.toLowerCase())
    )
    .sort((a, b) => {
      const valorA = a[ordenacao.campo];
      const valorB = b[ordenacao.campo];

      if (typeof valorA === "string" && typeof valorB === "string") {
        return ordenacao.direcao === "asc"
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }

      if (typeof valorA === "number" && typeof valorB === "number") {
        return ordenacao.direcao === "asc" ? valorA - valorB : valorB - valorA;
      }

      if (valorA instanceof Date && valorB instanceof Date) {
        return ordenacao.direcao === "asc"
          ? valorA.getTime() - valorB.getTime()
          : valorB.getTime() - valorA.getTime();
      }

      return 0;
    });

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (campo: keyof Cotacao) => {
    if (ordenacao.campo !== campo) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return ordenacao.direcao === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  // Função para lidar com mudanças nos inputs do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com mudanças nos selects do formulário
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu/>
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Cotação de Ingredientes
            </h1>
            <p className="text-gray-600">
              Pesquise e compare preços de ingredientes em diferentes
              fornecedores
            </p>
          </div>

          <Tabs defaultValue="busca" className="space-y-6">
            <TabsList>
              <TabsTrigger value="busca">Busca de Cotações</TabsTrigger>
              <TabsTrigger value="resultados">
                Resultados ({cotacoesFiltradas.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="busca" className="space-y-6">
              {/* Alerta sobre cotações automáticas */}
              <Alert
                variant="default"
                className="bg-amber-50 border-amber-200 text-amber-800"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Cotações automáticas</AlertTitle>
                <AlertDescription>
                  As cotações automáticas estão disponíveis apenas para Fort
                  Atacadista e Giassi Supermercados. Para outros fornecedores,
                  você precisará adicionar as cotações manualmente.
                </AlertDescription>
              </Alert>

              {/* Campo de busca */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Buscar Ingredientes</CardTitle>
                  <CardDescription>
                    Digite o nome do ingrediente para buscar cotações nos
                    fornecedores selecionados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Digite o nome do ingrediente (ex: chocolate em pó, leite condensado)"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      onClick={buscarCotacoes}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 min-w-[120px]"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Buscando...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Buscar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de fornecedores */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fornecedores</CardTitle>
                  <CardDescription>
                    Selecione os fornecedores para incluir na busca de cotações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fornecedoresData.map((fornecedor) => (
                      <div
                        key={fornecedor.id}
                        className="flex items-start space-x-3 p-3 rounded-md border hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={`fornecedor-${fornecedor.id}`}
                          checked={fornecedoresSelecionados.includes(
                            fornecedor.id
                          )}
                          onCheckedChange={() =>
                            toggleFornecedor(fornecedor.id)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor={`fornecedor-${fornecedor.id}`}
                              className="text-base font-medium cursor-pointer"
                            >
                              {fornecedor.nome}
                              {fornecedor.automatico && (
                                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                                  Cotação Automática
                                </Badge>
                              )}
                            </Label>
                          </div>
                          <div className="mt-1 text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                            {fornecedor.endereco}
                          </div>
                          <div className="mt-1 text-sm">
                            <a
                              href={`https://${fornecedor.site}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-700 hover:text-amber-900 flex items-center"
                            >
                              <Globe className="h-3.5 w-3.5 mr-1" />
                              {fornecedor.site}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resultados" className="space-y-6">
              {/* Alerta sobre dados temporários */}
              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Dados temporários</AlertTitle>
                <AlertDescription>
                  As cotações são temporárias e não serão salvas no banco de
                  dados. Os preços refletem o momento atual da consulta.
                </AlertDescription>
              </Alert>

              {/* Ações e filtro */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Filtrar resultados..."
                    value={filtroCotacoes}
                    onChange={(e) => setFiltroCotacoes(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={() => handleOpenDialog()}
                  className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 sm:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Cotação Manual
                </Button>
              </div>

              {/* Tabela de resultados */}
              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => ordenarCotacoes("nome")}
                          className="hover:bg-transparent p-0 font-semibold flex items-center"
                        >
                          Produto
                          {renderSortIcon("nome")}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            ordenarCotacoes("marca" as keyof Cotacao)
                          }
                          className="hover:bg-transparent p-0 font-semibold flex items-center"
                        >
                          Marca
                          {renderSortIcon("marca" as keyof Cotacao)}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => ordenarCotacoes("preco")}
                          className="hover:bg-transparent p-0 font-semibold flex items-center"
                        >
                          Preço
                          {renderSortIcon("preco")}
                        </Button>
                      </TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            ordenarCotacoes(
                              "fornecedor" as unknown as keyof Cotacao
                            )
                          }
                          className="hover:bg-transparent p-0 font-semibold flex items-center"
                        >
                          Fornecedor
                          {renderSortIcon(
                            "fornecedor" as unknown as keyof Cotacao
                          )}
                        </Button>
                      </TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cotacoesFiltradas.length > 0 ? (
                      cotacoesFiltradas.map((cotacao) => (
                        <TableRow
                          key={cotacao.id}
                          className={cotacao.manual ? "bg-amber-50/30" : ""}
                        >
                          <TableCell className="font-medium">
                            {cotacao.url ? (
                              <a
                                href={cotacao.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-700 hover:text-amber-900 hover:underline flex items-center"
                              >
                                {cotacao.nome}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            ) : (
                              cotacao.nome
                            )}
                            {cotacao.manual && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Manual
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{cotacao.marca || "-"}</TableCell>
                          <TableCell className="font-medium text-green-700">
                            {formatMoney(cotacao.preco)}
                          </TableCell>
                          <TableCell>
                            {cotacao.quantidade} {cotacao.unidade}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Store className="h-4 w-4 text-gray-500" />
                              {cotacao.fornecedor.nome}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-amber-700 hover:text-amber-900"
                                onClick={() => handleOpenDialog(cotacao)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-700 hover:text-red-900"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirmar exclusão
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir esta
                                      cotação? Esta ação não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(cotacao.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-muted-foreground"
                        >
                          {cotacoes.length === 0 ? (
                            <div className="flex flex-col items-center gap-2">
                              <ShoppingCart className="h-8 w-8 text-gray-300" />
                              <p>
                                Nenhuma cotação encontrada. Faça uma busca para
                                ver resultados.
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Search className="h-8 w-8 text-gray-300" />
                              <p>
                                Nenhum resultado corresponde ao filtro aplicado.
                              </p>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {/* Dialog para adicionar/editar cotação */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {cotacaoEmEdicao
                    ? "Editar Cotação"
                    : "Adicionar Cotação Manual"}
                </DialogTitle>
                <DialogDescription>
                  {cotacaoEmEdicao
                    ? "Edite as informações da cotação no formulário abaixo."
                    : "Preencha as informações da cotação manual no formulário abaixo."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Nome do produto"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marca">Marca</Label>
                    <Input
                      id="marca"
                      name="marca"
                      value={formData.marca}
                      onChange={handleInputChange}
                      placeholder="Marca do produto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      name="preco"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.preco}
                      onChange={handleInputChange}
                      placeholder="0,00"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade</Label>
                      <Input
                        id="quantidade"
                        name="quantidade"
                        value={formData.quantidade}
                        onChange={handleInputChange}
                        placeholder="Quantidade"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unidade">Unidade</Label>
                      <Select
                        value={formData.unidade}
                        onValueChange={(value) =>
                          handleSelectChange("unidade", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {unidadesMedida.map((unidade) => (
                            <SelectItem
                              key={unidade.valor}
                              value={unidade.valor}
                            >
                              {unidade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fornecedorId">Fornecedor</Label>
                    <Select
                      value={formData.fornecedorId}
                      onValueChange={(value) =>
                        handleSelectChange("fornecedorId", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {fornecedoresData.map((fornecedor) => (
                          <SelectItem
                            key={fornecedor.id}
                            value={fornecedor.id.toString()}
                          >
                            {fornecedor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
