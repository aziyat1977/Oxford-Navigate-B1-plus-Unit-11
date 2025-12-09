import React, { useState } from 'react';

interface RedactedTextProps {
  text: string;
  hint?: string;
}

export const RedactedText: React.FC<RedactedTextProps> = ({ text, hint }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <span 
      className={`
        relative inline-block px-1 mx-1 cursor-pointer transition-all duration-500
        ${isRevealed ? 'bg-transparent text-noir-red border-b-2 border-noir-red' : 'bg-black text-black select-none'}
      `}
      onMouseEnter={() => setIsRevealed(true)}
      onClick={() => setIsRevealed(true)}
      title={isRevealed ? '' : (hint || "Hover to declassify")}
    >
      {text}
      {!isRevealed && (
        <span className="absolute inset-0 bg-black animate-pulse opacity-90"></span>
      )}
    </span>
  );
};