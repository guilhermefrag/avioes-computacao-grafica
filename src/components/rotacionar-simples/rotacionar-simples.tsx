import { Aviao } from '@/services/avioes/config/avioes-config';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface RotacionarSimplesProps {
  avioesSelecionados: Aviao[];
  rotacionarSimples: (id: string, direcao: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rotacionarSimplesSchema = z.object({
  direcao: z.number(),
});

export type RotacionarSimples = z.infer<typeof rotacionarSimplesSchema>;

export function RotacionarSimples({
  avioesSelecionados,
  rotacionarSimples
}: RotacionarSimplesProps) {

  const { handleSubmit, register } = useForm<RotacionarSimples>()

  const onSubmit = (data: RotacionarSimples) => {
    let { direcao } = data;

    if(!direcao) direcao = 0;

    direcao = Number(direcao);

    avioesSelecionados.forEach((aviao) => {
      rotacionarSimples(aviao.id, direcao);
    });
  }

  return(
    <div className='flex flex-col w-full border border-black rounded-md p-2 mt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col gap-2 pb-2'>
          <Input placeholder='Direção' {...register('direcao')} />
        </div>

        <Button className='w-full' variant={'outline'} type="submit">Rotacionar Simples</Button>

      </form>
    </div>
  )
}