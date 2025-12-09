import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, RefreshCcw, Trophy, Clock, ShieldAlert, Zap, Timer } from 'lucide-react';
import { Quiz, Question } from '../types';
import { playSFX, speak } from '../utils/audio';

interface QuizRunnerProps {
  quiz: Quiz;
  onExit: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onExit }) => {
  const [status, setStatus] = useState<'intro' | 'active' | 'summary'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [timeLeft, setTimeLeft] = useState(quiz.timing_minutes * 60);
  
  // Matching Game State
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const currentQ = quiz.questions ? quiz.questions[qIndex] : null;
  const totalQ = quiz.questions?.length || 0;

  useEffect(() => {
    if (status === 'active' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && status === 'active') {
      finishQuiz();
    }
  }, [status, timeLeft]);

  const startQuiz = () => {
    playSFX('click');
    setStatus('active');
    speak(`Mission initiated: ${quiz.name}`);
  };

  const finishQuiz = () => {
    playSFX('correct'); // Fanfare
    setStatus('summary');
  };

  const handleNext = () => {
    playSFX('click');
    if (qIndex < totalQ - 1) {
      setQIndex(prev => prev + 1);
      setUserInput('');
      setFeedback('none');
      setMatches({});
      setSelectedLeft(null);
    } else {
      finishQuiz();
    }
  };

  const validateAnswer = (isCorrect: boolean) => {
    if (feedback !== 'none') return; // Prevent double submission

    if (isCorrect) {
      playSFX('correct');
      setScore(prev => prev + 100 + (streak * 10)); // Score multiplier
      setStreak(prev => prev + 1);
      setFeedback('correct');
    } else {
      playSFX('wrong');
      setStreak(0);
      setFeedback('wrong');
    }
  };

  // --- Input Handlers ---

  const handleMCQ = (option: string) => {
    const correct = currentQ?.answer?.toLowerCase().trim();
    validateAnswer(option.toLowerCase().trim() === correct);
  };

  const handleTextSubmit = () => {
    if (!currentQ) return;
    // Fuzzy match: check if user input is contained in answer or vice versa for flexibility
    const correct = currentQ.answer?.toLowerCase() || "";
    const input = userInput.toLowerCase().trim();
    
    // Split multiple possible answers (e.g. "sentenced; prison")
    const parts = correct.split(/[;/]/).map(s => s.trim());
    const isCorrect = parts.some(p => input.includes(p) || p.includes(input));
    
    validateAnswer(isCorrect);
  };

  const handleMatching = (item: string, side: 'left' | 'right') => {
    playSFX('click');
    if (side === 'left') {
      setSelectedLeft(item);
    } else {
      if (selectedLeft) {
        // Attempt match
        const newMatches = { ...matches, [selectedLeft]: item };
        setMatches(newMatches);
        setSelectedLeft(null);
        
        // Check if full completion (simple check based on count for this demo)
        const pairsCount = currentQ?.answer?.split(';').length || 0; 
        // Note: Real matching logic would need structured data in Question type. 
        // For this demo with text-based matching questions, we simulate success after 3 moves.
        if (Object.keys(newMatches).length >= 3) {
             validateAnswer(true);
        }
      }
    }
  };

  // --- RENDERERS ---

  const renderContent = () => {
    if (!currentQ) return null;

    switch (currentQ.type) {
      case 'multiple_choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {currentQ.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleMCQ(opt)}
                disabled={feedback !== 'none'}
                className={`p-6 rounded-xl border-2 text-lg font-bold transition-all
                  ${feedback === 'none' 
                    ? 'border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-noir-tan text-gray-200' 
                    : opt.toLowerCase() === currentQ.answer?.toLowerCase()
                      ? 'bg-green-600 border-green-400 text-white'
                      : 'bg-gray-900 border-gray-800 text-gray-500 opacity-50'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case 'fill_in_the_blank':
      case 'error_correction':
      case 'short_answer':
        return (
          <div className="mt-8">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={feedback !== 'none'}
              onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type your answer protocol..."
              className="w-full bg-black border-b-4 border-gray-700 text-2xl md:text-4xl text-white p-4 focus:outline-none focus:border-noir-tan font-mono placeholder-gray-600"
            />
            {feedback === 'none' && (
              <button 
                onClick={handleTextSubmit}
                className="mt-6 bg-white text-black px-8 py-3 rounded-lg font-bold uppercase hover:bg-gray-200 transition-colors"
              >
                Submit Analysis
              </button>
            )}
          </div>
        );

      case 'classification':
        // e.g. "Write T / B / R"
        return (
           <div className="mt-8 flex gap-4 justify-center">
              {['Theft', 'Burglary', 'Robbery'].map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => handleMCQ(cat)} // Reuse MCQ logic if answer key matches single word, else this needs tailored logic
                   className="bg-gray-800 border-2 border-gray-600 px-6 py-4 rounded-lg font-bold hover:border-noir-red"
                 >
                   {cat}
                 </button>
              ))}
              <div className="w-full text-center text-gray-500 mt-4 text-sm">(Type answer manually if complex)</div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                className="w-full bg-black border border-gray-700 p-2 text-white mt-2"
                placeholder="Or type sequence (e.g. 1=T, 2=B)"
              />
              <button onClick={handleTextSubmit} className="p-2 bg-white text-black font-bold">CHECK</button>
           </div>
        );
      
      case 'matching':
        return (
          <div className="mt-8">
             <p className="text-sm text-gray-500 mb-4">Note: Manual text entry required for this simulation.</p>
             <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={feedback !== 'none'}
              placeholder="Type pairs (e.g. regret=feel sorry)"
              className="w-full bg-black border-b-4 border-gray-700 text-xl text-white p-4 font-mono"
            />
            {feedback === 'none' && <button onClick={handleTextSubmit} className="mt-4 bg-white text-black px-6 py-2 font-bold">VERIFY</button>}
          </div>
        );

      default:
        return <div className="text-red-500">Unknown Question Type Protocol</div>;
    }
  };

  // --- VIEWS ---

  if (status === 'intro') {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-black border-2 border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-noir-red animate-pulse" />
          
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-noir-red/20 rounded-full flex items-center justify-center mx-auto text-noir-red">
              <ShieldAlert size={48} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              {quiz.name}
            </h1>
            
            <p className="text-xl text-gray-400 font-mono">
              TIMELIMIT: {quiz.timing_minutes}:00 // QUESTIONS: {totalQ}
            </p>

            <div className="flex justify-center gap-4 pt-8">
              <button 
                onClick={onExit}
                className="px-8 py-4 rounded-xl border-2 border-gray-700 text-gray-400 font-bold hover:bg-gray-900 transition-colors"
              >
                ABORT
              </button>
              <button 
                onClick={startQuiz}
                className="px-8 py-4 rounded-xl bg-noir-red text-white font-bold text-xl hover:bg-red-600 transition-colors shadow-lg hover:scale-105 transform"
              >
                START MISSION
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'summary') {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-black border-2 border-noir-tan p-8 rounded-3xl shadow-2xl text-center">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6 animate-bounce" />
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">MISSION COMPLETE</h2>
          <p className="text-2xl font-mono text-noir-tan mb-8">FINAL SCORE: {score}</p>
          
          <div className="grid grid-cols-2 gap-4 text-left bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl mb-8">
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase">Accuracy</p>
               <p className="text-xl font-bold text-gray-900 dark:text-white">{(score / (totalQ * 100) * 100).toFixed(0)}%</p>
             </div>
             <div>
               <p className="text-xs font-bold text-gray-500 uppercase">Time Remaining</p>
               <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
             </div>
          </div>

          <button 
            onClick={onExit}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black text-xl rounded-xl hover:opacity-90"
          >
            RETURN TO BASE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-gray-800 flex justify-between items-center px-6 bg-black">
        <div className="flex items-center gap-4">
           <button onClick={onExit} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
             <X />
           </button>
           <div className="hidden md:block">
             <p className="text-xs font-bold text-gray-500 uppercase">Mission</p>
             <p className="text-white font-bold truncate max-w-[200px]">{quiz.name}</p>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-noir-tan font-mono">
              <Zap size={18} />
              <span className="text-xl font-bold">{score}</span>
           </div>
           <div className={`flex items-center gap-2 font-mono ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
              <Timer size={18} />
              <span className="text-xl font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
           </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-900 w-full">
        <div 
          className="h-full bg-noir-red transition-all duration-500"
          style={{ width: `${((qIndex + 1) / totalQ) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full p-6 md:p-12 overflow-y-auto">
         <div className="mb-8">
            <span className="inline-block bg-gray-800 text-gray-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4">
               Question {qIndex + 1} of {totalQ}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
               {currentQ?.q}
            </h2>
         </div>

         {renderContent()}

         {/* Feedback Overlay */}
         {feedback !== 'none' && (
           <div className={`mt-8 p-6 rounded-xl border-l-4 animate-in fade-in slide-in-from-bottom-4 
             ${feedback === 'correct' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}
           >
              <div className="flex items-center gap-4 mb-2">
                 {feedback === 'correct' ? <Check className="text-green-500" size={32} /> : <X className="text-red-500" size={32} />}
                 <h3 className={`text-2xl font-black uppercase ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'correct' ? 'Correct' : 'Incorrect'}
                 </h3>
              </div>
              <p className="text-gray-300 text-lg">
                 <span className="font-bold text-gray-500 uppercase text-xs block mb-1">DATA LOG:</span> 
                 {currentQ?.answer}
              </p>
              
              <button 
                onClick={handleNext}
                className="mt-6 flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold uppercase hover:bg-gray-200 transition-colors"
              >
                {qIndex < totalQ - 1 ? 'Next Intel' : 'Finish Mission'} <ArrowRight size={20} />
              </button>
           </div>
         )}
      </div>
    </div>
  );
};