import { Aviao } from '../config/avioes-config';

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
}
