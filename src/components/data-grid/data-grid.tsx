import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Aviao } from '@/services/avioes/config/avioes-config';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { AvioesService } from '@/services/avioes/avioes-service/avioes-service';

interface DataGridProps {
  avioes: Aviao[];
  deleteAviao: (id: string) => void;
  addAviaoSelecionado: (id: Aviao) => void;
  removeAviaoSelecionado: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filtraAvioesPorIds = z.object({
  id: z.string()
})

export type FiltraAvioesPorIds = z.infer<typeof filtraAvioesPorIds>;

export function DataGrid({
  avioes,
  deleteAviao,
  addAviaoSelecionado,
  removeAviaoSelecionado,
}: DataGridProps) {
  const [selectedAvioes, setSelectedAvioes] = useState<Set<string>>(new Set());
  const [filterId, setFilterId] = useState<string>("");

  const { handleSubmit, register } = useForm<FiltraAvioesPorIds>()

  const onSubmit = (data: FiltraAvioesPorIds) => {
    const { id } = data;

    setFilterId(id);
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = avioes.map((aviao) => aviao.id);
      setSelectedAvioes(new Set(allIds));
      allIds.forEach((id) => addAviaoSelecionado(avioes.find((a) => a.id === id)!));
    } else {
      setSelectedAvioes(new Set());
      avioes.forEach((aviao) => removeAviaoSelecionado(aviao.id));
    }
  };

  const handleSelectAviao = (checked: boolean, aviao: Aviao) => {
    const newSelectedAvioes = new Set(selectedAvioes);
    if (checked) {
      newSelectedAvioes.add(aviao.id);
      addAviaoSelecionado(aviao);
    } else {
      newSelectedAvioes.delete(aviao.id);
      removeAviaoSelecionado(aviao.id);
    }
    setSelectedAvioes(newSelectedAvioes);
  };

  const filteredAvioes = avioes.filter((aviao) => {
    const filterIds = filterId
      .split(',')
      .map(id => id.trim().toLowerCase())
      .filter(id => id !== "");

    return filterIds.length === 0 || filterIds.includes(aviao.id.toLowerCase());
  });

  return (
    <div className='border border-black rounded-md p-2'>
      <form className="mb-4 flex" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Filtrar por ID" {...register('id')} />
        
        <Button variant={'outline'} type='submit'>
          <Search />
        </Button>
      </form>
      <ScrollArea className="h-[200px] w-full p-4 mb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </TableHead>
              <TableHead>Id</TableHead>
              <TableHead>X</TableHead>
              <TableHead>Y</TableHead>
              <TableHead>Raio</TableHead>
              <TableHead>Angulo</TableHead>
              <TableHead>Velocidade</TableHead>
              <TableHead>Direcao</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAvioes.map((aviao) => (
              <TableRow key={aviao.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) => handleSelectAviao(checked as boolean, aviao)}
                    checked={selectedAvioes.has(aviao.id)}
                  />
                </TableCell>
                <TableCell>{aviao.id}</TableCell>
                <TableCell>{aviao.x}</TableCell>
                <TableCell>{aviao.y}</TableCell>
                <TableCell>{aviao.raio}</TableCell>
                <TableCell>{AvioesService.radioanosParaGraus(Number(aviao.angulo)).toFixed(0)}</TableCell>
                <TableCell>{aviao.velocidade}</TableCell>
                <TableCell>{aviao.direcao}</TableCell>
                <TableCell className="text-right">
                  <Button variant={'destructive'} onClick={() => deleteAviao(aviao.id)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
