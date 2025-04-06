export const calculaTotal = (preco: number, quantidade: number) => {
  const precoCentavos = Math.round(preco * 100);
  return (precoCentavos * quantidade) / 100;
};
