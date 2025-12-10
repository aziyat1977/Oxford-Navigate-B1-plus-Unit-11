import React from 'react';
import { CaseFile } from '../components/CaseFile';
import { FileText, Smartphone, AlertTriangle, BookOpen } from 'lucide-react';
import { LessonPlanDisplay } from '../components/LessonPlanDisplay';
import { LESSON_PLANS } from '../data/lessonPlans';
import { RegretTimeline } from '../components/RegretTimeline';
import { FillBlanks } from '../components/FillBlanks';
import { GrammarWalkthrough } from '../components/GrammarWalkthrough';
import { Quiz } from '../types';

interface Case11_2Props {
  onOpenComic?: () => void;
  onStartQuiz?: (quiz: Quiz) => void;
}

export const Case11_2: React.FC<Case11_2Props> = ({ onOpenComic, onStartQuiz = () => {} }) => {
  const lessonData = LESSON_PLANS.find(l => l.unit === "11.2");

  return (
    <div className="container mx-auto px-2 md:px-4 pt-20 md:pt-24 pb-20">
      <CaseFile 
        id="11.2" 
        title="System Error: Regrets" 
        subtitle="Incident Report: Social Media"
        icon={<FileText size={24} />}
      >
         <div className="space-y-12">
            
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-100 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
              <div className="p-6 bg-white dark:bg-black rounded-full shadow-xl">
                 <Smartphone size={48} className="text-noir-red" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase mb-2">The "Send" Button Incident</h3>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                  One in four agents <span className="text-noir-red font-bold underline decoration-wavy">regret</span> their digital communications instantly.
                </p>
                {onOpenComic && (
                  <button 
                    onClick={onOpenComic}
                    className="flex items-center gap-2 bg-noir-tan text-black px-6 py-3 rounded-lg font-bold uppercase hover:bg-yellow-600 transition-colors shadow-lg mx-auto md:mx-0 active:scale-95"
                  >
                    <BookOpen size={20} />
                    Open Visual Evidence (Comic Strip)
                  </button>
                )}
              </div>
            </div>

            {/* GRAMMAR WALKTHROUGH */}
            <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-8 md:pt-12">
               <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                 <AlertTriangle size={32} className="text-noir-tan flex-shrink-0" />
                 <span>CRITICISM PROTOCOL: Past Regrets</span>
               </h3>
               
               <GrammarWalkthrough
                  title="Should Have / Shouldn't Have"
                  meaningExamples={[
                    {
                      en: "I should have been more careful.",
                      ru: "Мне следовало быть осторожнее.",
                      uz: "Men ehtiyotkorroq bo'lishim kerak edi."
                    },
                    {
                      en: "You shouldn't have said that.",
                      ru: "Тебе не следовало этого говорить.",
                      uz: "Sen buni aytmasliging kerak edi."
                    },
                    {
                      en: "He should have asked for permission.",
                      ru: "Ему следовало спросить разрешения.",
                      uz: "U ruxsat so'rashi kerak edi."
                    }
                  ]}
                  timelineComponent={
                    <RegretTimeline 
                      action="SENT THE EMAIL" 
                      regret="Oh no! Big mistake."
                      correction="SHOULDN'T HAVE SENT IT"
                    />
                  }
                  form="should have + V3"
                  formNote="Use 'should have' to say a past action was a mistake or to give past advice."
                  pronunciations={[
                    {
                      text: "should have",
                      ipa: "ʃʊdəv",
                      note: "Sounds like 'should-of'"
                    },
                    {
                      text: "shouldn't have",
                      ipa: "ʃʊdntəv",
                      note: "The 't' is often very soft"
                    },
                    {
                      text: "You should've told me",
                      ipa: "jʊʃʊdəv",
                      note: "Connected speech"
                    }
                  ]}
               />

               <div className="mt-12">
                 <FillBlanks />
               </div>
            </div>

            {lessonData && <LessonPlanDisplay data={lessonData} onStartQuiz={onStartQuiz} />}
         </div>
      </CaseFile>
    </div>
  );
};