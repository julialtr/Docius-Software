"use client";

import { useEffect, useState } from "react";
import { QrCodePix } from "qrcode-pix";

export default function Pedidos() {
  const [qrCode, setQrCode] = useState<string>("");
  const [rawPix, setRawPix] = useState<string>("");

  useEffect(() => {
    async function generateDynamicPix() {
      /*
                version: '01' //versão do pix (não altere)
                key: chave pix
                name: seu nome/empresa
                city: sua cidade
                transactionId: é o identificador que aparecerá no momento do pix (max: 25 caracteres)
                message: mensagem que aparecerá no momento do pix (opcional)
                value: valor que você quer cobrar (opcional)
            */
      const qrCodePix = QrCodePix({
        version: "01",
        key: "06747899970",
        name: "Julia Letícia Trapp",
        city: "Blumenau",
        transactionId: "pedido9568",
        message: "Pagamento 50% - Pedido #9568",
        value: 1,
      });

      const rawPixStr = qrCodePix.payload();
      const qrCodeBase64 = await qrCodePix.base64();

      setRawPix(rawPixStr);
      setQrCode(qrCodeBase64);
    }

    void generateDynamicPix();
  }, []);

  return (qrCode &&
    <div style={{ marginTop: 20 }}>
      <img src={qrCode} alt={"QR Code PIX"} />
      <p
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          whiteSpace: "nowrap",
          overflow: "auto",
        }}
      >
        {rawPix}
      </p>
    </div>
  );
}
