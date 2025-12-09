import React from 'react';
import { CaseFile } from '../components/CaseFile';
import { FileText, Smartphone, AlertTriangle, BookOpen } from 'lucide-react';
import { LessonPlanDisplay } from '../components/LessonPlanDisplay';
import { LESSON_PLANS } from '../data/lessonPlans';
import { RegretTimeline } from '../components/RegretTimeline';
import { FillBlanks } from '../components/FillBlanks';

interface Case11_2Props {
  onOpenComic?: () => void;
}

export const Case11_2: React.FC<Case11_2Props> = ({ onOpenComic }) => {
  const lessonData = LESSON_PLANS.find(l => l.unit === "11.2");

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <CaseFile 
        id="11.2" 
        title="System Error: Regrets" 
        subtitle="Incident Report: Social Media"
        icon={<FileText size={24} />}
      >
         <div className="space-y-12">
            
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-100 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
              <div className="p-6 bg-white dark:bg-black rounded-full shadow-xl">
                 <Smartphone size={48} className="text-noir-red" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase mb-2">The "Send" Button Incident</h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  One in four agents <span className="text-noir-red font-bold underline decoration-wavy">regret</span> their digital communications instantly.
                </p>
                {onOpenComic && (
                  <button 
                    onClick={onOpenComic}
                    className="flex items-center gap-2 bg-noir-tan text-black px-6 py-3 rounded-lg font-bold uppercase hover:bg-yellow-600 transition-colors shadow-lg"
                  >
                    <BookOpen size={20} />
                    Open Visual Evidence (Comic Strip)
                  </button>
                )}
              </div>
            </div>

            {/* INTERACTIVE TIMELINE */}
            <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-8">
               <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                 <AlertTriangle size={32} className="text-noir-tan" />
                 CRITICISM PROTOCOL: VISUALIZED
               </h3>
               <p className="text-gray-600 dark:text-gray-400 mb-6">
                 When we look back at a mistake, we use <strong>should have</strong> to imagine the better past.
               </p>
               
               <RegretTimeline 
                 action="SENT THE EMAIL" 
                 regret="Oh no! Big mistake."
                 correction="SHOULDN'T HAVE SENT IT"
               />

               {/* New Exercise */}
               <FillBlanks />
            </div>

            {/* GRAMMAR BOX (Static Backup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                 <h4 className="text-red-600 dark:text-red-400 font-black uppercase mb-2">The Mistake (Reality)</h4>
                 <p className="text-xl text-gray-800 dark:text-gray-200">"I sent the email."</p>
                 <span className="text-sm font-mono text-gray-500 block mt-2">Past Simple</span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                 <h4 className="text-green-600 dark:text-green-400 font-black uppercase mb-2">The Correction (Criticism)</h4>
                 <p className="text-xl text-gray-800 dark:text-gray-200">"I <span className="underline decoration-4 decoration-green-500">shouldn't have sent</span> it."</p>
                 <span className="text-sm font-mono text-gray-500 block mt-2">Should(n't) + Have + V3</span>
              </div>
            </div>

            {lessonData && <LessonPlanDisplay data={lessonData} />}
         </div>
      </CaseFile>
    </div>
  );
};