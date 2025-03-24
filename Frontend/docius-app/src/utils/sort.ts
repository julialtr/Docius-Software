export type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

export const sortData = <T>(data: T[], sortConfig?: SortConfig<T>): T[] => {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    let valueA = getNestedValue(a, sortConfig.key as string);
    let valueB = getNestedValue(b, sortConfig.key as string);

    if (!valueA) valueA = "";
    if (!valueB) valueB = "";

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};


export const requestSort = <T>(
  key: keyof T | string,
  sortConfig: SortConfig<T>
): SortConfig<T> => {
  return {
    key: key as keyof T,
    direction:
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc",
  };
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
