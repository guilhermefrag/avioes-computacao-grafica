import { AdicionarNovoAviaoForm } from '@/components/adicionar-novo-aviao-form/adicionar-novo-aviao-form';
import Radar from '@/components/radar/radar';
import { Aviao } from '@/services/avioes/config/avioes-config';
import { useState } from 'react';

export function Layout() {

  const [avioes, setAvioes] = useState<Aviao[]>([]);

  const liftStateAvioes = (aviao: Aviao) => {
    setAvioes((prevState) => {
      return [...prevState, aviao]
    })
  }
  console.log(avioes)
  return (
    <div>
      <AdicionarNovoAviaoForm
        setAvioes={liftStateAvioes}
      />
      <Radar 
        avioes={avioes}
      />
    </div>
  );
}