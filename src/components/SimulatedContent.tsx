import React from 'react';
import { Button } from './ui/button';
import { 
  Code, 
  Terminal, 
  FileText, 
  Settings, 
  Play, 
  Download,
  Search,
  Folder,
  User,
  Bell
} from 'lucide-react';

export const SimulatedContent: React.FC = () => {
  return (
    <div className="w-full h-full bg-card text-card-foreground overflow-hidden">
      {/* Header Bar */}
      <div className="bg-secondary border-b border-border p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-semibold">MATLAB R2024a</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <FileText className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Folder className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-64 bg-muted border-r border-border">
          <div className="p-3">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Current Folder</h3>
              <div className="text-xs text-muted-foreground font-mono">
                /Users/john/Documents/MATLAB
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Files
              </div>
              {[
                'main.m',
                'analysis.m', 
                'plot_data.m',
                'results.mat',
                'config.json'
              ].map((file) => (
                <div key={file} className="flex items-center space-x-2 px-2 py-1 hover:bg-secondary rounded text-sm">
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-secondary border-b border-border p-2">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8">
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <Download className="w-4 h-4 mr-1" />
                Save
              </Button>
              <div className="flex-1 mx-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full h-8 pl-8 pr-3 bg-background border border-border rounded text-sm"
                    placeholder="Search in editor..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Split Content */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
              <div className="space-y-1">
                <div className="text-primary">% MATLAB Analysis Script</div>
                <div className="text-muted-foreground">% Author: John Doe</div>
                <div className="text-muted-foreground">% Date: 2024-01-20</div>
                <div></div>
                <div><span className="text-primary">function</span> result = analyzeData(data)</div>
                <div className="ml-4">% Initialize variables</div>
                <div className="ml-4"><span className="text-accent">n</span> = <span className="text-primary">length</span>(data);</div>
                <div className="ml-4"><span className="text-accent">result</span> = <span className="text-primary">struct</span>();</div>
                <div></div>
                <div className="ml-4">% Calculate statistics</div>
                <div className="ml-4"><span className="text-accent">result.mean</span> = <span className="text-primary">mean</span>(data);</div>
                <div className="ml-4"><span className="text-accent">result.std</span> = <span className="text-primary">std</span>(data);</div>
                <div className="ml-4"><span className="text-accent">result.median</span> = <span className="text-primary">median</span>(data);</div>
                <div></div>
                <div className="ml-4">% Generate plots</div>
                <div className="ml-4"><span className="text-primary">figure</span>;</div>
                <div className="ml-4"><span className="text-primary">histogram</span>(data, 20);</div>
                <div className="ml-4"><span className="text-primary">title</span>(<span className="text-green-400">'Data Distribution'</span>);</div>
                <div className="ml-4"><span className="text-primary">xlabel</span>(<span className="text-green-400">'Value'</span>);</div>
                <div className="ml-4"><span className="text-primary">ylabel</span>(<span className="text-green-400">'Frequency'</span>);</div>
                <div></div>
                <div className="ml-4">% Save results</div>
                <div className="ml-4"><span className="text-primary">save</span>(<span className="text-green-400">'analysis_results.mat'</span>, <span className="text-green-400">'result'</span>);</div>
                <div><span className="text-primary">end</span></div>
              </div>
            </div>

            {/* Right Panel - Workspace/Output */}
            <div className="w-80 border-l border-border bg-muted/50">
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-3">Workspace</h3>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-3 gap-2 font-semibold text-muted-foreground">
                    <div>Name</div>
                    <div>Value</div>
                    <div>Class</div>
                  </div>
                  {[
                    ['data', '1x1000 double', 'double'],
                    ['n', '1000', 'double'],
                    ['result', '1x1 struct', 'struct'],
                    ['mean_val', '45.7', 'double'],
                    ['std_val', '12.3', 'double']
                  ].map(([name, value, cls]) => (
                    <div key={name} className="grid grid-cols-3 gap-2 text-xs">
                      <div className="font-mono text-accent">{name}</div>
                      <div className="font-mono">{value}</div>
                      <div className="text-muted-foreground">{cls}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Command Window */}
          <div className="h-32 bg-background border-t border-border">
            <div className="p-3">
              <div className="text-xs font-semibold mb-2">Command Window</div>
              <div className="font-mono text-xs space-y-1">
                <div><span className="text-primary">&gt;&gt;</span> data = randn(1000, 1);</div>
                <div><span className="text-primary">&gt;&gt;</span> result = analyzeData(data);</div>
                <div className="text-muted-foreground">Analyzing data...</div>
                <div className="text-green-400">Analysis complete. Results saved.</div>
                <div><span className="text-primary">&gt;&gt;</span> <span className="animate-pulse">|</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};