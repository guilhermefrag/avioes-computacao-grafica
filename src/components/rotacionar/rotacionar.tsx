import { Aviao } from '@/services/avioes/config/avioes-config';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface RotacionarProps {
  avioesSelecionados: Aviao[];
  rotacionarAvioes: (id: string, angulo: number, x: number, y: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rotacionarSchema = z.object({
  angulo: z.number(),
  x: z.number(),
  y: z.number(),
});

export type Rotacionar = z.infer<typeof rotacionarSchema>;

export function Rotacionar({
  avioesSelecionados,
  rotacionarAvioes
}: RotacionarProps) {

  const { handleSubmit, register } = useForm<Rotacionar>()

  const onSubmit = (data: Rotacionar) => {
    let { angulo, x, y } = data;

    if(!angulo) angulo = 0;
    if(!x) x = 0;
    if(!y) y = 0;

    angulo = Number(angulo);
    x = Number(x);
    y = Number(y);

    avioesSelecionados.forEach((aviao) => {
      rotacionarAvioes(aviao.id, angulo, x, y);
    });
  }

  return (
    <div className='flex flex-col w-full border border-black rounded-md p-2 mt-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col gap-2 pb-2'>
          <Input placeholder='Angulo' {...register('angulo')} />
          <Input placeholder='X' {...register('x')} />
          <Input placeholder='Y' {...register('y')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Rotacionar</Button>
      </form>
    </div>
  );
}