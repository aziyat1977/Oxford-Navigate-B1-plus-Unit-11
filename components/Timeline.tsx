import React, { useEffect, useState } from 'react';

interface TimelineProps {
  realEvent: string;
  unrealEvent: string;
  result: string;
}

export const Timeline: React.FC<TimelineProps> = ({ realEvent, unrealEvent, result }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  return (
    <div className="w-full my-12 bg-white dark:bg-black p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
      <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-6 uppercase tracking-wider">
        Timeline Analysis
      </h3>
      
      <div className="relative h-64 w-full">
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
          
          {/* Defs for markers */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#888" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* REALITY LINE (Faded) */}
          <line x1="50" y1="150" x2="750" y2="150" stroke="#444" strokeWidth="2" strokeDasharray="10,10" opacity="0.3" markerEnd="url(#arrow)" />
          <text x="50" y="140" fill="#666" fontSize="14" fontWeight="bold">REALITY</text>
          
          <g className="opacity-40">
            <circle cx="200" cy="150" r="8" fill="#444" />
            <text x="200" y="180" textAnchor="middle" fill="#666" fontSize="14" className="font-mono">{realEvent}</text>
          </g>

          {/* UNREAL CURVE */}
          {/* Animated Path */}
          <path 
            d="M 50 150 Q 200 50 400 150 T 750 150" 
            fill="none" 
            stroke="#ff3333" 
            strokeWidth="4" 
            strokeDasharray="1000"
            strokeDashoffset={animate ? "0" : "1000"}
            className="transition-all duration-[4s] ease-in-out"
            filter="url(#glow)"
          />

          {/* Moving Ball - "Slow Motion" */}
          <circle r="10" fill="#fff" stroke="#ff3333" strokeWidth="3">
            <animateMotion 
              dur="6s" 
              repeatCount="indefinite"
              path="M 50 150 Q 200 50 400 150 T 750 150"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>

          {/* Unreal Labels */}
          <g className={`transition-opacity duration-1000 delay-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <text x="200" y="70" textAnchor="middle" fill="#ff3333" fontSize="18" fontWeight="bold" className="uppercase">
              IF... {unrealEvent}
            </text>
             <line x1="200" y1="80" x2="200" y2="150" stroke="#ff3333" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
          </g>

          <g className={`transition-opacity duration-1000 delay-[3000ms] ${animate ? 'opacity-100' : 'opacity-0'}`}>
             <text x="550" y="200" textAnchor="middle" fill="#c2b280" fontSize="18" fontWeight="bold" className="uppercase">
               RESULT: {result}
             </text>
             <line x1="550" y1="150" x2="550" y2="180" stroke="#c2b280" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
          </g>

        </svg>
      </div>
      
      <p className="text-center text-gray-500 dark:text-gray-400 mt-4 font-mono text-sm">
        Simulation: Alternate Reality Trajectory
      </p>
    </div>
  );
};