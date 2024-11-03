import { AdicionarNovoAviaoForm } from '@/components/adicionar-novo-aviao-form/adicionar-novo-aviao-form';
import { DataGrid } from '@/components/data-grid/data-grid';
import { Escalonar } from '@/components/escalonar/escalonar';
import Radar from '@/components/radar/radar';
import { Rotacionar } from '@/components/rotacionar/rotacionar';
import { Transladar } from '@/components/transladar/transladar';
import { AvioesService } from '@/services/avioes/avioes-service/avioes-service';
import { Aviao } from '@/services/avioes/config/avioes-config';
import { useState } from 'react';

export function Layout() {

  const [avioes, setAvioes] = useState<Aviao[]>([]);
  const [avioesSelecionados, setAvioesSelecionados] = useState<Aviao[]>([]);

  const liftStateAvioes = (aviao: Aviao) => {
    setAvioes((prevState) => {
      return [...prevState, aviao]
    })
  }

  const deleteAvioes = (id: string) => {
    setAvioes((prevState) => {
      return prevState.filter(aviao => aviao.id !== id)
    })

    if(avioesSelecionados.length > 0){
      setAvioesSelecionados((prevState) => {
        return prevState.filter(aviao => aviao.id !== id)
      })
    }
  }

  const addAviaoSelecionado = (aviao: Aviao) => {
    setAvioesSelecionados((prevState) => {
      return [...prevState, aviao]
    })
  }

  const removeAviaoSelecionado = (id: string) => {
    setAvioesSelecionados((prevState) => {
      return prevState.filter(aviao => aviao.id !== id)
    })
  }

  const transladarAvioes = (id: string, x: number, y: number) => {
    setAvioes((prevState) => {
      return prevState.map((aviao) => {
        if(aviao.id === id){

          const [newX, newY] = [aviao.x ? aviao.x + x : x, aviao.y ? aviao.y + y : y];

          const { raio, angulo } = AvioesService.cartesianoParaPolar(newX, newY);
          return {
            ...aviao,
            x: parseFloat(Number(newX).toFixed(2)),
            y: parseFloat(Number(newY).toFixed(2)),
            raio: parseFloat(Number(raio).toFixed(2)),
            angulo: parseFloat(Number(angulo).toFixed(2))
          }
        }
        return aviao
      })
    })
  }

  const escalonarAvioes = (id: string, x: number, y: number) => {
    setAvioes((prevState) => {
      return prevState.map((aviao) => {
        if(aviao.id === id){

          const [newX, newY] = [aviao.x ? aviao.x * x : x, aviao.y ? aviao.y * y : y];

          const { raio, angulo } = AvioesService.cartesianoParaPolar(newX, newY);
          return {
            ...aviao,
            x: parseFloat(Number(newX).toFixed(2)),
            y: parseFloat(Number(newY).toFixed(2)),
            raio: parseFloat(Number(raio).toFixed(2)),
            angulo: parseFloat(Number(angulo).toFixed(2))
          }
        }
        return aviao
      })
    })
  }

  const rotacionarAvioes = (id: string, angulo: number, x: number, y: number) => {
    setAvioes((prevState) => {
      return prevState.map((aviao) => {
        if(aviao.id === id){

          if(aviao.x === null || aviao.y === null){
            return aviao
          }

          angulo = (Math.PI * 2 * angulo) / 360;
          const newX = (aviao.x - x) * Math.cos(angulo) - (aviao.y - y) * Math.sin(angulo) + x;
          const newY = (aviao.x - x) * Math.sin(angulo) + (aviao.y - y) * Math.cos(angulo) + y;

          return {
            ...aviao,
            x: parseFloat(Number(newX).toFixed(2)),
            y: parseFloat(Number(newY).toFixed(2)),
            raio: parseFloat(Number(Math.sqrt(newX ** 2 + newY ** 2)).toFixed(2)),
            angulo: parseFloat(Number(AvioesService.cartesianoParaPolar(newX, newY).angulo).toFixed(2))
          }
          
        }
        return aviao
      })
    })
  }
    
  return (
    <div>
      <div className='flex flex-row gap-5 w-full'>
        <AdicionarNovoAviaoForm
          setAvioes={liftStateAvioes}
        />

        <DataGrid
          avioes={avioes}
          deleteAviao={deleteAvioes}
          addAviaoSelecionado={addAviaoSelecionado}
          removeAviaoSelecionado={removeAviaoSelecionado}
        />
      </div>
      <div className='pt-5'>
        
        <Transladar
          avioesSelecionados={avioesSelecionados}
          transladarAvioes={transladarAvioes}
        />
        <Escalonar
          avioesSelecionados={avioesSelecionados}
          escalonarAvioes={escalonarAvioes} 
        />
        <Rotacionar
          avioesSelecionados={avioesSelecionados}
          rotacionarAvioes={rotacionarAvioes}
        />

      </div>
      <Radar 
        avioes={avioes}
      />
    </div>
  );
}