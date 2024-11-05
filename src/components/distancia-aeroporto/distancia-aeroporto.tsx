import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface DistanciaAeroportoProps {
  distanciaParaAeroporto: (distancia: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const distanciaAeroportoSchema = z.object({
  distancia: z.number()
});

export type DistanciaAeroporto = z.infer<typeof distanciaAeroportoSchema>;

export function DistanciaAeroporto({
  distanciaParaAeroporto,
}: DistanciaAeroportoProps) {
  
  const { handleSubmit, register } = useForm<DistanciaAeroporto>()

  const onSubmit = (data: DistanciaAeroporto) => {
    const { distancia } = data;

    if(!distancia) return;

    distanciaParaAeroporto(Number(distancia));
  }

  return(
    <div className='flex flex-col w-full max-w-56 border-2 border-black'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <Input placeholder='Distancia' {...register('distancia')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Aviões proximos ao aeroporto</Button>
      </form>
    </div>
  )
}