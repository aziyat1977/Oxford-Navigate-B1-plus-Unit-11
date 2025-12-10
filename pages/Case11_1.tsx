import React from 'react';
import { CaseFile } from '../components/CaseFile';
import { RedactedText } from '../components/RedactedText';
import { GrammarTerminal } from '../components/GrammarTerminal';
import { Timeline } from '../components/Timeline';
import { DragDropSentence } from '../components/DragDropSentence';
import { Fingerprint, AlertTriangle } from 'lucide-react';
import { LessonPlanDisplay } from '../components/LessonPlanDisplay';
import { LESSON_PLANS } from '../data/lessonPlans';
import { GrammarWalkthrough } from '../components/GrammarWalkthrough';
import { Quiz } from '../types';

interface CaseProps {
  onStartQuiz?: (quiz: Quiz) => void;
}

export const Case11_1: React.FC<CaseProps> = ({ onStartQuiz = () => {} }) => {
  const lessonData = LESSON_PLANS.find(l => l.unit === "11.1");

  return (
    <div className="container mx-auto px-2 md:px-4 pt-20 md:pt-24 pb-20">
      <CaseFile 
        id="11.1" 
        title="The Barefoot Bandit" 
        subtitle="Subject: Colton Harris-Moore"
        icon={<Fingerprint size={24} />}
      >
        <div className="space-y-12">
          
          {/* PROFILE SECTION */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
             <div className="w-full lg:w-1/3">
                <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                    <img 
                      src="https://picsum.photos/400/500?grayscale" 
                      alt="Suspect Profile" 
                      className="w-full h-auto rounded-xl border-4 border-white dark:border-gray-800 shadow-2xl transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-noir-red text-white px-4 py-2 font-black uppercase text-lg md:text-xl">WANTED</div>
                </div>
                <p className="text-center font-mono text-sm text-gray-500 mt-4 font-bold">FIG 1. SUSPECT SKETCH</p>
             </div>
             
             <div className="w-full lg:w-2/3 font-mono text-base md:text-xl lg:text-2xl leading-loose text-gray-800 dark:text-gray-300">
                <p className="mb-6">
                  Suspect Colton Harris-Moore committed over 100 <RedactedText text="burglaries" hint="Crimes involving illegal entry" />. 
                  He managed to <RedactedText text="escape" hint="Get away" /> authorities by stealing planes, despite having no formal flight training.
                </p>
                
                <div className="p-4 md:p-8 bg-gray-100 dark:bg-black rounded-2xl border-2 border-gray-200 dark:border-gray-800">
                    <h4 className="text-noir-tan text-base md:text-lg font-black uppercase mb-4 tracking-widest">Evidence Log:</h4>
                    <ul className="list-disc list-inside text-base md:text-lg text-gray-600 dark:text-gray-400 space-y-2">
                       <li>Stolen Aircraft: <span className="text-gray-900 dark:text-white font-bold">Cessna 400</span></li>
                       <li>Modus Operandi: <span className="text-gray-900 dark:text-white font-bold">Barefoot entry</span></li>
                       <li>Status: <span className="text-noir-red font-bold">Sentenced to 7 years</span></li>
                    </ul>
                </div>
             </div>
          </div>

          {/* GRAMMAR WALKTHROUGH */}
          <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-8 md:pt-12">
            <h3 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <AlertTriangle className="text-noir-red flex-shrink-0" size={32} />
              <span>GRAMMAR FORENSICS: Unreal Past</span>
            </h3>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
              We assume the suspect crashed. But if he <span className="font-bold text-noir-red">hadn't</span>?
            </p>

            <GrammarWalkthrough
              title="The Unreal Past Conditional (3rd)"
              meaningExamples={[
                {
                  en: "If I had known, I would have come.",
                  ru: "Если бы я знал, я бы пришел.",
                  uz: "Agar bilganimda, kelgan bo'lardim."
                },
                {
                  en: "If he hadn't crashed, he would have escaped.",
                  ru: "Если бы он не разбился, он бы сбежал.",
                  uz: "Agar u qulab tushmaganda, qochib ketgan bo'lardi."
                },
                {
                  en: "If they had arrived earlier, they could have caught him.",
                  ru: "Если бы они прибыли раньше, они могли бы поймать его.",
                  uz: "Agar ular ertaroq kelganida, uni tutishlari mumkin edi."
                }
              ]}
              timelineComponent={
                <Timeline 
                  realEvent="Crashed Plane" 
                  unrealEvent="hadn't crashed" 
                  result="wouldn't have been caught" 
                />
              }
              form="If + had + V3 ..., would have + V3"
              formNote="Use 'had' for the condition (past perfect). Use 'would have' for the imagined result."
              pronunciations={[
                {
                  text: "would have",
                  ipa: "wʊdəv",
                  note: "Weak form: Sounds like 'wood-of'"
                },
                {
                  text: "wouldn't have",
                  ipa: "wʊdntəv",
                  note: "Negative contraction"
                },
                {
                  text: "If I'd known",
                  ipa: "aɪd",
                  note: "'d = had"
                }
              ]}
            />
            
            <div className="mt-12">
               <DragDropSentence />
            </div>

            <div className="mt-12">
               <GrammarTerminal />
            </div>
          </div>

          {/* LEARNING MODULE */}
          {lessonData && <LessonPlanDisplay data={lessonData} onStartQuiz={onStartQuiz} />}
        </div>
      </CaseFile>
    </div>
  );
};