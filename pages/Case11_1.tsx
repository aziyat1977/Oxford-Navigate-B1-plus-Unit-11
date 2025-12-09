import React from 'react';
import { CaseFile } from '../components/CaseFile';
import { RedactedText } from '../components/RedactedText';
import { GrammarTerminal } from '../components/GrammarTerminal';
import { Timeline } from '../components/Timeline';
import { Fingerprint, AlertTriangle } from 'lucide-react';
import { LessonPlanDisplay } from '../components/LessonPlanDisplay';
import { LESSON_PLANS } from '../data/lessonPlans';

export const Case11_1: React.FC = () => {
  const lessonData = LESSON_PLANS.find(l => l.unit === "11.1");

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <CaseFile 
        id="11.1" 
        title="The Barefoot Bandit" 
        subtitle="Subject: Colton Harris-Moore"
        icon={<Fingerprint size={24} />}
      >
        <div className="space-y-12">
          
          {/* PROFILE SECTION */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
             <div className="w-full lg:w-1/3">
                <div className="relative group">
                    <img 
                      src="https://picsum.photos/400/500?grayscale" 
                      alt="Suspect Profile" 
                      className="w-full h-auto rounded-xl border-4 border-white dark:border-gray-800 shadow-2xl transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-noir-red text-white px-4 py-2 font-black uppercase text-xl">WANTED</div>
                </div>
                <p className="text-center font-mono text-sm text-gray-500 mt-4 font-bold">FIG 1. SUSPECT SKETCH</p>
             </div>
             
             <div className="w-full lg:w-2/3 font-mono text-xl md:text-2xl leading-loose text-gray-800 dark:text-gray-300">
                <p className="mb-6">
                  Suspect Colton Harris-Moore committed over 100 <RedactedText text="burglaries" hint="Crimes involving illegal entry" />. 
                  He managed to <RedactedText text="escape" hint="Get away" /> authorities by stealing planes, despite having no formal flight training.
                </p>
                
                <div className="p-8 bg-gray-100 dark:bg-black rounded-2xl border-2 border-gray-200 dark:border-gray-800">
                    <h4 className="text-noir-tan text-lg font-black uppercase mb-4 tracking-widest">Evidence Log:</h4>
                    <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-400 space-y-2">
                       <li>Stolen Aircraft: <span className="text-gray-900 dark:text-white font-bold">Cessna 400</span></li>
                       <li>Modus Operandi: <span className="text-gray-900 dark:text-white font-bold">Barefoot entry</span></li>
                       <li>Status: <span className="text-noir-red font-bold">Sentenced to 7 years</span></li>
                    </ul>
                </div>
             </div>
          </div>

          {/* GRAMMAR ANIMATION SECTION */}
          <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-12">
            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-4">
              <AlertTriangle className="text-noir-red" size={40} />
              GRAMMAR FORENSICS: Unreal Past
            </h3>
            
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              We assume the suspect crashed. But if he <span className="font-bold text-noir-red">hadn't</span>?
            </p>

            {/* NEW ANIMATED TIMELINE */}
            <Timeline 
              realEvent="Crashed Plane" 
              unrealEvent="hadn't crashed" 
              result="wouldn't have been caught" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-100 dark:bg-zinc-900 p-8 rounded-2xl opacity-70">
                <h4 className="text-sm font-black uppercase text-gray-500 mb-4 tracking-widest">The Reality</h4>
                <p className="text-2xl font-medium text-gray-800 dark:text-gray-300">He crashed the plane.</p>
                <p className="text-2xl font-medium text-gray-800 dark:text-gray-300">He was arrested.</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl border-l-8 border-noir-red shadow-xl">
                <h4 className="text-sm font-black uppercase text-noir-red mb-4 tracking-widest">The Unreal (3rd Conditional)</h4>
                <p className="text-3xl leading-relaxed text-gray-900 dark:text-white">
                  If he <strong className="text-noir-red decoration-2 underline">hadn't crashed</strong> the plane, he <strong className="text-noir-tan decoration-2 underline">wouldn't have been</strong> arrested.
                </p>
              </div>
            </div>

            <GrammarTerminal />
          </div>

          {/* LEARNING MODULE */}
          {lessonData && <LessonPlanDisplay data={lessonData} />}
        </div>
      </CaseFile>
    </div>
  );
};