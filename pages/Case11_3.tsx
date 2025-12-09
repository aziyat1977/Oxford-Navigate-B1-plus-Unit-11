import React from 'react';
import { CaseFile } from '../components/CaseFile';
import { PolysemyGrid } from '../components/PolysemyGrid';
import { AudioDecryptor } from '../components/AudioDecryptor';
import { ModalMatching } from '../components/ModalMatching';
import { Code, Headphones, VenetianMask, Link } from 'lucide-react';
import { LessonPlanDisplay } from '../components/LessonPlanDisplay';
import { LESSON_PLANS } from '../data/lessonPlans';

export const Case11_3: React.FC = () => {
  const lessonData = LESSON_PLANS.find(l => l.unit === "11.3");

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
       <CaseFile
         id="11.3"
         title="Decryption: Double Meanings"
         subtitle="Polysemy & Audio Surveillance"
         icon={<Code size={24} />}
       >
          <div className="space-y-12">
            
            {/* INTRO */}
            <div className="bg-gray-100 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-noir-red text-white p-3 rounded-full">
                     <Headphones size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase">Mission Objective</h3>
               </div>
               <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We have intercepted corrupted audio files and coded messages. 
                  Your task is to <span className="font-bold text-noir-red">unlock the code</span> by identifying hidden modal verbs and decoding words with double identities.
               </p>
            </div>

            {/* PART 1: AUDIO DECRYPTOR (Listening Skills) */}
            <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-8">
               <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                 <Headphones className="text-noir-tan" />
                 UNLOCK THE CODE
               </h3>
               <p className="text-gray-500 font-mono text-sm mb-6 uppercase tracking-wider">
                  Skill: Hearing Modal Verbs in Fast Speech
               </p>
               
               <AudioDecryptor />
               
               {/* NEW EXERCISE */}
               <div className="mt-8">
                 <div className="flex items-center gap-2 mb-4">
                    <Link className="text-noir-red" />
                    <h4 className="font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Target Practice: Matching</h4>
                 </div>
                 <ModalMatching />
               </div>

               <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/30 p-4 rounded-lg mt-8">
                  <h4 className="text-yellow-700 dark:text-yellow-500 font-bold uppercase text-xs mb-1">Field Note</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-400 italic">
                     "Modals like 'must', 'may', and 'could' are elusive targets. They hide in the shadows of a sentence. Use the context to flush them out."
                  </p>
               </div>
            </div>

            {/* PART 2: POLYSEMY GRID (Vocabulary) */}
            <div className="border-t-4 border-gray-200 dark:border-gray-800 pt-12">
               <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                 <VenetianMask className="text-noir-red" />
                 DOUBLE AGENTS
               </h3>
               <p className="text-gray-500 font-mono text-sm mb-8 uppercase tracking-wider">
                  Skill: Words with Multiple Meanings (Polysemy)
               </p>

               <PolysemyGrid />
            </div>

            {/* LESSON PLAN */}
            {lessonData && <LessonPlanDisplay data={lessonData} />}
          </div>
       </CaseFile>
    </div>
  );
};