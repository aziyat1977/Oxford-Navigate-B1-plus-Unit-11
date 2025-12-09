import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { Quiz } from '../types';

interface QuizSectionProps {
  quiz: Quiz;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ quiz }) => {
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);

  const toggleAnswer = (idx: number) => {
    if (visibleAnswers.includes(idx)) {
      setVisibleAnswers(visibleAnswers.filter(i => i !== idx));
    } else {
      setVisibleAnswers([...visibleAnswers, idx]);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase">{quiz.name}</h2>
        <span className="bg-noir-red text-white px-4 py-1 rounded-full text-sm font-bold font-mono">
          {quiz.timing_minutes} MIN
        </span>
      </div>

      <div className="space-y-6">
        {quiz.questions?.map((q, idx) => {
          const isRevealed = visibleAnswers.includes(idx);
          return (
            <div 
              key={idx} 
              className={`
                bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 transition-all duration-500
                ${isRevealed ? 'border-green-500 shadow-green-500/20 shadow-lg' : 'border-gray-100 dark:border-gray-800 hover:border-noir-tan'}
              `}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <span className="inline-block bg-gray-100 dark:bg-black text-gray-500 text-xs font-bold px-2 py-1 rounded mb-2 font-mono">
                    QUESTION {idx + 1}
                  </span>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{q.q}</p>
                  
                  {q.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {q.options.map((opt, i) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-black rounded-lg text-lg text-gray-600 dark:text-gray-400 font-medium">
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => toggleAnswer(idx)}
                  className={`
                    flex-shrink-0 p-3 rounded-xl transition-all
                    ${isRevealed ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-black text-gray-400 hover:bg-gray-200'}
                  `}
                >
                  {isRevealed ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>

              <div 
                className={`
                  overflow-hidden transition-all duration-500 ease-out
                  ${isRevealed ? 'max-h-40 opacity-100 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Correct Answer</p>
                    <p className="text-2xl font-black text-green-600 dark:text-green-400">{q.answer || q.answer_key}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};