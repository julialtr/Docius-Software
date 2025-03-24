import { SortConfig } from "@/utils/sort";
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

interface SortIconProps<T> {
  columnKey: string;
  sortConfig: SortConfig<T>;
}

const SortIcon = <T,>({ columnKey, sortConfig }: SortIconProps<T>) => {
  if (sortConfig?.key !== columnKey) {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }

  return sortConfig.direction === "asc" ? (
    <ChevronUp className="ml-2 h-4 w-4" />
  ) : (
    <ChevronDown className="ml-2 h-4 w-4" />
  );
};

export default SortIcon;
