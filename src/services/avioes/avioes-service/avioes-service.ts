import { Aviao } from '../config/avioes-config';

export class AvioesService {

  static adicionarAvioes(x: number, y: number, angulo: number, setAvioes: React.Dispatch<React.SetStateAction<Aviao[]>>) {
    setAvioes((avioes) => [...avioes, { x, y, angulo }]);
  }
}