"use client";

import { useState } from "react";
import { addDays, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar } from "@/app/_components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Card, CardContent } from "@/app/_components/ui/card";

export function DatePickerModal({
  isDialogOpen,
  onIsDialogOpenChange,
  onConfirmarPedido,
}: {
  isDialogOpen: boolean;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onConfirmarPedido: (data: Date, hora: string) => void;
}) {
  const horasDisponiveis = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const dataHoje = startOfDay(new Date());
  const [data, setData] = useState<Date | undefined>(addDays(dataHoje, 2));
  const [hora, setHora] = useState(horasDisponiveis[0]);

  const disabledDays = (data: Date) => {
    return isBefore(data, addDays(dataHoje, 2));
  };

  const handleConfirm = () => {
    if (data) onConfirmarPedido(data, hora);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onIsDialogOpenChange}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-amber-900">
            Selecione a data de entrega
          </DialogTitle>
          <DialogDescription>
            Escolha a data e horário desejados para retirada do seu pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Card className="border-amber-200">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={data}
                onSelect={setData}
                disabled={disabledDays}
                initialFocus
                locale={ptBR}
                className="rounded-md mx-auto"
                classNames={{
                  months: "flex flex-col items-center",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-amber-100 hover:text-amber-900 rounded-md",
                  day_selected:
                    "bg-amber-600 text-white hover:bg-amber-700 hover:text-white focus:bg-amber-600 focus:text-white",
                  day_today: "bg-amber-100 text-amber-900 font-semibold",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled:
                    "text-muted-foreground opacity-50 cursor-not-allowed bg-transparent pointer-events-none",

                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            É necessário pelo menos 2 dias de antecedência para prepararmos seu
            pedido.
          </p>

          <Select value={hora} onValueChange={setHora}>
            <SelectTrigger id="hora">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              {horasDisponiveis.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onIsDialogOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
            disabled={!data}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
