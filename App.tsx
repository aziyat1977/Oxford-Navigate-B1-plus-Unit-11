import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { CaseFile } from './components/CaseFile';
import { RedactedText } from './components/RedactedText';
import { GrammarTerminal } from './components/GrammarTerminal';
import { PolysemyGrid } from './components/PolysemyGrid';
import { DetectiveChat } from './components/DetectiveChat';
import { FileText, AlertTriangle, Code, Fingerprint } from 'lucide-react';

const App: React.FC = () => {
  // Simple scroll progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-noir-red selection:text-white pb-20">
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-noir-red z-50 transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }} />

      <Hero />

      <main className="container mx-auto px-4 relative z-10">
        
        {/* Case 1: The Bandit */}
        <section id="outlaws">
          <CaseFile 
            id="11.1" 
            title="The Barefoot Bandit" 
            subtitle="Subject: Colton Harris-Moore"
            icon={<Fingerprint size={16} />}
          >
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                 <div className="w-full md:w-1/3">
                    <img 
                      src="https://picsum.photos/400/500?grayscale" 
                      alt="Suspect Profile" 
                      className="w-full h-auto border-2 border-white opacity-80"
                    />
                    <p className="text-center font-mono text-xs text-gray-500 mt-2">FIG 1. SUSPECT SKETCH</p>
                 </div>
                 <div className="w-full md:w-2/3 font-mono text-lg leading-loose text-gray-300">
                    <p>
                      Suspect Colton Harris-Moore committed over 100 <RedactedText text="burglaries" hint="Crimes involving illegal entry" />. 
                      He managed to <RedactedText text="escape" hint="Get away" /> authorities by stealing planes, despite having no formal flight training.
                      He was finally <RedactedText text="captured" hint="Arrested" /> in the Bahamas after a high-speed boat chase.
                    </p>
                    <div className="mt-4 p-4 bg-black border border-gray-700">
                        <h4 className="text-noir-tan text-sm uppercase mb-2">Evidence Log:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-400">
                           <li>Stolen Aircraft: Cessna 400</li>
                           <li>Modus Operandi: Barefoot entry</li>
                           <li>Status: Sentenced to 7 years</li>
                        </ul>
                    </div>
                 </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-noir-red" size={20} />
                  GRAMMAR FORENSICS: Unreal Past
                </h3>
                <p className="mb-4 text-gray-400">Analyze the hypothetical timeline vs. reality.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 p-4 border border-zinc-700 opacity-50">
                    <h4 className="text-xs uppercase text-gray-500 mb-2">The Reality</h4>
                    <p>He crashed the plane.</p>
                    <p>He was arrested.</p>
                  </div>
                  <div className="bg-zinc-800 p-4 border-l-2 border-noir-red">
                    <h4 className="text-xs uppercase text-noir-red mb-2">The Unreal (3rd Conditional)</h4>
                    <p>If he <strong className="text-white">hadn't crashed</strong> the plane, he <strong className="text-white">wouldn't have been</strong> arrested.</p>
                  </div>
                </div>

                <GrammarTerminal />
              </div>
            </div>
          </CaseFile>
        </section>

        {/* Case 2: Regrets */}
        <section id="regrets">
          <CaseFile 
            id="11.2" 
            title="System Error: Regrets" 
            subtitle="Incident Report: Social Media"
            icon={<FileText size={16} />}
          >
             <div className="space-y-6">
                <p className="text-xl text-white">One in four agents <span className="text-noir-red line-through decoration-2">regret</span> their digital communications.</p>
                
                <div className="bg-black p-6 rounded relative overflow-hidden group">
                   <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                   <h3 className="font-mono text-noir-red text-lg mb-4">CRITICISM PROTOCOL</h3>
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-gray-400">
                         <span className="w-24 text-xs font-mono uppercase">Mistake:</span>
                         <span className="text-white">"I sent the email."</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                         <span className="w-24 text-xs font-mono uppercase">Correction:</span>
                         <span className="text-noir-tan">"I <span className="underline decoration-wavy decoration-red-500">shouldn't have sent</span> the email."</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                         <span className="w-24 text-xs font-mono uppercase">Pronunciation:</span>
                         <span className="font-mono italic">/ʃʊdəv/ (Should've)</span>
                      </div>
                   </div>
                </div>
             </div>
          </CaseFile>
        </section>

        {/* Case 3: Polysemy */}
        <section id="polysemy">
           <CaseFile
             id="11.3"
             title="Decryption: Double Meanings"
             subtitle="Polysemy Analysis"
             icon={<Code size={16} />}
           >
              <p className="text-gray-400 mb-4">Investigator Note: Some clues point to two different meanings. Identify the single code word that fits both contexts.</p>
              <PolysemyGrid />
           </CaseFile>
        </section>

      </main>

      <footer className="text-center py-12 text-gray-600 font-mono text-xs">
         <p>OXFORD NAVIGATE UNIT 11 // CLASSIFIED MATERIAL</p>
         <p className="mt-2">CONFIDENTIALITY AGREEMENT IN EFFECT</p>
      </footer>

      <DetectiveChat />
    </div>
  );
};

export default App;