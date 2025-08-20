import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MagnifierToolbar } from './MagnifierToolbar';
import { MagnifiedView } from './MagnifiedView';
import { SimulatedContent } from './SimulatedContent';
import { FocusSelector } from './FocusSelector';

export interface MagnifierState {
  enabled: boolean;
  zoomLevel: number;
  splitOrientation: 'vertical' | 'horizontal';
  focusArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const MagnifierApp: React.FC = () => {
  const [state, setState] = useState<MagnifierState>({
    enabled: true,
    zoomLevel: 3,
    splitOrientation: 'vertical',
    focusArea: {
      x: 100,
      y: 100,
      width: 200,
      height: 150,
    },
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentDimensions, setContentDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        const { width, height } = contentRef.current.getBoundingClientRect();
        setContentDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateState = useCallback((updates: Partial<MagnifierState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const updateFocusArea = useCallback((updates: Partial<MagnifierState['focusArea']>) => {
    setState(prev => ({
      ...prev,
      focusArea: { ...prev.focusArea, ...updates }
    }));
  }, []);

  const isHorizontal = state.splitOrientation === 'horizontal';

  if (!state.enabled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary rounded-full" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Magnifier Disabled</h2>
            <p className="text-muted-foreground">Click the toolbar to enable magnification</p>
          </div>
        </div>
        <MagnifierToolbar state={state} onUpdateState={updateState} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MagnifierToolbar state={state} onUpdateState={updateState} />
      
      <div className={`flex ${isHorizontal ? 'flex-col' : 'flex-row'} h-screen pt-16`}>
        {/* Magnified View */}
        <div className={`${isHorizontal ? 'h-1/2' : 'w-1/2'} border-r border-border`}>
          <MagnifiedView
            state={state}
            contentRef={contentRef}
            contentDimensions={contentDimensions}
          />
        </div>

        {/* Content View with Focus Selector */}
        <div className={`${isHorizontal ? 'h-1/2' : 'w-1/2'} relative overflow-hidden`}>
          <div ref={contentRef} className="w-full h-full">
            <SimulatedContent />
          </div>
          
          <FocusSelector
            focusArea={state.focusArea}
            contentDimensions={contentDimensions}
            onUpdateFocusArea={updateFocusArea}
          />
        </div>
      </div>
    </div>
  );
};