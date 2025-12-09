import React, { useState } from 'react';
import { RefreshCcw, Rewind, Play } from 'lucide-react';
import { playSFX } from '../utils/audio';

interface RegretTimelineProps {
  action: string;
  regret: string;
  correction: string;
}

export const RegretTimeline: React.FC<RegretTimelineProps> = ({ action, regret, correction }) => {
  const [key, setKey] = useState(0);
  const [isSlowMo, setIsSlowMo] = useState(false);

  // Animation Timings (in seconds)
  // Normal: Mistake(1s) -> Wait(2s) -> Regret(1s) -> Rewind(2s) -> Correction(1s) = ~7s
  // SlowMo: 3x slower = ~21s
  const speedMult = isSlowMo ? 3 : 1;

  const handleReplay = () => {
    playSFX('click');
    setKey(prev => prev + 1);
  };

  const toggleSpeed = () => {
    playSFX('click');
    setIsSlowMo(!isSlowMo);
    setKey(prev => prev + 1);
  };

  return (
    <div className="w-full my-12 bg-white dark:bg-black p-1 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden relative group">
      
      {/* Controls Header */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
         <button 
           onClick={toggleSpeed}
           className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 p-2 rounded-full transition-colors"
           title={isSlowMo ? "Switch to Normal Speed" : "Switch to Slow Motion"}
         >
            {isSlowMo ? <Play size={16} /> : <Rewind size={16} />}
         </button>
         <button 
           onClick={handleReplay}
           className="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 p-2 rounded-full transition-colors"
           title="Replay Simulation"
         >
            <RefreshCcw size={16} />
         </button>
      </div>

      <div className="p-8 pb-0">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
          <RefreshCcw className="text-noir-tan animate-spin-slow" />
          Time Machine Protocol
        </h3>
        <p className="text-sm font-mono text-gray-500 mt-2">
           ANALYSIS SPEED: {isSlowMo ? '33% (SLOW)' : '100% (NORMAL)'}
        </p>
      </div>
      
      <div className="relative h-72 w-full" key={key}>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
          
          <defs>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* BASE TIMELINE */}
          <line x1="50" y1="200" x2="750" y2="200" stroke="#52525b" strokeWidth="2" strokeOpacity="0.3" />
          
          {/* T1: THE MISTAKE */}
          <g>
             {/* The square that appears first (Red) */}
             <rect x="140" y="190" width="20" height="20" fill="#ef4444" opacity="1">
                <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.1;0.9" dur={`${7 * speedMult}s`} fill="freeze" />
             </rect>
             <text x="150" y="170" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold" opacity="1">
                <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.1;0.9" dur={`${7 * speedMult}s`} fill="freeze" />
                {action}
             </text>
          </g>

          {/* TIME PROGRESS BAR */}
          <line x1="150" y1="200" x2="650" y2="200" stroke="#ef4444" strokeWidth="4" strokeDasharray="500" strokeDashoffset="500">
             <animate attributeName="stroke-dashoffset" from="500" to="0" begin={`${0.5 * speedMult}s`} dur={`${2 * speedMult}s`} fill="freeze" />
             <animate attributeName="opacity" values="1;0" begin={`${4 * speedMult}s`} dur="0.5s" fill="freeze" />
          </line>

          {/* T2: THE REGRET */}
          <g opacity="0">
             <animate attributeName="opacity" from="0" to="1" begin={`${2.5 * speedMult}s`} dur="0.5s" fill="freeze" />
             <animate attributeName="opacity" from="1" to="0" begin={`${4 * speedMult}s`} dur="0.5s" fill="freeze" />
             
             <circle cx="650" cy="200" r="8" fill="#eab308" />
             <text x="650" y="170" textAnchor="middle" fill="#eab308" fontSize="14" fontWeight="bold">"{regret}"</text>
          </g>

          {/* THE REWIND ACTION */}
          {/* An arc going backwards from 650 to 150 */}
          <path 
            d="M 650 200 Q 400 50 150 200" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="3" 
            strokeDasharray="1000" 
            strokeDashoffset="1000"
            filter="url(#glowGreen)"
          >
             <animate attributeName="stroke-dashoffset" from="1000" to="0" begin={`${4 * speedMult}s`} dur={`${1.5 * speedMult}s`} fill="freeze" />
          </path>
          
          <text x="400" y="100" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold" letterSpacing="0.2em" opacity="0">
             <animate attributeName="opacity" values="0;1;0" begin={`${4 * speedMult}s`} dur={`${1.5 * speedMult}s`} />
             REWINDING...
          </text>

          {/* T3: THE CORRECTION (Transformation) */}
          <g opacity="0">
             <animate attributeName="opacity" from="0" to="1" begin={`${5.5 * speedMult}s`} dur="0.5s" fill="freeze" />
             
             {/* Green Circle replaces Red Square */}
             <circle cx="150" cy="200" r="12" fill="#10b981" filter="url(#glowGreen)">
                <animate attributeName="r" values="0;15;12" begin={`${5.5 * speedMult}s`} dur="0.5s" fill="freeze" />
             </circle>
             
             <text x="150" y="140" textAnchor="start" fill="#10b981" fontSize="18" fontWeight="black" filter="url(#glowGreen)">
                BETTER: {correction}
             </text>
             <path d="M 150 200 L 170 150" stroke="#10b981" strokeWidth="1" />
          </g>

        </svg>
      </div>
      
      <div className="bg-gray-100 dark:bg-zinc-900 px-6 py-2 flex justify-between items-center text-xs text-gray-400 font-mono">
         <span>SEQUENCE: MISTAKE_DETECTED -> AUTO_CORRECT_INITIATED</span>
      </div>
    </div>
  );
};