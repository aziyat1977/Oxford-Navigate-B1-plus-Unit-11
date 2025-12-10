import React, { useState } from 'react';
import { LessonPlanData, Quiz } from '../types';
import { Clock, Users, BookOpen, PenTool, ClipboardCheck, Lock, Play } from 'lucide-react';
import { MFPCard } from './MFPCard';

interface LessonPlanDisplayProps {
  data: LessonPlanData;
  onStartQuiz: (quiz: Quiz) => void;
}

type TabType = 'plan' | 'vocab' | 'grammar' | 'quiz';

export const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ data, onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState<TabType>('vocab'); // Default to vocab for learning mode

  // Dummy translations dictionary since they aren't in the JSON
  const getTranslations = (word: string) => {
    const dict: Record<string, {ru: string, uz: string}> = {
      "theft": { ru: "Кража", uz: "O'g'rilik" },
      "burglary": { ru: "Кража со взломом", uz: "Uy o'g'riligi" },
      "robbery": { ru: "Грабёж", uz: "Bosqinchilik" },
      "suspected": { ru: "Подозреваемый", uz: "Gumon qilingan" },
      "capture": { ru: "Захват", uz: "Qo'lga olish" },
      "arrest": { ru: "Арест", uz: "Hibsga olish" },
      "sentence": { ru: "Приговор", uz: "Hukm" },
      "prison": { ru: "Тюрьма", uz: "Qamoqxona" },
      "escaped": { ru: "Сбежал", uz: "Qochib ketdi" },
      "stolen": { ru: "Украденный", uz: "O'g'irlangan" },
      "victim": { ru: "Жертва", uz: "Jabrlanuvchi" },
      "outlaw": { ru: "Преступник", uz: "Jinoyatchi" },
      // Unit 11.2
      "regret": { ru: "Сожалеть", uz: "Afsuslanmoq" },
      "criticize": { ru: "Критиковать", uz: "Tanqid qilmoq" },
      "rude": { ru: "Грубый", uz: "Qo'pol" },
      "face-to-face": { ru: "Лицом к лицу", uz: "Yuzma-yuz" },
      "stand up for": { ru: "Заступаться", uz: "Himoya qilmoq" },
      "careless": { ru: "Небрежный", uz: "Beparvo" },
      "cyberbullying": { ru: "Кибербуллинг", uz: "Kiberbulling" },
      "blog": { ru: "Блог", uz: "Blog" },
      // Unit 11.3
      "fine": { ru: "Штраф / Хорошо", uz: "Jarima / Yaxshi" },
      "performance": { ru: "Выступление", uz: "Chiqish" },
      "bank": { ru: "Банк / Берег", uz: "Bank / Qirg'oq" },
      "wave": { ru: "Волна / Махать", uz: "To'lqin / Silkitmoq" },
      "jam": { ru: "Варенье / Пробка", uz: "Murabbo / Tirbandlik" },
      "rock": { ru: "Камень / Рок", uz: "Tosh / Rok" },
      "match": { ru: "Матч / Спичка", uz: "O'yin / Gugurt" },
      "light": { ru: "Свет / Легкий", uz: "Yorug'lik / Yengil" },
      "key": { ru: "Ключ", uz: "Kalit" },
      "change": { ru: "Сдача / Изменять", uz: "Qaytim / O'zgartirmoq" },
      "square": { ru: "Площадь / Квадрат", uz: "Maydon / Kvadrat" }
    };
    const key = word.split(' ')[0].toLowerCase().replace('/', '');
    const match = Object.keys(dict).find(k => word.toLowerCase().includes(k));
    return match ? dict[match] : { ru: "Перевод...", uz: "Tarjima..." };
  };

  return (
    <div className="mt-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Platform Header */}
      <div className="bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-4 md:p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">LEARNING MODULE: {data.unit}</h2>
          <p className="text-gray-500 font-bold text-xs md:text-base">{data.planning_reasoning.split('.')[0]}.</p>
        </div>
        
        {/* Large Tabs - Scrollable on mobile */}
        <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
          <div className="flex bg-gray-200 dark:bg-black p-1 rounded-xl whitespace-nowrap min-w-min">
            {[
              { id: 'vocab', icon: <BookOpen size={20} />, label: 'VOCAB' },
              { id: 'grammar', icon: <PenTool size={20} />, label: 'GRAMMAR' },
              { id: 'quiz', icon: <ClipboardCheck size={20} />, label: 'MISSIONS' },
              { id: 'plan', icon: <Clock size={20} />, label: 'PLAN' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 font-bold text-xs md:text-sm uppercase tracking-wider transition-all
                  ${activeTab === tab.id 
                    ? 'bg-white dark:bg-noir-red text-black dark:text-white shadow-lg scale-105' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                {tab.icon} <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-8 bg-gray-50 dark:bg-zinc-950 min-h-[400px] md:min-h-[600px]">
        
        {activeTab === 'plan' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {data.lesson_plan.map((stage, idx) => (
              <div key={idx} className="relative pl-4 md:pl-8 border-l-4 border-gray-200 dark:border-gray-800 hover:border-noir-red transition-colors">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-noir-red rounded-full ring-4 ring-white dark:ring-black"></div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <span className="text-noir-red font-mono font-bold text-base md:text-xl">{stage.time}</span>
                  <h5 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white uppercase">{stage.stage}</h5>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-gray-500 font-bold uppercase text-xs mb-2 tracking-wider">Procedure</p>
                    <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{stage.procedure}</p>
                    {stage.teacher_talk && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                        <p className="text-blue-800 dark:text-blue-300 font-medium italic text-sm md:text-lg">"{stage.teacher_talk}"</p>
                    </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vocab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.vocabulary.map((item, idx) => {
              const trans = getTranslations(item.word);
              return (
                <MFPCard 
                  key={idx}
                  word={item.word}
                  ipa="/.../" 
                  type="noun/verb"
                  definition={item.context} 
                  context={item.examples[0]}
                  ru={trans.ru}
                  uz={trans.uz}
                />
              );
            })}
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-12 max-w-5xl mx-auto">
            {data.grammar.map((g, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 p-4 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-noir-red text-white p-3 md:p-4 rounded-2xl flex-shrink-0">
                        <PenTool size={24} className="md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight break-words">{g.point}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="prose dark:prose-invert">
                        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{g.simple_explanation}</p>
                    </div>
                    {g.form && (
                        <div className="bg-black text-green-400 p-4 md:p-6 rounded-xl font-mono text-base md:text-xl shadow-inner break-words">
                            {g.form}
                        </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                     {g.common_errors_and_fixes && (
                       <div className="bg-red-50 dark:bg-red-900/10 p-4 md:p-6 rounded-2xl border border-red-100 dark:border-red-900">
                         <h6 className="text-red-600 dark:text-red-400 font-black uppercase text-sm mb-4">Common Errors</h6>
                         <ul className="space-y-3">
                           {g.common_errors_and_fixes.map((e, i) => (
                               <li key={i} className="text-sm md:text-lg text-red-700 dark:text-red-300 flex items-start gap-2">
                                   <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                                   <span>{e}</span>
                               </li>
                           ))}
                         </ul>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg md:text-xl font-black text-gray-400 mb-6 uppercase tracking-widest">Available Missions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.quizzes_tests.map((quiz, idx) => (
                <div key={idx} className="bg-noir-folder border-l-4 border-noir-tan p-6 rounded-lg shadow-lg hover:bg-gray-800 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-noir-tan font-mono text-xs font-bold uppercase">CLASSIFIED FILE #{idx + 1}</span>
                      <Lock size={16} className="text-gray-500" />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2 truncate">{quiz.name}</h4>
                   <p className="text-gray-400 text-sm mb-6">Duration: {quiz.timing_minutes} Minutes</p>
                   
                   <button 
                     onClick={() => onStartQuiz(quiz)}
                     className="w-full flex items-center justify-center gap-2 bg-noir-red text-white py-3 rounded font-bold uppercase text-sm tracking-wider group-hover:scale-105 transition-transform active:scale-95"
                   >
                     <Play size={16} fill="white" /> Launch Mission
                   </button>
                </div>
              ))}
            </div>
            
            {data.creative_tasks && (
              <div className="mt-12 bg-gray-100 dark:bg-zinc-900/50 p-6 md:p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 border-dashed">
                <h4 className="text-lg md:text-2xl font-black text-gray-500 mb-6 uppercase flex items-center gap-3">
                  <Users size={32} /> Field Operations (Offline)
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {data.creative_tasks.map((task, i) => (
                    <div key={i} className="bg-white dark:bg-black p-6 rounded-xl text-base md:text-xl font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-800">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};