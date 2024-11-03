import { Aviao } from '@/services/avioes/config/avioes-config';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TransladarProps {
  avioesSelecionados: Aviao[];
  transladarAvioes: (id: string, x: number, y: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transladarSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Transladar = z.infer<typeof transladarSchema>;

export function Transladar({
  avioesSelecionados,
  transladarAvioes
}: TransladarProps) {

  const { handleSubmit, register } = useForm<Transladar>()

  const onSubmit = (data: Transladar) => {
    let { x, y } = data;

    if(!x) x = 0;
    if(!y) y = 0;

    x = Number(x);
    y = Number(y);

    avioesSelecionados.forEach((aviao) => {
      transladarAvioes(aviao.id, x, y);
    });
  }

  return (
    <div className='flex flex-col w-full max-w-56 border-2 border-black'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <Input placeholder='X' {...register('x')} />
          <Input placeholder='Y' {...register('y')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Transladar</Button>
      </form>
    </div>
  )
}