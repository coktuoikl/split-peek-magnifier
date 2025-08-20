import React from 'react';
import { Button } from './ui/button';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Monitor, 
  Power,
  SplitSquareHorizontal,
  SplitSquareVertical
} from 'lucide-react';
import { MagnifierState } from './MagnifierApp';

interface MagnifierToolbarProps {
  state: MagnifierState;
  onUpdateState: (updates: Partial<MagnifierState>) => void;
}

const zoomLevels = [2, 3, 4, 5];

export const MagnifierToolbar: React.FC<MagnifierToolbarProps> = ({
  state,
  onUpdateState,
}) => {
  const toggleEnabled = () => {
    onUpdateState({ enabled: !state.enabled });
  };

  const setZoomLevel = (level: number) => {
    onUpdateState({ zoomLevel: level });
  };

  const toggleOrientation = () => {
    onUpdateState({ 
      splitOrientation: state.splitOrientation === 'vertical' ? 'horizontal' : 'vertical' 
    });
  };

  const resetFocus = () => {
    onUpdateState({
      focusArea: {
        x: 100,
        y: 100,
        width: 200,
        height: 150,
      },
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 magnifier-toolbar border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Monitor className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Split Magnifier</span>
            </div>
          </div>

          {/* Center - Controls */}
          <div className="flex items-center space-x-2">
            {/* Zoom Level Controls */}
            <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel(Math.max(2, state.zoomLevel - 1))}
                disabled={state.zoomLevel <= 2}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              {zoomLevels.map((level) => (
                <Button
                  key={level}
                  variant={state.zoomLevel === level ? "magnifier" : "ghost"}
                  size="sm"
                  onClick={() => setZoomLevel(level)}
                  className="h-8 min-w-12 text-sm font-medium"
                >
                  {level}x
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoomLevel(Math.min(5, state.zoomLevel + 1))}
                disabled={state.zoomLevel >= 5}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Split Orientation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleOrientation}
              className="h-10 px-3"
            >
              {state.splitOrientation === 'vertical' ? (
                <>
                  <SplitSquareVertical className="w-4 h-4 mr-2" />
                  Vertical
                </>
              ) : (
                <>
                  <SplitSquareHorizontal className="w-4 h-4 mr-2" />
                  Horizontal
                </>
              )}
            </Button>

            {/* Reset Focus */}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFocus}
              className="h-10 px-3"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Right side - Power toggle */}
          <div className="flex items-center">
            <Button
              variant={state.enabled ? "magnifier" : "ghost"}
              size="sm"
              onClick={toggleEnabled}
              className="h-10 px-4"
            >
              <Power className="w-4 h-4 mr-2" />
              {state.enabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};