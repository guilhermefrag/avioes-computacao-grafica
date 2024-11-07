import { AdicionarNovoAviaoForm } from '@/components/adicionar-novo-aviao-form/adicionar-novo-aviao-form';
import { DataGrid } from '@/components/data-grid/data-grid';
import { DistanciaAeroporto } from '@/components/distancia-aeroporto/distancia-aeroporto';
import { DistanciaEntreAvioes } from '@/components/distancia-entre-avioes/distancia-entre-avioes';
import { Escalonar } from '@/components/escalonar/escalonar';
import Radar from '@/components/radar/radar';
import { Relatorio } from '@/components/relatorio/relatorio';
import { RotaDeColisao } from '@/components/rota-de-colisao/rota-de-colisao';
import { RotacionarSimples } from '@/components/rotacionar-simples/rotacionar-simples';
import { Rotacionar } from '@/components/rotacionar/rotacionar';
import { Transladar } from '@/components/transladar/transladar';
import { AvioesService } from '@/services/avioes/avioes-service/avioes-service';
import { Aviao } from '@/services/avioes/config/avioes-config';
import { useState } from 'react';

export function Layout() {

  const [avioes, setAvioes] = useState<Aviao[]>([]);
  const [avioesSelecionados, setAvioesSelecionados] = useState<Aviao[]>([]);
  const [mensagensRelatorio, setMensagensRelatorio] = useState<string[]>([]);
  const [id, setId] = useState(0);

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

  const addMensagemRelatorio = (mensagem: string) => {
    setMensagensRelatorio((prevState) => {
      return [...prevState, mensagem]
    })
  }

  const removeAllMensagensRelatorio = () => {
    setMensagensRelatorio([])
  }

  const setNextId = () => {
    setId((prevState) => {
      return prevState + 1
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

  const rotacionarSimples = (id: string, direcao: number) => {
    setAvioes((prevState) => {
      return prevState.map((aviao) => {
        if (aviao.id === id) {
          const novaDirecao = (aviao.direcao + direcao) % 360;
          return {
            ...aviao,
            direcao: novaDirecao < 0 ? novaDirecao + 360 : novaDirecao,
          };
        }
        return aviao;
      });
    });
  };

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

  const distanciaParaAeroporto = (distancia: number) => {
    const avioesProximos = AvioesService.avioesProximosAeroporto(avioes, distancia);

    if(avioesProximos.length === 0){
      addMensagemRelatorio('Nenhum avião próximo ao aeroporto');
      return;
    }

    addMensagemRelatorio('Aviões próximos ao aeroporto:');
    avioesProximos.forEach((aviao) => {
      addMensagemRelatorio(`Avião ${aviao.id} - Distância: ${aviao.raio}`);
    })
  }

  const distanciaEntreAvioes = (distancia: number) => {
    const avioesProximos = AvioesService.distanciaEntreAvioes(avioes, distancia);

    if(avioesProximos.length === 0){
      addMensagemRelatorio('Nenhum avião próximo ao aeroporto');
      return;
    }

    addMensagemRelatorio('Aviões próximos ao aeroporto:');
    avioesProximos.forEach((aviao) => {
      addMensagemRelatorio(`Avião ${aviao.aviaoOrigem.id} e Avião ${aviao.aviaoComparado.id} - Distância: ${aviao.distanciaEntreAvioes}`);
    })
  }

  const rotasDeColisao = (tempoMinimo: number) => {
    const avioesEmRotaDeColisao = AvioesService.avioesEmRotasDeColisao(avioes, tempoMinimo);

    if(avioesEmRotaDeColisao.length === 0){
      addMensagemRelatorio('Nenhum avião em rota de colisão');
      return;
    }

    addMensagemRelatorio('Aviões em rota de colisão:');
    avioesEmRotaDeColisao.forEach((colisao) => {
      const { tempoA, tempoB, pontoColisao } = colisao;

      addMensagemRelatorio(`
        -Tempo até a colisão: 
        Avião A: ${tempoA.toFixed(2)} segundos
        Avião B: ${tempoB.toFixed(2)} segundos
        
        - Ponto de colisão: (${pontoColisao.x.toFixed(2)}, ${pontoColisao.y.toFixed(2)})
      `);
      return;
    })
  }
    
  return (
    <div className="flex flex-col w-full gap-5 p-5">
      <div className="flex flex-row gap-5 w-full max-w-6xl">
        <AdicionarNovoAviaoForm 
          setAvioes={liftStateAvioes}
          id={id.toString()}
          setNextId={setNextId}
        />
        <div className='flex flex-col gap-2'>
        
          <Transladar
            avioesSelecionados={avioesSelecionados}
            transladarAvioes={transladarAvioes}
          />

          <Escalonar
            avioesSelecionados={avioesSelecionados}
            escalonarAvioes={escalonarAvioes}
          />

          <RotacionarSimples
            avioesSelecionados={avioesSelecionados}
            rotacionarSimples={rotacionarSimples}
          />

          <Rotacionar
            avioesSelecionados={avioesSelecionados}
            rotacionarAvioes={rotacionarAvioes}
          />
        
        </div>

        <div className='flex flex-col gap-2'>
            <DistanciaAeroporto distanciaParaAeroporto={distanciaParaAeroporto} />
    
            <DistanciaEntreAvioes distanciaEntreAvioes={distanciaEntreAvioes} />

            <RotaDeColisao 
              rotasDeColisao={rotasDeColisao} 
            />
        </div>

          <Radar avioes={avioes} />

        <div className="flex flex-col w-full">
          <DataGrid
            avioes={avioes}
            deleteAviao={deleteAvioes}
            addAviaoSelecionado={addAviaoSelecionado}
            removeAviaoSelecionado={removeAviaoSelecionado}
          />
  
          <Relatorio
            mensagensRelatorio={mensagensRelatorio}
            removeAllMensagensRelatorio={removeAllMensagensRelatorio}
          />
        </div>
        
      </div>
    </div>
  );
  
}