"use client";

import { useState } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/app/_components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-amber-900">
            Selecione a data de entrega
          </DialogTitle>
          <DialogDescription>
            Escolha a data e horário desejados para retirada do seu pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="data">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="data"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data ? (
                    format(data, "PPP", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data}
                  onSelect={setData}
                  disabled={disabledDays}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              É necessário pelo menos 2 dias de antecedência para prepararmos
              seu pedido.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hora">Horário</Label>
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
