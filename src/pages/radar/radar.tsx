import React, { useEffect, useRef } from "react";

export default function Radar() {
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

    // Definindo posições e ângulos dos aviões
    const planePositions = [
      { x: 75, y: 75, angle: 45 },
      { x: 125, y: 100, angle: 90 },
      { x: 150, y: 200, angle: 135 },
      { x: 200, y: 150, angle: 180 },
      { x: 250, y: 250, angle: 225 },
    ];

    // Limpa o canvas antes de desenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a grade e adiciona a numerologia nos eixos
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvasSize; x += gridSize) {
      // Linha vertical
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
      ctx.stroke();

      // Numerologia eixo X
      const xPos = (x - halfCanvas) / gridSize; // Calcula a posição em relação ao centro
      if (x !== halfCanvas) { // Evita colocar 0 duas vezes
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(`${xPos}`, x - 5, halfCanvas + 15);
      }
    }

    for (let y = 0; y <= canvasSize; y += gridSize) {
      // Linha horizontal
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
      ctx.stroke();

      // Numerologia eixo Y
      const yPos = -(y - halfCanvas) / gridSize; // Inverte o valor para o eixo Y
      if (y !== halfCanvas) { // Evita colocar 0 duas vezes
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(`${yPos}`, halfCanvas - 20, y + 5);
      }
    }

    // Desenha o ponto central (0,0)
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(halfCanvas, halfCanvas, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("0", halfCanvas - 15, halfCanvas + 5);

    // Função para desenhar um avião com rotação
    const drawPlane = (x: number, y: number, angle: number) => {
      ctx.save(); // Salva o estado atual do contexto

      // Translada para a posição do avião e rotaciona
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);

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
    planePositions.forEach(pos => drawPlane(pos.x, pos.y, pos.angle));
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-semibold mb-4">Radar</h1>
      <div className="border border-gray-700 w-[400px] h-[400px] relative">
        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
      </div>
    </div>
  );
}
