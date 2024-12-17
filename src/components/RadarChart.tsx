import React, { useEffect, useRef } from 'react';
import { Phone } from '../types/phone';

interface RadarChartProps {
  basePhone: Phone | null;
  comparisonPhone?: Phone | null;
}

export const RadarChart: React.FC<RadarChartProps> = ({ basePhone, comparisonPhone }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !basePhone) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    const drawBackground = () => {
      const circles = 5;
      ctx.strokeStyle = '#e5e7eb';
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      
      for (let i = 1; i <= circles; i++) {
        const currentRadius = (radius * i) / circles;
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(
          `${(i * 20).toString()}%`,
          centerX + 5,
          centerY - currentRadius
        );
      }
    };

    const drawPolygon = (phone: Phone, color: string, alpha: number = 1) => {
      const specs = [
        phone.specs.cameraMP / 108 * 5,
        phone.specs.storageGB / 512 * 5,
        phone.specs.processorGHz / 3.5 * 5,
        phone.specs.batteryMAh / 6000 * 5,
        phone.specs.ram / 16 * 5,
      ];

      ctx.beginPath();
      specs.forEach((value, index) => {
        const angle = (Math.PI * 2 * index) / specs.length - Math.PI / 2;
        const x = centerX + radius * (value / 5) * Math.cos(angle);
        const y = centerY + radius * (value / 5) * Math.sin(angle);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const drawLabels = () => {
      const labels = ['Camera', 'Storage', 'Processor', 'Battery', 'RAM'];
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px sans-serif';
      
      labels.forEach((label, index) => {
        const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
        const x = centerX + (radius + 40) * Math.cos(angle);
        const y = centerY + (radius + 40) * Math.sin(angle);
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
      });
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawLabels();
    
    if (basePhone) {
      drawPolygon(basePhone, '#3b82f6', 0.2);
    }
    
    if (comparisonPhone) {
      drawPolygon(comparisonPhone, '#ef4444', 0.2);
    }

    const drawLegend = () => {
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      if (basePhone) {
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(20, 20, 20, 20);
        ctx.fillStyle = '#374151';
        ctx.fillText(basePhone.name, 50, 30);
      }
      
      if (comparisonPhone) {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(20, 50, 20, 20);
        ctx.fillStyle = '#374151';
        ctx.fillText(comparisonPhone.name, 50, 60);
      }
    };

    drawLegend();
  }, [basePhone, comparisonPhone]);

  if (!basePhone) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No phone data available
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="w-full max-w-lg mx-auto"
    />
  );
};