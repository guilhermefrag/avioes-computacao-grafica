export type Aviao = {
  x: number | null
  y: number | null
  raio: number | null
  angulo: number | null //em radianos
  velocidade: number // nao defini ainda, mas estava pensando em km por hora
  direcao: number
}

export const avioesTeste = [
  { x: 0, y: 0, angulo: 90 },
  { x: 75, y: 75, angulo: 45 },
  { x: 125, y: 100, angulo: 90 },
  { x: 150, y: 200, angulo: 135 },
  { x: 200, y: 150, angulo: 180 },
  { x: 250, y: 250, angulo: 225 },
];
