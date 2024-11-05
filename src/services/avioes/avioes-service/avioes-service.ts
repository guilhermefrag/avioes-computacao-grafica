import { Aviao } from '../config/avioes-config';
import { AEROPORTO, AvioesProximos } from './config/avioes-config';

export class AvioesService {

  static adicionarAvioes(
    id: string,
    x: number | null,
    y: number | null,
    raio: number | null,
    angulo: number | null,
    velocidade: number,
    direcao: number,
    setAvioes: React.Dispatch<React.SetStateAction<Aviao[]>>) {
      
      if(!x && !y && !raio && !angulo) return;

      setAvioes((avioes) => [...avioes, { id, x, y, raio, angulo, velocidade, direcao }]);
  }

  static polarParaCartesiano(raio: number, angulo: number): { x: number, y: number } {
    const x = raio * Math.cos(angulo);
    const y = raio * Math.sin(angulo);
    return { x, y };
  }

  static cartesianoParaPolar(x: number, y: number): { raio: number, angulo: number } {
    const raio = Math.sqrt(x ** 2 + y ** 2);
    const angulo = Math.atan2(y, x);
    return { raio, angulo };
  }

  static avioesProximosAeroporto(avioes: Aviao[], distancia: number): Aviao[] {    
    return avioes.filter((aviao) => {
      if(aviao.x === null || aviao.y === null){
        return false;
      }

      const distanciaAviaoAeroporto = Math.sqrt((aviao.x - AEROPORTO.x) ** 2 + (aviao.y - AEROPORTO.y) ** 2);
      return distanciaAviaoAeroporto <= distancia;
    });

  }

  static distanciaEntreAvioes(avioes: Aviao[], distancia: number): AvioesProximos[] {
    const paresProximos: AvioesProximos[] = [];
  
    for (let i = 0; i < avioes.length; i++) {
      for (let j = i + 1; j < avioes.length; j++) {
        const aviaoA = avioes[i];
        const aviaoB = avioes[j];
  
        if (aviaoA.x === null || aviaoA.y === null || aviaoB.x === null || aviaoB.y === null) {
          continue;
        }
  
        const distanciaEntreAvioes = Math.sqrt(
          (aviaoA.x - aviaoB.x) ** 2 + (aviaoA.y - aviaoB.y) ** 2
        );
  
        if (distanciaEntreAvioes <= distancia) {
          paresProximos.push({
            aviaoOrigem: aviaoA,
            aviaoComparado: aviaoB,
            distanciaEntreAvioes: parseFloat(distanciaEntreAvioes.toFixed(2))
          });
        }
      }
    }
  
    return paresProximos;
  }
}
