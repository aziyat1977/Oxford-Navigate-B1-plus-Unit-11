import React, { useState } from 'react';
import { LessonPlanData } from '../types';
import { Clock, Users, BookOpen, PenTool, ClipboardCheck, Lock } from 'lucide-react';
import { MFPCard } from './MFPCard';
import { QuizSection } from './QuizSection';

interface LessonPlanDisplayProps {
  data: LessonPlanData;
}

type TabType = 'plan' | 'vocab' | 'grammar' | 'quiz';

export const LessonPlanDisplay: React.FC<LessonPlanDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('vocab'); // Default to vocab for learning mode
  const [isExpanded, setIsExpanded] = useState(true); // Default open for learning platform

  // Dummy translations dictionary since they aren't in the JSON
  // In a real app, these would come from the JSON data structure
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
    // Simple fuzzy match for demo
    const match = Object.keys(dict).find(k => word.toLowerCase().includes(k));
    return match ? dict[match] : { ru: "Перевод...", uz: "Tarjima..." };
  };

  return (
    <div className="mt-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Platform Header */}
      <div className="bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">LEARNING MODULE: {data.unit}</h2>
          <p className="text-gray-500 font-bold">{data.planning_reasoning.split('.')[0]}.</p>
        </div>
        
        {/* Large Tabs */}
        <div className="flex bg-gray-200 dark:bg-black p-1 rounded-xl">
          {[
            { id: 'vocab', icon: <BookOpen size={20} />, label: 'VOCAB' },
            { id: 'grammar', icon: <PenTool size={20} />, label: 'GRAMMAR' },
            { id: 'quiz', icon: <ClipboardCheck size={20} />, label: 'QUIZ' },
            { id: 'plan', icon: <Clock size={20} />, label: 'PLAN' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all
                ${activeTab === tab.id 
                  ? 'bg-white dark:bg-noir-red text-black dark:text-white shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}
              `}
            >
              {tab.icon} <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 bg-gray-50 dark:bg-zinc-950 min-h-[600px]">
        
        {activeTab === 'plan' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {data.lesson_plan.map((stage, idx) => (
              <div key={idx} className="relative pl-8 border-l-4 border-gray-200 dark:border-gray-800 hover:border-noir-red transition-colors">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-noir-red rounded-full ring-4 ring-white dark:ring-black"></div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                  <span className="text-noir-red font-mono font-bold text-xl">{stage.time}</span>
                  <h5 className="text-2xl font-black text-gray-900 dark:text-white uppercase">{stage.stage}</h5>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <p className="text-gray-500 font-bold uppercase text-xs mb-2 tracking-wider">Procedure</p>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{stage.procedure}</p>
                    {stage.teacher_talk && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                        <p className="text-blue-800 dark:text-blue-300 font-medium italic text-lg">"{stage.teacher_talk}"</p>
                    </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vocab' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.vocabulary.map((item, idx) => {
              const trans = getTranslations(item.word);
              return (
                <MFPCard 
                  key={idx}
                  word={item.word}
                  ipa="/.../" 
                  type="noun/verb"
                  definition={item.context} // Using context as simplistic def here for demo
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
              <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-noir-red text-white p-4 rounded-2xl">
                        <PenTool size={32} />
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{g.point}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="prose dark:prose-invert">
                        <p className="text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{g.simple_explanation}</p>
                    </div>
                    {g.form && (
                        <div className="bg-black text-green-400 p-6 rounded-xl font-mono text-xl shadow-inner">
                            {g.form}
                        </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                     {g.common_errors_and_fixes && (
                       <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900">
                         <h6 className="text-red-600 dark:text-red-400 font-black uppercase text-sm mb-4">Common Errors</h6>
                         <ul className="space-y-3">
                           {g.common_errors_and_fixes.map((e, i) => (
                               <li key={i} className="text-lg text-red-700 dark:text-red-300 flex items-start gap-2">
                                   <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                   {e}
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
          <div className="max-w-4xl mx-auto">
            {data.quizzes_tests.map((quiz, idx) => (
              <QuizSection key={idx} quiz={quiz} />
            ))}
            
            {data.creative_tasks && (
              <div className="mt-12 bg-noir-tan/10 p-8 rounded-3xl border-2 border-noir-tan border-dashed">
                <h4 className="text-2xl font-black text-noir-tan mb-6 uppercase flex items-center gap-3">
                  <Users size={32} /> Field Operations (Creative)
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {data.creative_tasks.map((task, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl text-xl font-medium text-gray-700 dark:text-gray-300 shadow-sm">
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