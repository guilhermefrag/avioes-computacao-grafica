import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface RotaDeColisaoProps {
  rotasDeColisao: (tempoMinimo: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rotaDeColisaoSchema = z.object({
  tempoMinimo: z.number()
});

export type RotaDeColisao = z.infer<typeof rotaDeColisaoSchema>;

export function RotaDeColisao({
  rotasDeColisao
}: RotaDeColisaoProps){

  const { handleSubmit, register } = useForm<RotaDeColisao>()

  const onSubmit = (data: RotaDeColisao) => {
    const { tempoMinimo } = data;

    if(!tempoMinimo) return;

    rotasDeColisao(tempoMinimo);
  }

  return(
    <div className='flex flex-col w-full max-w-56 border border-black rounded-md p-2'>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col gap-2 pb-2'>
          <Input placeholder='Tempo mínimo' {...register('tempoMinimo')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Em rota de colisão</Button>
      </form>
    </div>
  )
}