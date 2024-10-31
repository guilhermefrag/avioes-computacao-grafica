import { Aviao } from '@/services/avioes/config/avioes-config';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AvioesService } from '@/services/avioes/avioes-service/avioes-service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createAviaoSchema = z.object({
  x: z.number(),
  y: z.number(),
  raio: z.number(),
  angulo: z.number(),
  direcao: z.number(),
  velocidade: z.number()
});

export type CreateAviao = z.infer<typeof createAviaoSchema>;

interface AdicionarNovoAviaoFormProps {
  setAvioes: (aviao: Aviao) => void
}

export function AdicionarNovoAviaoForm({
  setAvioes
}: AdicionarNovoAviaoFormProps){

  const { handleSubmit, register } = useForm<CreateAviao>();

  const onSubmit = (data: CreateAviao) => {
      const { x, y, raio, angulo, direcao, velocidade } = data;
      let [newX, newY] = [x, y];
      let [newRaio, newAngulo] = [raio, angulo];

      if ((!x && !y) && (raio && angulo)) {
        const data = AvioesService.polarParaCartesiano(raio, angulo);
        newX = data.x;
        newY = data.y;
      }

      if((x && y) && (!raio && !angulo)) {
        const data = AvioesService.cartesianoParaPolar(x, y);
        newRaio = data.raio;
        newAngulo = data.angulo;
      }

      setAvioes({
        x: x ? Number(x) : Number(newX),
        y: y ? Number(y) : Number(newY),
        raio: raio ? Number(raio) : Number(newRaio),
        angulo: angulo ? Number(angulo) : Number(newAngulo),
        direcao: Number(direcao),
        velocidade: Number(velocidade)
      });
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col w-[25%] gap-2'>
        <div className='flex flex-row gap-4'>
          <div>
            <Input placeholder='X' {...register("x")} />
          </div>
          
          <div>
            <Input placeholder='Y' {...register("y")} />
          </div>
        </div>

        <div className='flex flex-row gap-4'>
          <div>
            <Input placeholder='Raio' {...register("raio")} />
          </div>
          
          <div>
            <Input placeholder='Angulo' {...register("angulo")} />
          </div>
        </div>
        
        <div className='flex flex-row gap-4'>
          <div>
            <Input placeholder='Direção' {...register("direcao")} />
          </div>
          
          <div>
            <Input placeholder='Velocidade' {...register("velocidade")} />
          </div>
        </div>

        <Button type='submit' variant={'outline'}>Adicionar</Button>

      </div>
    </form>
  )
  
}