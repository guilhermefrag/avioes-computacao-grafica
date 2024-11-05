import { Aviao } from '../../config/avioes-config';

export const AEROPORTO = { x: 0, y: 0 };

export interface AvioesProximos {
  aviaoOrigem: Aviao;
  aviaoComparado: Aviao;
  distanciaEntreAvioes: number;
}