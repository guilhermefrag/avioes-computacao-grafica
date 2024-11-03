import { Aviao } from '@/services/avioes/config/avioes-config';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EscalonarProps {
  avioesSelecionados: Aviao[];
  escalonarAvioes: (id: string, x: number, y: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const escalonarSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Escalonar = z.infer<typeof escalonarSchema>;

export function Escalonar({
  avioesSelecionados,
  escalonarAvioes
}: EscalonarProps) {

  const { handleSubmit, register } = useForm<Escalonar>()

  const onSubmit = (data: Escalonar) => {
    let { x, y } = data;

    if(!x) x = 0;
    if(!y) y = 0;

    x = Number(x);
    y = Number(y);

    avioesSelecionados.forEach((aviao) => {
      escalonarAvioes(aviao.id, x, y);
    });
  }

  return(
    <div className='flex flex-col w-full max-w-56 border-2 border-black'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <Input placeholder='X' {...register('x')} />
          <Input placeholder='Y' {...register('y')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Escalonar</Button>
      </form>
    </div>
  )
  

}