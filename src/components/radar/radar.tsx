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

    const canvasSize = 800;
    const gridSize = 50;
    const halfCanvas = canvasSize / 2;
    const gridColor = "#e5e7eb";

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Limpa e desenha o grid no canvas
    const desenhaGrade = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= canvasSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize);
        ctx.stroke();
      }

      for (let y = 0; y <= canvasSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize, y);
        ctx.stroke();
      }

      // Desenha o ponto central
      ctx.fillStyle = "gray";
      ctx.beginPath();
      ctx.arc(halfCanvas, halfCanvas, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const aviaoImg = new Image();
    aviaoImg.src = 'src/assets/aviao.png'; // Altere o caminho para o local correto da imagem

    aviaoImg.onload = () => {
      // Função para desenhar um avião com imagem invertida e rotação
      const desenhaAviao = (x: number, y: number, direcao: number) => {
        ctx.save();
        const posX = halfCanvas + x;
        const posY = halfCanvas - y;

        ctx.translate(posX, posY);
        ctx.rotate((direcao * Math.PI) / -180); // Converte o ângulo para radianos

        // Ajuste de posição da imagem, centralizando o avião no ponto
        ctx.drawImage(aviaoImg, -aviaoImg.width / 2, -aviaoImg.height / 2);

        ctx.restore();
      };

      desenhaGrade();

      avioes.forEach(pos => {
        if (pos.x !== null && pos.y !== null && pos.direcao !== null) {
          desenhaAviao(pos.x, pos.y, pos.direcao);
        }
      });
    };
  }, [avioes]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-semibold mb-4">Radar</h1>
      <div className="border border-gray-700 w-[800px] h-[800px] relative">
        <canvas ref={canvasRef} width={800} height={800} className="w-full h-full" />
      </div>
    </div>
  );
}
