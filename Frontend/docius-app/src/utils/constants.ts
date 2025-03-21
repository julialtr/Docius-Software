export const LINK_API = "https://localhost:7295/api/v1";

export const getMultiplicadorUnidadeMedida = (sigla: string) => {
  if (sigla === "ml") return 1;
  if (sigla === "g") return 1;
  if (sigla === "kg") return 1000;
  if (sigla === "l") return 1000;

  return 1;
};
