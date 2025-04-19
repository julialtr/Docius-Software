import { useState } from "react";
import { Maximize2 } from "lucide-react";

import { ReadPedidoProduto } from "../Cardapio/interfaces";

import { ImageViewer } from "@/app/_components/ImageViewer";

import { formatMoney } from "@/utils/format";
import { LINK_API } from "@/utils/constants";

export function CardItemPedido({
  itemPedido,
}: {
  itemPedido: ReadPedidoProduto;
}) {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [indiceInicial, setIndiceInicial] = useState(0);

  const openImageViewer = (index: number) => {
    setIndiceInicial(index);
    setImageViewerOpen(true);
  };

  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {itemPedido.produto.nome} ({itemPedido.quantidade}x)
          </span>
        </div>
        <span className="text-sm">{formatMoney(itemPedido.produto.preco)}</span>
      </div>

      {itemPedido.personalizacao &&
        itemPedido.personalizacao.descricao != "" && (
          <div className="ml-8 text-sm text-muted-foreground mb-2">
            <span className="font-medium">Personalização:</span>{" "}
            {itemPedido.personalizacao.descricao}
          </div>
        )}

      {itemPedido.personalizacao &&
        itemPedido.personalizacao.personalizacaoFoto &&
        itemPedido.personalizacao.personalizacaoFoto.length > 0 && (
          <div className="ml-8 mt-2">
            <span className="text-sm font-medium text-muted-foreground">
              Inspirações:
            </span>
            <div className="flex gap-2 mt-1">
              {itemPedido.personalizacao.personalizacaoFoto.map(
                (personalizacaoFoto, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={
                        `${LINK_API}${personalizacaoFoto.caminhoFoto}` ||
                        "/placeholder.svg"
                      }
                      alt={`Inspiração ${index + 1}`}
                      className="h-16 w-16 object-cover rounded-md border"
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                      onClick={() => openImageViewer(index)}
                    >
                      <Maximize2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Image Viewer Modal */}
            {itemPedido.personalizacao.personalizacaoFoto && (
              <ImageViewer
                imagens={itemPedido.personalizacao.personalizacaoFoto.map(
                  (foto) => `${LINK_API}${foto.caminhoFoto}`
                )}
                indiceInicial={indiceInicial}
                isOpen={imageViewerOpen}
                onClose={() => setImageViewerOpen(false)}
              />
            )}
          </div>
        )}
    </div>
  );
}
