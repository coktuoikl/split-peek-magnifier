import React, { useCallback, useRef, useState } from 'react';
import { MagnifierState } from './MagnifierApp';

interface FocusSelectorProps {
  focusArea: MagnifierState['focusArea'];
  contentDimensions: { width: number; height: number };
  onUpdateFocusArea: (updates: Partial<MagnifierState['focusArea']>) => void;
}

export const FocusSelector: React.FC<FocusSelectorProps> = ({
  focusArea,
  contentDimensions,
  onUpdateFocusArea,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!selectorRef.current) return;
    
    const rect = selectorRef.current.getBoundingClientRect();
    const parentRect = selectorRef.current.parentElement?.getBoundingClientRect();
    
    if (!parentRect) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectorRef.current) return;
    
    const parentElement = selectorRef.current.parentElement;
    if (!parentElement) return;
    
    const parentRect = parentElement.getBoundingClientRect();
    
    const newX = Math.max(0, Math.min(
      e.clientX - parentRect.left - dragOffset.x,
      parentRect.width - focusArea.width
    ));
    
    const newY = Math.max(0, Math.min(
      e.clientY - parentRect.top - dragOffset.y,
      parentRect.height - focusArea.height
    ));
    
    onUpdateFocusArea({ x: newX, y: newY });
  }, [isDragging, dragOffset, focusArea.width, focusArea.height, onUpdateFocusArea]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Resize handles
  const handleResize = useCallback((direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = focusArea.width;
    const startHeight = focusArea.height;
    const startLeft = focusArea.x;
    const startTop = focusArea.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startLeft;
      let newY = startTop;
      
      if (direction.includes('right')) {
        newWidth = Math.max(50, Math.min(startWidth + deltaX, contentDimensions.width - startLeft));
      }
      if (direction.includes('left')) {
        newWidth = Math.max(50, startWidth - deltaX);
        newX = Math.max(0, startLeft + deltaX);
        if (newX === 0) newWidth = startWidth + startLeft - deltaX;
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(50, Math.min(startHeight + deltaY, contentDimensions.height - startTop));
      }
      if (direction.includes('top')) {
        newHeight = Math.max(50, startHeight - deltaY);
        newY = Math.max(0, startTop + deltaY);
        if (newY === 0) newHeight = startHeight + startTop - deltaY;
      }
      
      onUpdateFocusArea({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [focusArea, contentDimensions, onUpdateFocusArea]);

  return (
    <div
      ref={selectorRef}
      className={`absolute focus-ring animate-focus-pulse cursor-move select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        left: focusArea.x,
        top: focusArea.y,
        width: focusArea.width,
        height: focusArea.height,
        background: 'rgba(139, 92, 246, 0.1)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Content overlay */}
      <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]" />
      
      {/* Label */}
      <div className="absolute -top-8 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
        Focus Area ({Math.round(focusArea.width)} × {Math.round(focusArea.height)})
      </div>
      
      {/* Resize handles */}
      <div 
        className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full cursor-nw-resize opacity-80 hover:opacity-100"
        onMouseDown={(e) => handleResize('top-left', e)}
      />
      <div 
        className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full cursor-ne-resize opacity-80 hover:opacity-100"
        onMouseDown={(e) => handleResize('top-right', e)}
      />
      <div 
        className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full cursor-sw-resize opacity-80 hover:opacity-100"
        onMouseDown={(e) => handleResize('bottom-left', e)}
      />
      <div 
        className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full cursor-se-resize opacity-80 hover:opacity-100"
        onMouseDown={(e) => handleResize('bottom-right', e)}
      />
      
      {/* Edge handles */}
      <div 
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-primary rounded cursor-n-resize opacity-60 hover:opacity-100"
        onMouseDown={(e) => handleResize('top', e)}
      />
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-primary rounded cursor-s-resize opacity-60 hover:opacity-100"
        onMouseDown={(e) => handleResize('bottom', e)}
      />
      <div 
        className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-primary rounded cursor-w-resize opacity-60 hover:opacity-100"
        onMouseDown={(e) => handleResize('left', e)}
      />
      <div 
        className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-primary rounded cursor-e-resize opacity-60 hover:opacity-100"
        onMouseDown={(e) => handleResize('right', e)}
      />
    </div>
  );
};