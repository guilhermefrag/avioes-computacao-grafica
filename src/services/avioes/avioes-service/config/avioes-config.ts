import { Aviao } from '../../config/avioes-config';

export const AEROPORTO = { x: 0, y: 0 };

export interface AvioesProximos {
  aviaoOrigem: Aviao;
  aviaoComparado: Aviao;
  distanciaEntreAvioes: number;
}

export type AvioesColisao = {
  aviaoA: Aviao;
  aviaoB: Aviao;
  tempoParaColisao: number; // em segundos
};

export type ColisaoResultado = {
  aviaoA: Aviao;
  aviaoB: Aviao;
  pontoColisao: { x: number; y: number };
  tempoA: number; // em segundos
  tempoB: number; // em segundos
  diferencaTempo: number; // em segundos
};