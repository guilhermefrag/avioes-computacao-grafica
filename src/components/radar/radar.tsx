import { Aviao } from '@/services/avioes/config/avioes-config';
import { useEffect, useRef } from "react";

export interface RadarProps {
  avioes: Aviao[]
}

export default function Radar({
  avioes
}: RadarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurações do radar
    const canvasSize = 400;
    const gridSize = 50;
    const halfCanvas = canvasSize / 2;
    const gridColor = "#e5e7eb"; // Cor da grade (cinza claro)

    // Limpa o canvas antes de desenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a grade sem a numerologia
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvasSize; x += gridSize) {
      // Linha vertical
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
      ctx.stroke();
    }

    for (let y = 0; y <= canvasSize; y += gridSize) {
      // Linha horizontal
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
      ctx.stroke();
    }

    // Desenha o ponto central (0,0)
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(halfCanvas, halfCanvas, 5, 0, Math.PI * 2);
    ctx.fill();

    // Função para desenhar um avião com rotação
    const desenhaAviao = (x: number, y: number, angulo: number) => {
      ctx.save(); // Salva o estado atual do contexto

      // Translada para a posição do avião e rotaciona
      ctx.translate(x, y);
      ctx.rotate((angulo * Math.PI) / 180);

      // Desenha o avião rotacionado
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(0, -10); // Ponta do avião
      ctx.lineTo(-5, 5);  // Asa esquerda
      ctx.lineTo(5, 5);   // Asa direita
      ctx.closePath();
      ctx.fill();

      ctx.restore(); // Restaura o estado original do contexto
    };

    // Desenhar os aviões nas posições e ângulos especificados
    avioes.forEach(pos => desenhaAviao(pos.x, pos.y, pos.angulo));
  }, [avioes]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-semibold mb-4">Radar</h1>
      <div className="border border-gray-700 w-[400px] h-[400px] relative">
        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
      </div>
    </div>
  );
}
