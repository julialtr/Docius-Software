"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

import { FilterDashboard } from "@/app/[empresa]/(pages)/Admin/Dashboard/interfaces";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function Periodo({
  onFiltroChange,
}: {
  onFiltroChange: (filtro: FilterDashboard) => void;
}) {
  const [periodo, setPeriodo] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const handlePeriodoChange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) return;

    setPeriodo(dateRange);

    const dataFinal = dateRange.to || dateRange.from;

    onFiltroChange({
      dataInicial: dateRange.from.toISOString().split("T")[0],
      dataFinal: dataFinal.toISOString().split("T")[0],
    });
  };

  return (
    <div className={cn("flex items-center space-x-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="periodo"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !periodo && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {periodo?.from ? (
              periodo.to ? (
                <>
                  {format(periodo.from, "dd 'de' MMMM", { locale: ptBR })} -{" "}
                  {format(periodo.to, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </>
              ) : (
                format(periodo.from, "dd 'de' MMMM, yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={periodo?.from}
            selected={periodo}
            onSelect={handlePeriodoChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
