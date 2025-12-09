import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, EyeOff, Volume2, Trophy, RefreshCcw, HelpCircle, Check, X } from 'lucide-react';
import { Quiz, Question } from '../types';
import { playSFX, speak } from '../utils/audio';

interface QuizSectionProps {
  quiz: Quiz;
}

type QuestionStatus = 'unanswered' | 'correct' | 'wrong' | 'revealed';

export const QuizSection: React.FC<QuizSectionProps> = ({ quiz }) => {
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionStatus>>({});
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [shakeId, setShakeId] = useState<number | null>(null); // ID of question to shake

  // Reset quiz when quiz prop changes
  useEffect(() => {
    resetQuiz();
  }, [quiz]);

  const resetQuiz = () => {
    setQuestionStates({});
    setUserInputs({});
    setScore(0);
    setShakeId(null);
  };

  const calculateProgress = () => {
    const total = (quiz.questions?.length || 0) + (quiz.task ? 1 : 0);
    if (total === 0) return 0;
    const answered = Object.keys(questionStates).length;
    return Math.round((answered / total) * 100);
  };

  // --- Handlers ---

  const handleMultipleChoice = (qIdx: number, selectedOption: string, correctAnswer?: string) => {
    if (questionStates[qIdx] === 'correct' || questionStates[qIdx] === 'revealed') return;

    // Simple normalization for string comparison
    const isCorrect = selectedOption.trim().toLowerCase() === (correctAnswer || '').trim().toLowerCase();

    if (isCorrect) {
      playSFX('correct');
      setQuestionStates(prev => ({ ...prev, [qIdx]: 'correct' }));
      setScore(prev => prev + 10); // +10 points for direct correct answer
    } else {
      playSFX('wrong');
      setQuestionStates(prev => ({ ...prev, [qIdx]: 'wrong' }));
      setShakeId(qIdx);
      setTimeout(() => setShakeId(null), 500); // Reset shake after animation
    }
  };

  const handleTextCheck = (qIdx: number, correctAnswer?: string) => {
    const input = userInputs[qIdx] || '';
    if (!input.trim()) return;

    // Allow multiple correct answers separated by ; or /
    const acceptableAnswers = (correctAnswer || '').split(/[;/]/).map(s => s.trim().toLowerCase());
    const userInput = input.trim().toLowerCase();
    
    // Check if user input matches any acceptable answer segment
    // Or if the full answer contains the user input (lenient) if input is substantial
    const isCorrect = acceptableAnswers.some(ans => 
        ans === userInput || (ans.length > 5 && ans.includes(userInput))
    );

    if (isCorrect) {
      playSFX('correct');
      setQuestionStates(prev => ({ ...prev, [qIdx]: 'correct' }));
      setScore(prev => prev + 10);
    } else {
      playSFX('wrong');
      setQuestionStates(prev => ({ ...prev, [qIdx]: 'wrong' })); // Mark wrong initially, allow retry or reveal
      setShakeId(qIdx);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const handleSelfGrade = (qIdx: number, isCorrect: boolean) => {
    playSFX(isCorrect ? 'correct' : 'wrong');
    setQuestionStates(prev => ({ ...prev, [qIdx]: isCorrect ? 'correct' : 'revealed' }));
    if (isCorrect) setScore(prev => prev + 10);
  };

  const revealAnswer = (qIdx: number) => {
    playSFX('reveal');
    setQuestionStates(prev => ({ ...prev, [qIdx]: 'revealed' }));
  };

  // --- Renderers ---

  const renderMCQ = (q: Question, idx: number, status: QuestionStatus) => (
    <div className="grid grid-cols-1 gap-3 mt-4">
      {q.options?.map((opt, optIdx) => {
        const isSelectedAndWrong = status === 'wrong' && false; // We don't track selected option specifically in generic state, but could expand.
        // For simplicity in this specialized view:
        return (
          <button
            key={optIdx}
            onClick={() => handleMultipleChoice(idx, opt, q.answer)}
            disabled={status === 'correct'}
            className={`
              p-4 rounded-xl text-left font-medium transition-all duration-200 border-2
              ${status === 'correct' && opt === q.answer 
                ? 'bg-green-500 text-white border-green-600 shadow-lg scale-105' 
                : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-gray-700 hover:border-noir-tan hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300'
              }
              ${status === 'wrong' && opt !== q.answer ? 'opacity-50' : ''}
            `}
          >
            <div className="flex justify-between items-center">
              <span>{opt}</span>
              {status === 'correct' && opt === q.answer && <CheckCircle size={20} className="animate-bounce" />}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderTextInput = (q: Question, idx: number, status: QuestionStatus) => (
    <div className="mt-4">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={userInputs[idx] || ''}
          onChange={(e) => setUserInputs(prev => ({ ...prev, [idx]: e.target.value }))}
          disabled={status === 'correct' || status === 'revealed'}
          placeholder="Type your answer..."
          className={`flex-1 p-3 rounded-xl border-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none transition-colors
            ${status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 focus:border-noir-tan'}
            ${status === 'wrong' ? 'border-red-500' : ''}
          `}
        />
        {(status !== 'correct' && status !== 'revealed') && (
          <button 
            onClick={() => handleTextCheck(idx, q.answer)}
            className="bg-noir-tan text-black p-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
          >
            Check
          </button>
        )}
      </div>
      
      {/* If wrong, offer reveal */}
      {status === 'wrong' && (
        <div className="mt-2 flex justify-end">
           <button onClick={() => revealAnswer(idx)} className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1">
             <HelpCircle size={12} /> I give up, show me
           </button>
        </div>
      )}
    </div>
  );

  const renderSelfCheck = (q: Question, idx: number, status: QuestionStatus) => (
    <div className="mt-4">
      {status === 'unanswered' ? (
        <button 
          onClick={() => revealAnswer(idx)}
          className="w-full py-3 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
        >
          REVEAL ANSWER
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-2">
          <div className="bg-gray-100 dark:bg-black p-4 rounded-xl border-l-4 border-noir-tan mb-4">
            <p className="text-sm text-gray-500 uppercase font-bold mb-1">Correct Answer</p>
            <p className="text-lg font-mono text-gray-900 dark:text-white">{q.answer || q.answer_key}</p>
          </div>
          
          {status === 'revealed' && (
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => handleSelfGrade(idx, false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <X size={18} /> Missed it
              </button>
              <button 
                onClick={() => handleSelfGrade(idx, true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                <Check size={18} /> Got it!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-12 relative">
      
      {/* Quiz Header */}
      <div className="bg-gray-100 dark:bg-black border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            <Trophy className={score > 0 ? "text-yellow-500 animate-bounce" : "text-gray-400"} />
            {quiz.name}
          </h2>
          <div className="flex items-center gap-2 mt-2">
             <div className="h-2 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-noir-red transition-all duration-1000 ease-out" 
                  style={{ width: `${calculateProgress()}%` }}
                />
             </div>
             <span className="text-xs font-bold text-gray-500">{calculateProgress()}% COMPLETE</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-center">
              <span className="block text-xs font-bold text-gray-400 uppercase">Score</span>
              <span className="text-3xl font-black text-noir-red tabular-nums">{score}</span>
           </div>
           <button 
             onClick={() => { playSFX('click'); resetQuiz(); }}
             className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
             title="Restart Quiz"
           >
             <RefreshCcw size={20} />
           </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-gray-100 dark:divide-zinc-900">
        {quiz.questions?.map((q, idx) => {
          const status = questionStates[idx] || 'unanswered';
          const isShaking = shakeId === idx;

          return (
            <div 
              key={idx} 
              className={`p-6 md:p-8 transition-colors duration-500 
                ${status === 'correct' ? 'bg-green-50/50 dark:bg-green-900/5' : ''}
                ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}
              `}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-xs font-black font-mono border-2
                    ${status === 'correct' ? 'bg-green-500 border-green-500 text-white' : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-400'}
                  `}>
                    {status === 'correct' ? <Check size={16} /> : idx + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{q.type.replace(/_/g, ' ')}</span>
                </div>
                <button onClick={() => speak(q.q)} className="text-gray-300 hover:text-noir-red transition-colors">
                   <Volume2 size={20} />
                </button>
              </div>

              <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">{q.q}</p>

              {/* Render specific interactive body based on type */}
              {q.type === 'multiple_choice' 
                ? renderMCQ(q, idx, status)
                : (q.type === 'fill_in_the_blank' && !q.q.includes('___')) // Sometimes blanks are implied, sometimes explicit
                  ? renderTextInput(q, idx, status)
                  : (q.type === 'fill_in_the_blank') // Explicit blanks usually fit inputs
                    ? renderTextInput(q, idx, status) 
                    : renderSelfCheck(q, idx, status) // Default matching/classification to self-check
              }

              {/* Feedback Message */}
              <div className={`mt-4 overflow-hidden transition-all duration-500 ${status === 'correct' || status === 'revealed' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                 {(status === 'correct' || status === 'revealed') && (
                   <div className="flex items-start gap-3 pt-4 border-t border-gray-200 dark:border-gray-800/50">
                      <div className="mt-1">
                        {status === 'correct' 
                          ? <CheckCircle className="text-green-500" size={20} />
                          : <Eye className="text-noir-tan" size={20} />
                        }
                      </div>
                      <div>
                        <p className={`font-bold text-sm uppercase mb-1 ${status === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-noir-tan'}`}>
                          {status === 'correct' ? 'Correct Analysis' : 'Reference Data'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {q.answer || q.answer_key}
                        </p>
                      </div>
                   </div>
                 )}
              </div>

            </div>
          );
        })}

        {/* Task Section (Writing/Creative) */}
        {quiz.task && (
          <div className="p-8 bg-noir-tan/10 border-l-4 border-noir-tan">
             <h3 className="text-xl font-black text-noir-tan uppercase mb-4 flex items-center gap-2">
               <span className="text-2xl">⚡</span> Field Mission
             </h3>
             <p className="text-lg text-gray-800 dark:text-gray-200 font-medium mb-6">{quiz.task}</p>
             
             {quiz.checklist_answer_key && (
               <div className="bg-white dark:bg-black p-6 rounded-xl">
                 <p className="text-sm font-bold text-gray-500 uppercase mb-4">Mission Checklist</p>
                 <ul className="space-y-3">
                   {quiz.checklist_answer_key.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <div className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 flex-shrink-0" />
                       <span className="text-gray-700 dark:text-gray-300">{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {calculateProgress() === 100 && (
        <div className="bg-green-500 text-white p-4 text-center font-bold uppercase tracking-widest animate-pulse">
           MODULE COMPLETE // FINAL SCORE: {score}
        </div>
      )}

      {/* Shake Animation Keyframes injected locally */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};