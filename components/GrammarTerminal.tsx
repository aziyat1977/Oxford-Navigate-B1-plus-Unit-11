import React, { useState } from 'react';
import { Terminal, CheckCircle, XCircle, ArrowRight, ArrowDown } from 'lucide-react';
import { playSFX } from '../utils/audio';

export const GrammarTerminal: React.FC = () => {
  const [inputIf, setInputIf] = useState('');
  const [inputResult, setInputResult] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<'neutral' | 'success' | 'error'>('neutral');

  const checkGrammar = () => {
    // Simple heuristic check for "had" and "would have"
    const hasHad = inputIf.toLowerCase().includes('had');
    const hasWouldHave = inputResult.toLowerCase().includes('would have') || inputResult.toLowerCase().includes("would've");
    
    if (hasHad && hasWouldHave) {
      setFeedback("MATCH CONFIRMED: 3rd Conditional Logic Valid.");
      setStatus('success');
      playSFX('correct');
    } else {
      let msg = "SYNTAX ERROR: ";
      if (!hasHad) msg += "Missing Past Perfect (had + v3) in condition. ";
      if (!hasWouldHave) msg += "Missing 'would have' in result.";
      setFeedback(msg);
      setStatus('error');
      playSFX('wrong');
    }
  };

  const handleTyping = (setter: (v: string) => void, val: string) => {
    setter(val);
    if (Math.random() > 0.5) playSFX('typing'); // Don't play on every keystroke to avoid annoyance
  };

  return (
    <div className="bg-black border border-gray-700 p-4 md:p-6 font-mono rounded-md mt-8 shadow-inner overflow-hidden">
      <div className="flex items-center gap-2 text-green-500 mb-4 border-b border-gray-800 pb-2">
        <Terminal size={18} />
        <span className="text-xs md:text-sm truncate">FORENSIC LINGUISTICS LAB v1.0</span>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1">
            <label className="block text-gray-500 text-[10px] md:text-xs mb-1 uppercase tracking-wider">CONDITION (IF...)</label>
            <input 
              type="text" 
              value={inputIf}
              onChange={(e) => handleTyping(setInputIf, e.target.value)}
              placeholder="e.g. If he had crashed..."
              className="w-full bg-gray-900 border border-gray-700 text-green-400 p-3 md:p-4 text-base focus:outline-none focus:border-green-500 transition-colors rounded-sm"
            />
          </div>
          
          <div className="flex items-center justify-center text-gray-600">
            <ArrowRight className="hidden md:block" />
            <ArrowDown className="block md:hidden" />
          </div>

          <div className="flex-1">
             <label className="block text-gray-500 text-[10px] md:text-xs mb-1 uppercase tracking-wider">RESULT (...WOULD HAVE)</label>
              <input 
                type="text" 
                value={inputResult}
                onChange={(e) => handleTyping(setInputResult, e.target.value)}
                placeholder="e.g. he would have died."
                className="w-full bg-gray-900 border border-gray-700 text-green-400 p-3 md:p-4 text-base focus:outline-none focus:border-green-500 transition-colors rounded-sm"
              />
          </div>
        </div>

        <button 
          onClick={checkGrammar}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 md:py-4 uppercase text-sm tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm touch-manipulation font-bold"
        >
          Verify Hypothesis
        </button>

        {feedback && (
          <div className={`p-4 border-l-4 ${status === 'success' ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'} flex items-start gap-3 animate-in fade-in`}>
            {status === 'success' ? <CheckCircle className="text-green-500 shrink-0" size={20} /> : <XCircle className="text-red-500 shrink-0" size={20} />}
            <span className={`text-sm md:text-base ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{feedback}</span>
          </div>
        )}
      </div>
    </div>
  );
};