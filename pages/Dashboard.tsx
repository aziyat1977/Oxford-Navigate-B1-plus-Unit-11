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
      
      <div className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cases.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-white dark:bg-noir-paper border-2 border-gray-100 dark:border-gray-800 p-10 rounded-3xl shadow-2xl hover:border-noir-red hover:-translate-y-4 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-gray-50 dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-mono text-sm font-bold text-gray-500 border-2 border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full">
                  FILE {item.id}
                </span>
              </div>
              
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-noir-red transition-colors">
                {item.title}
              </h3>
              <p className="text-noir-tan font-mono text-sm font-bold mb-6 uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-3 text-lg font-black font-mono text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                ACCESS MODULE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-24 text-gray-500 font-mono text-sm font-bold tracking-widest">
        <p>SELECT A FILE TO BEGIN INVESTIGATION</p>
      </div>
    </div>
  );
};