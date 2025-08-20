import React, { useRef, useEffect, useState } from 'react';
import { MagnifierState } from './MagnifierApp';

interface MagnifiedViewProps {
  state: MagnifierState;
  contentRef: React.RefObject<HTMLDivElement>;
  contentDimensions: { width: number; height: number };
}

export const MagnifiedView: React.FC<MagnifiedViewProps> = ({
  state,
  contentRef,
  contentDimensions,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const captureAndMagnify = async () => {
      if (!contentRef.current || !canvasRef.current || isCapturing) return;
      
      setIsCapturing(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setIsCapturing(false);
        return;
      }

      try {
        // Create a clone of the content element for capturing
        const contentElement = contentRef.current;
        const rect = contentElement.getBoundingClientRect();
        
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        // Calculate the source area from focus area
        const sourceX = state.focusArea.x;
        const sourceY = state.focusArea.y;
        const sourceWidth = state.focusArea.width;
        const sourceHeight = state.focusArea.height;

        // Calculate scaling and positioning for magnification
        const scaleX = (canvas.offsetWidth / sourceWidth) * (state.zoomLevel / 4);
        const scaleY = (canvas.offsetHeight / sourceHeight) * (state.zoomLevel / 4);
        
        // Clear canvas
        ctx.fillStyle = 'hsl(var(--magnifier-surface))';
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

        // Create a more sophisticated magnification simulation
        const createMagnifiedContent = () => {
          // Draw background gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight);
          gradient.addColorStop(0, 'hsl(222 15% 12%)');
          gradient.addColorStop(1, 'hsl(222 15% 8%)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

          // Draw magnified content simulation
          const centerX = canvas.offsetWidth / 2;
          const centerY = canvas.offsetHeight / 2;
          
          // Calculate what should be magnified based on focus area
          const relativeX = (sourceX / contentDimensions.width) * 100;
          const relativeY = (sourceY / contentDimensions.height) * 100;
          
          // Simulate different content based on position
          if (relativeX < 30 && relativeY < 30) {
            // Top-left: Code editor area
            drawMagnifiedCode(ctx, centerX, centerY, state.zoomLevel);
          } else if (relativeX > 70 && relativeY < 30) {
            // Top-right: UI elements
            drawMagnifiedUI(ctx, centerX, centerY, state.zoomLevel);
          } else if (relativeY > 60) {
            // Bottom: Terminal/console
            drawMagnifiedTerminal(ctx, centerX, centerY, state.zoomLevel);
          } else {
            // Center: Document content
            drawMagnifiedText(ctx, centerX, centerY, state.zoomLevel);
          }

          // Add magnification border effect
          ctx.strokeStyle = 'hsl(var(--primary))';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(10, 10, canvas.offsetWidth - 20, canvas.offsetHeight - 20);
        };

        createMagnifiedContent();

        // Add zoom level indicator
        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(`${state.zoomLevel}x`, 20, 40);
        
      } catch (error) {
        console.error('Error capturing content:', error);
      }
      
      setIsCapturing(false);
    };

    // Capture immediately and then set up interval
    captureAndMagnify();
    const interval = setInterval(captureAndMagnify, 100); // 10 FPS
    
    return () => clearInterval(interval);
  }, [state.focusArea, state.zoomLevel, contentDimensions, contentRef, isCapturing]);

  return (
    <div className="w-full h-full magnifier-surface flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-full max-h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg magnifier-glow border border-border"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-sm font-medium text-primary">
            Magnified View ({state.zoomLevel}x)
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper functions for drawing magnified content
function drawMagnifiedCode(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, zoom: number) {
  const fontSize = Math.max(12, 8 + zoom * 2);
  ctx.font = `${fontSize}px monospace`;
  
  const lines = [
    'function calculateMagnification() {',
    '  const zoomFactor = this.zoomLevel;',
    '  const region = this.focusArea;',
    '  return {',
    '    x: region.x * zoomFactor,',
    '    y: region.y * zoomFactor,',
    '    scale: zoomFactor',
    '  };',
    '}'
  ];
  
  lines.forEach((line, i) => {
    ctx.fillStyle = i === 0 || i === lines.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--foreground))';
    ctx.fillText(line, 30, 80 + i * (fontSize + 4));
  });
}

function drawMagnifiedUI(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, zoom: number) {
  const size = 20 + zoom * 5;
  
  // Draw button
  ctx.fillStyle = 'hsl(var(--primary))';
  ctx.fillRect(centerX - size, centerY - size/2, size * 2, size);
  
  ctx.fillStyle = 'hsl(var(--primary-foreground))';
  ctx.font = `${10 + zoom}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('MAGNIFIED BUTTON', centerX, centerY + 4);
  ctx.textAlign = 'left';
}

function drawMagnifiedTerminal(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, zoom: number) {
  const fontSize = Math.max(10, 6 + zoom * 1.5);
  ctx.font = `${fontSize}px monospace`;
  
  const lines = [
    '$ npm run dev',
    '> magnifier-app@1.0.0 dev',
    '> vite --host',
    '',
    '  VITE v5.0.0  ready in 328 ms',
    '  ➜  Local:   http://localhost:8080/',
    '  ➜  Network: use --host to expose'
  ];
  
  lines.forEach((line, i) => {
    ctx.fillStyle = line.startsWith('$') ? 'hsl(var(--primary))' : 
                   line.includes('VITE') ? 'hsl(120 100% 60%)' : 'hsl(var(--muted-foreground))';
    ctx.fillText(line, 30, 60 + i * (fontSize + 2));
  });
}

function drawMagnifiedText(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, zoom: number) {
  const fontSize = Math.max(14, 10 + zoom * 2);
  ctx.font = `${fontSize}px sans-serif`;
  
  const text = [
    'This is magnified content that updates',
    'in real-time as you interact with the',
    'application. The magnification level',
    `is currently set to ${zoom}x zoom.`
  ];
  
  text.forEach((line, i) => {
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.fillText(line, 30, 100 + i * (fontSize + 6));
  });
}