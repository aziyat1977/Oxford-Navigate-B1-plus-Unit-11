import React, { useState } from 'react';
import { Play, RotateCcw, Gauge } from 'lucide-react';
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
    <div className="w-full my-12 bg-zinc-950 p-1 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
      {/* Header / Controls */}
      <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center border-b border-zinc-800">
        <div>
           <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-6 bg-noir-red inline-block"></span>
             Timeline Divergence
           </h3>
           <p className="text-zinc-500 text-xs font-mono">FORENSIC RECONSTRUCTION</p>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={toggleSpeed}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${isSlowMo ? 'bg-blue-900/30 text-blue-400 border border-blue-500/50' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
           >
             <Gauge size={14} />
             {isSlowMo ? 'ANALYSIS MODE (0.3x)' : 'REALTIME (1.0x)'}
           </button>
           <button 
             onClick={handleReplay}
             className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-300 text-xs font-bold font-mono hover:bg-zinc-700 transition-colors"
           >
             <RotateCcw size={14} /> REPLAY
           </button>
        </div>
      </div>
      
      {/* Visualization */}
      <div className="relative h-80 w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" key={key}>
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

      <div className="bg-zinc-900 px-6 py-3 flex justify-between items-center text-xs font-mono text-zinc-500 border-t border-zinc-800">
         <span>STATUS: SIMULATION COMPLETE</span>
         <span>UNIT 11.1 // GRAMMAR DEPT</span>
      </div>
    </div>
  );
};