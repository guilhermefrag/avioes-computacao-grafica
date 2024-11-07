import { Aviao } from '../config/avioes-config';
import { AEROPORTO, AvioesProximos, ColisaoResultado } from './config/avioes-config';

export class AvioesService {

  static grausParaRadianos(graus: number): number {
    return (graus * Math.PI) / 180;
  }

  static radioanosParaGraus(radianos: number): number {
    return (radianos * 180) / Math.PI;
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

  static avioesEmRotasDeColisao(avioes: Aviao[], tempoMinimoEmSegundos: number): ColisaoResultado[] {
    const aviõesEmColisao: ColisaoResultado[] = [];
  
    for (let i = 0; i < avioes.length; i++) {
      for (let j = i + 1; j < avioes.length; j++) {
        const aviaoA = avioes[i];
        const aviaoB = avioes[j];
  
        if (aviaoA.x === null || aviaoA.y === null || aviaoB.x === null || aviaoB.y === null) {
          continue;
        }
  
        const anguloA = (aviaoA.direcao * Math.PI) / 180;
        const anguloB = (aviaoB.direcao * Math.PI) / 180;
  
        if (Math.abs(aviaoA.direcao - aviaoB.direcao) < 0.01) {
          const distancia = Math.sqrt((aviaoA.x - aviaoB.x) ** 2 + (aviaoA.y - aviaoB.y) ** 2);
          const tempoA = (distancia / aviaoA.velocidade) * 3600;
          const tempoB = (distancia / aviaoB.velocidade) * 3600;
  
          aviõesEmColisao.push({
            aviaoA,
            aviaoB,
            pontoColisao: { x: aviaoA.x, y: aviaoA.y },
            tempoA,
            tempoB,
            diferencaTempo: Math.abs(tempoA - tempoB),
          });
          continue;
        }
  
        const mA = Math.tan(anguloA);
        const bA = aviaoA.y - mA * aviaoA.x;
  
        const mB = Math.tan(anguloB);
        const bB = aviaoB.y - mB * aviaoB.x;
  
        const x = (bB - bA) / (mA - mB);
        const y = mA * x + bA;
  
        const distanciaA = Math.sqrt((x - aviaoA.x) ** 2 + (y - aviaoA.y) ** 2);
        const distanciaB = Math.sqrt((x - aviaoB.x) ** 2 + (y - aviaoB.y) ** 2);
  
        const tempoA = (distanciaA / aviaoA.velocidade) * 3600;
        const tempoB = (distanciaB / aviaoB.velocidade) * 3600;
  
        if (tempoA >= tempoMinimoEmSegundos && tempoB >= tempoMinimoEmSegundos) {
          aviõesEmColisao.push({
            aviaoA,
            aviaoB,
            pontoColisao: { x, y },
            tempoA,
            tempoB,
            diferencaTempo: Math.abs(tempoA - tempoB),
          });
        }
      }
    }
  
    return aviõesEmColisao;
  }
  
}
