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

  return (
    <div>
      <Radar 
        avioes={avioes}
      />
    </div>
  );
}