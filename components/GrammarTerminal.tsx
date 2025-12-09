import React, { useState } from 'react';
import { Terminal, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

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
    } else {
      let msg = "SYNTAX ERROR: ";
      if (!hasHad) msg += "Missing Past Perfect (had + v3) in condition. ";
      if (!hasWouldHave) msg += "Missing 'would have' in result.";
      setFeedback(msg);
      setStatus('error');
    }
  };

  return (
    <div className="bg-black border border-gray-700 p-6 font-mono rounded-md mt-8 shadow-inner">
      <div className="flex items-center gap-2 text-green-500 mb-4 border-b border-gray-800 pb-2">
        <Terminal size={18} />
        <span className="text-sm">FORENSIC LINGUISTICS LAB v1.0</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500 text-xs mb-1">CONDITION (IF...)</label>
            <input 
              type="text" 
              value={inputIf}
              onChange={(e) => setInputIf(e.target.value)}
              placeholder="e.g. If he had crashed..."
              className="w-full bg-gray-900 border border-gray-700 text-green-400 p-3 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div className="flex items-center justify-center md:pt-6">
            <ArrowRight className="text-gray-600 hidden md:block" />
          </div>
        </div>

        <div>
           <label className="block text-gray-500 text-xs mb-1">RESULT (...WOULD HAVE)</label>
            <input 
              type="text" 
              value={inputResult}
              onChange={(e) => setInputResult(e.target.value)}
              placeholder="e.g. he would have died."
              className="w-full bg-gray-900 border border-gray-700 text-green-400 p-3 focus:outline-none focus:border-green-500 transition-colors"
            />
        </div>

        <button 
          onClick={checkGrammar}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 uppercase text-sm tracking-widest transition-colors flex items-center justify-center gap-2"
        >
          Verify Hypothesis
        </button>

        {feedback && (
          <div className={`p-4 border-l-4 ${status === 'success' ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'} flex items-start gap-3`}>
            {status === 'success' ? <CheckCircle className="text-green-500 shrink-0" /> : <XCircle className="text-red-500 shrink-0" />}
            <span className={status === 'success' ? 'text-green-400' : 'text-red-400'}>{feedback}</span>
          </div>
        )}
      </div>
    </div>
  );
};