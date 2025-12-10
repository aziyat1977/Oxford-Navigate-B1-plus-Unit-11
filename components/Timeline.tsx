import React, { useState } from 'react';
import { RotateCcw, Gauge, MoveHorizontal } from 'lucide-react';
import { playSFX } from '../utils/audio';

interface TimelineProps {
  realEvent: string;
  unrealEvent: string;
  result: string;
}

export const Timeline: React.FC<TimelineProps> = ({ realEvent, unrealEvent, result }) => {
  const [key, setKey] = useState(0);
  const [isSlowMo, setIsSlowMo] = useState(false);

  // Base duration is 6s. Slow mo is 3x slower (18s)
  const duration = isSlowMo ? 18 : 6;

  const handleReplay = () => {
    playSFX('click');
    setKey(prev => prev + 1);
  };

  const toggleSpeed = () => {
    playSFX('click');
    setIsSlowMo(!isSlowMo);
    setKey(prev => prev + 1); // Restart on speed change to sync
  };

  return (
    <div className="w-full my-8 md:my-12 bg-zinc-950 p-1 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Header / Controls */}
      <div className="bg-zinc-900 px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800">
        <div>
           <h3 className="text-base md:text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-6 bg-noir-red inline-block"></span>
             Timeline Divergence
           </h3>
           <p className="text-zinc-500 text-[10px] md:text-xs font-mono">FORENSIC RECONSTRUCTION</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
           <button 
             onClick={toggleSpeed}
             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-lg text-xs font-bold font-mono transition-colors touch-manipulation ${isSlowMo ? 'bg-blue-900/30 text-blue-400 border border-blue-500/50' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
           >
             <Gauge size={16} />
             <span className="whitespace-nowrap">{isSlowMo ? '0.3x SPEED' : '1.0x SPEED'}</span>
           </button>
           <button 
             onClick={handleReplay}
             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-bold font-mono hover:bg-zinc-700 transition-colors touch-manipulation"
           >
             <RotateCcw size={16} /> REPLAY
           </button>
        </div>
      </div>
      
      {/* Visualization Container - Horizontal Scroll on Mobile */}
      <div className="relative w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed border-b border-zinc-800">
        <div className="overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {/* Min-width ensures the SVG doesn't shrink to unreadable size on mobile */}
          <div className="min-w-[600px] md:min-w-full aspect-[2.5/1]" key={key}>
            <svg className="w-full h-full" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#3f3f46" />
                </marker>
                <filter id="neonRed" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neonGold" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="fadeLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
                    <stop offset="20%" stopColor="#3f3f46" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3f3f46" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* BACKGROUND GRID */}
              <path d="M50 220 L750 220" stroke="url(#fadeLine)" strokeWidth="1" />
              <path d="M200 50 L200 280" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

              {/* REALITY PATH (Bottom) */}
              <g>
                <line x1="50" y1="220" x2="750" y2="220" stroke="#52525b" strokeWidth="4" markerEnd="url(#arrowGray)" opacity="0.5" />
                <text x="50" y="250" fill="#71717a" fontSize="12" fontWeight="bold" fontFamily="monospace">REALITY TRACK</text>
                
                {/* The Crash Event */}
                <circle cx="200" cy="220" r="6" fill="#ef4444">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="200" y="250" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">{realEvent}</text>
              </g>

              {/* UNREAL PATH (Divergence) */}
              {/* Path: Starts at Reality (50,220), splits at 200, curves up to (700, 80) */}
              <path 
                d="M 50 220 L 200 220 C 350 220, 400 80, 750 80" 
                fill="none" 
                stroke="#eab308" 
                strokeWidth="4" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                filter="url(#neonGold)"
              >
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur={`${duration}s`} fill="freeze" />
              </path>

              {/* Moving Particle representing "Alternative History" */}
              <circle r="8" fill="#fff" filter="url(#neonGold)">
                <animateMotion 
                  dur={`${duration}s`} 
                  path="M 50 220 L 200 220 C 350 220, 400 80, 750 80"
                  fill="freeze"
                />
              </circle>

              {/* LABELS REVEAL */}
              <g opacity="0">
                 <animate attributeName="opacity" from="0" to="1" begin={`${duration * 0.25}s`} dur="1s" fill="freeze" />
                 <line x1="200" y1="220" x2="200" y2="150" stroke="#eab308" strokeWidth="1" strokeDasharray="4 4" />
                 <text x="210" y="140" fill="#eab308" fontSize="16" fontWeight="bold" fontFamily="monospace">IF {unrealEvent.toUpperCase()}...</text>
              </g>

              <g opacity="0">
                 <animate attributeName="opacity" from="0" to="1" begin={`${duration * 0.8}s`} dur="1s" fill="freeze" />
                 <circle cx="750" cy="80" r="15" stroke="#eab308" strokeWidth="2" fill="none">
                    <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                 </circle>
                 <text x="730" y="50" textAnchor="end" fill="#eab308" fontSize="20" fontWeight="bold" filter="url(#neonGold)">WOULD HAVE {result.toUpperCase()}</text>
              </g>
            </svg>
          </div>
        </div>
        
        {/* Scroll Hint for Mobile */}
        <div className="md:hidden absolute bottom-2 right-4 pointer-events-none text-white/50 flex items-center gap-1 text-[10px] uppercase font-bold animate-pulse">
           <MoveHorizontal size={12} /> Scroll to view
        </div>
      </div>

      <div className="bg-zinc-900 px-6 py-3 flex justify-between items-center text-[10px] md:text-xs font-mono text-zinc-500 border-t border-zinc-800">
         <span>STATUS: SIMULATION COMPLETE</span>
         <span>UNIT 11.1 // GRAMMAR DEPT</span>
      </div>
    </div>
  );
};