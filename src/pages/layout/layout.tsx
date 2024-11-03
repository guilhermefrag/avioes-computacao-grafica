import { AdicionarNovoAviaoForm } from '@/components/adicionar-novo-aviao-form/adicionar-novo-aviao-form';
import { DataGrid } from '@/components/data-grid/data-grid';
import Radar from '@/components/radar/radar';
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
      <Radar 
        avioes={avioes}
      />
    </div>
  );
}