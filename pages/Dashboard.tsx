import React from 'react';
import { Hero } from '../components/Hero';
import { Fingerprint, FileText, Code, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const cases = [
    {
      id: '11.1',
      title: 'The Barefoot Bandit',
      subtitle: 'Outlaws & The Unreal Past',
      icon: <Fingerprint size={48} className="text-noir-red" />,
      desc: 'Investigate the crimes of Colton Harris-Moore and master the 3rd Conditional.',
    },
    {
      id: '11.2',
      title: 'System Error: Regrets',
      subtitle: 'Social Media & Criticism',
      icon: <FileText size={48} className="text-noir-tan" />,
      desc: 'Analyze digital mistakes and learn to express regrets with "should have".',
    },
    {
      id: '11.3',
      title: 'Decryption',
      subtitle: 'Polysemy & Double Meanings',
      icon: <Code size={48} className="text-gray-900 dark:text-white" />,
      desc: 'Crack the code of words with multiple meanings in different contexts.',
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-noir-bg pb-20 transition-colors duration-300">
      <Hero />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 -mt-16 md:-mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-white dark:bg-noir-paper border-2 border-gray-100 dark:border-gray-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-xl md:shadow-2xl hover:border-noir-red hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-gray-50 dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:scale-110 transition-transform">
                  {/* Icon scales with font settings but explicit sizes helper */}
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    {React.cloneElement(item.icon as React.ReactElement, { size: '100%' })}
                  </div>
                </div>
                <span className="font-mono text-xs md:text-sm font-bold text-gray-500 border-2 border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                  FILE {item.id}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2 md:mb-3 group-hover:text-noir-red transition-colors">
                {item.title}
              </h3>
              <p className="text-noir-tan font-mono text-xs md:text-sm font-bold mb-4 md:mb-6 uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6 md:mb-8 flex-grow">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-3 text-sm md:text-lg font-black font-mono text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mt-auto">
                ACCESS MODULE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12 md:mt-24 text-gray-500 font-mono text-xs md:text-sm font-bold tracking-widest px-4 pb-8">
        <p>SELECT A FILE TO BEGIN INVESTIGATION</p>
      </div>
    </div>
  );
};