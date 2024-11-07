import { Button } from '../ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";

interface RelatorioProps {
  mensagensRelatorio: string[];
  removeAllMensagensRelatorio: () => void;
}

export function Relatorio({
  mensagensRelatorio,
  removeAllMensagensRelatorio
}: RelatorioProps){

  return(
    <div className='flex flex-col w-full border border-black rounded-md p-2 mt-2'>
      <div className='text-center'>
        <h1>Relatórios</h1>
      </div>
      <div className='w-full p-5'>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {mensagensRelatorio.map((mensagem, index) => (
            <p key={index}>{mensagem}</p>
          ))}
        </ScrollArea>
        <Button className='w-full' variant={'destructive'} onClick={removeAllMensagensRelatorio}>Limpar</Button>
      </div>
    </div>
  )
}
