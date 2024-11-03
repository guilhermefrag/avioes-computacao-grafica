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

interface DataGridProps {
  avioes: Aviao[];
  deleteAviao: (id: string) => void;
  addAviaoSelecionado: (id: Aviao) => void;
  removeAviaoSelecionado: (id: string) => void;
}

export function DataGrid({
  avioes,
  deleteAviao,
  addAviaoSelecionado,
  removeAviaoSelecionado,
}: DataGridProps) {
  const [selectedAvioes, setSelectedAvioes] = useState<Set<string>>(new Set());

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

  return (
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
          <TableHead>Angulo(Radianos)</TableHead>
          <TableHead>Velocidade</TableHead>
          <TableHead>Direcao</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {avioes.map((aviao) => (
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
            <TableCell>{aviao.angulo}</TableCell>
            <TableCell>{aviao.velocidade}</TableCell>
            <TableCell>{aviao.direcao}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => deleteAviao(aviao.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
