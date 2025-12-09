import React, { useState, useEffect } from 'react';
import { RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';

interface RegretTimelineProps {
  action: string;
  regret: string;
  correction: string;
}

export const RegretTimeline: React.FC<RegretTimelineProps> = ({ action, regret, correction }) => {
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReplay(prev => prev + 1);
    }, 8000); // 8 second loop for "slow motion" feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full my-12 bg-white dark:bg-black p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden relative group">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
          <RefreshCcw className="text-noir-tan animate-spin-slow" />
          Time Machine Protocol
        </h3>
        <span className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-xs font-mono px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
          LOOP_CYCLE: {replay}
        </span>
      </div>
      
      <div className="relative h-64 w-full" key={replay}>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 250">
          
          <defs>
            <marker id="arrowHead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
            <marker id="redArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ff3333" />
            </marker>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BASE TIMELINE */}
          <line x1="50" y1="150" x2="750" y2="150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowHead)" opacity="0.3" />
          
          {/* PAST MARKER */}
          <line x1="150" y1="140" x2="150" y2="160" stroke="#666" strokeWidth="2" />
          <text x="150" y="180" textAnchor="middle" fill="#666" fontSize="12" fontFamily="monospace" fontWeight="bold">PAST</text>

          {/* PRESENT MARKER */}
          <line x1="650" y1="140" x2="650" y2="160" stroke="#666" strokeWidth="2" />
          <text x="650" y="180" textAnchor="middle" fill="#666" fontSize="12" fontFamily="monospace" fontWeight="bold">PRESENT (NOW)</text>

          {/* ANIMATION STAGE 1: THE MISTAKE (Red Square) */}
          <g>
            <rect x="140" y="140" width="20" height="20" fill="#ff3333" opacity="0" transform="translate(-10, -10)">
               <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
               <animateTransform attributeName="transform" type="scale" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" additive="sum" />
            </rect>
            <text x="150" y="120" textAnchor="middle" fill="#ff3333" fontSize="16" fontWeight="bold" opacity="0" fontFamily="monospace">
              <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.8s" fill="freeze" />
              "{action}"
            </text>
          </g>

          {/* ANIMATION STAGE 2: TIME PASSES (Red Line moving forward) */}
          <path d="M 150 150 L 650 150" stroke="#ff3333" strokeWidth="4" fill="none" strokeDasharray="500" strokeDashoffset="500" opacity="0.5">
            <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="1.5s" fill="freeze" />
          </path>

          {/* ANIMATION STAGE 3: THE REGRET (Pulse at Present) */}
          <circle cx="650" cy="150" r="5" fill="none" stroke="#c2b280" strokeWidth="2" opacity="0">
             <animate attributeName="opacity" values="0;1;0" dur="1s" begin="3.5s" repeatCount="1" />
             <animate attributeName="r" values="5;30" dur="1s" begin="3.5s" repeatCount="1" />
          </circle>
          <text x="650" y="120" textAnchor="middle" fill="#c2b280" fontSize="14" fontWeight="bold" opacity="0">
             <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3.5s" fill="freeze" />
             {regret}
          </text>

          {/* ANIMATION STAGE 4: THE CORRECTION (Rewind Arc) */}
          <path d="M 650 150 Q 400 50 150 150" fill="none" stroke="#c2b280" strokeWidth="3" strokeDasharray="10,10" opacity="0">
             <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="4.5s" fill="freeze" />
             <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" begin="4.5s" fill="freeze" />
          </path>
          
          {/* Moving Particle on Arc */}
          <circle r="6" fill="#c2b280">
            <animateMotion 
               dur="1.5s" 
               begin="4.5s"
               path="M 650 150 Q 400 50 150 150"
               rotate="auto"
               fill="freeze"
            />
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="4.5s" fill="freeze" />
          </circle>

          {/* ANIMATION STAGE 5: THE IDEAL (Green Overlay) */}
          <g>
            <circle cx="150" cy="150" r="25" fill="#10b981" opacity="0">
               <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="6s" fill="freeze" />
            </circle>
            <path d="M140 150 L148 158 L160 142" stroke="white" strokeWidth="4" fill="none" opacity="0">
               <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="6.2s" fill="freeze" />
               <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="0.5s" begin="6.2s" fill="freeze" />
            </path>
            
            {/* Final Text */}
            <text x="400" y="50" textAnchor="middle" fill="#10b981" fontSize="24" fontWeight="bold" opacity="0" filter="url(#neonGlow)">
               <animate attributeName="opacity" from="0" to="1" dur="1s" begin="6.5s" fill="freeze" />
               {correction}
            </text>
          </g>

        </svg>
      </div>

      <div className="absolute bottom-4 right-6 flex gap-4 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Reality
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Ideal (Should have)
        </div>
      </div>
    </div>
  );
};