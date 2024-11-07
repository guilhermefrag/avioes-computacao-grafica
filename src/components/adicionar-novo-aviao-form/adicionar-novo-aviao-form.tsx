import { Aviao } from '@/services/avioes/config/avioes-config';
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AvioesService } from '@/services/avioes/avioes-service/avioes-service';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useToast } from "@/hooks/use-toast"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createAviaoSchema = z.object({
  tipoDeMedida: z.string(),
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
  id: string
  setNextId: () => void
}

export function AdicionarNovoAviaoForm({
  setAvioes,
  id,
  setNextId
}: AdicionarNovoAviaoFormProps){
  const { toast } = useToast()

  const { handleSubmit, register, control, watch } = useForm<CreateAviao>({
    defaultValues: {
      tipoDeMedida: 'cartesiano'
    }
  });
  const watchTipoDeMedida = watch("tipoDeMedida");

  const onSubmit = (data: CreateAviao) => {
      const { x, y, raio, angulo, direcao, velocidade } = data;
      let [newX, newY] = [x, y];
      let [newRaio, newAngulo] = [raio, angulo];

      if((!x && !y) && (!raio && !angulo)) {
        toast({description: "Preencha algum tipo de coordenada, a velocidade e a direção", variant: 'destructive'})
        return;
      }

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
        id: id,
        x: parseFloat(x ? Number(x).toFixed(2) : Number(newX).toFixed(2)),
        y: parseFloat(y ? Number(y).toFixed(2) : Number(newY).toFixed(2)),
        raio: parseFloat(raio ? Number(raio).toFixed(2) : Number(newRaio).toFixed(2)),
        angulo: parseFloat(angulo ? Number(angulo).toFixed(2) : Number(newAngulo).toFixed(2)),
        direcao: parseFloat(Number(direcao).toFixed(2)),
        velocidade: parseFloat(Number(velocidade).toFixed(2))
    });
    setNextId()
    toast({description: "Avião adicionado com sucesso", variant: 'default'})
  }

  return(
    <div className='border border-black rounded-md p-2 w-full min-w-72' >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div>
            <Controller 
              control={control}
              name='tipoDeMedida'
              render={({field}) => (
                <Select 
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de medida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cartesiano">Cartesiano</SelectItem>
                      <SelectItem value="polar">Polar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className='flex flex-row gap-4'>
            <div>
              <Input placeholder='X' {...register("x")} disabled={(watchTipoDeMedida === 'polar')} />
            </div>
            
            <div>
              <Input placeholder='Y' {...register("y")} disabled={watchTipoDeMedida === 'polar'}/>
            </div>
          </div>

          <div className='flex flex-row gap-4'>
            <div>
              <Input placeholder='Raio' {...register("raio")} disabled={watchTipoDeMedida === 'cartesiano'} />
            </div>
            
            <div>
              <Input placeholder='Angulo' {...register("angulo")} disabled={watchTipoDeMedida === 'cartesiano'} />
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
    </div>
  )
  
}