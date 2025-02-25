export type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

export const sortData = <T>(data: T[], sortConfig?: SortConfig<T>): T[] => {
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

export const requestSort = <T>(
  key: keyof T,
  currentSortConfig: SortConfig<T>
): SortConfig<T> => {
  let direction: "asc" | "desc" = "asc";

  if (
    currentSortConfig &&
    currentSortConfig.key === key &&
    currentSortConfig.direction === "asc"
  ) {
    direction = "desc";
  }

  return { key, direction };
};

