import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface DistanciaEntreAvioesProps {
  distanciaEntreAvioes: (distancia: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const distanciaEntreAvioesSchema = z.object({
  distancia: z.number()
});

export type DistanciaEntreAvioes = z.infer<typeof distanciaEntreAvioesSchema>;

export function DistanciaEntreAvioes({
  distanciaEntreAvioes
}: DistanciaEntreAvioesProps) {
  
  const { handleSubmit, register } = useForm<DistanciaEntreAvioes>()

  const onSubmit = (data: DistanciaEntreAvioes) => {
    const { distancia } = data;

    if(!distancia) return;

    distanciaEntreAvioes(distancia);
  }

  return(
    <div className='flex flex-col w-full max-w-56 border border-black rounded-md p-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col gap-2 pb-2'>
          <Input placeholder='Distancia' {...register('distancia')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Aviões próximos</Button>
      </form>
    </div>
  )
}