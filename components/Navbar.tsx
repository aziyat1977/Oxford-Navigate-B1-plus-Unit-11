import React, { useState } from 'react';
import { Menu, X, Home, FolderOpen, Sun, Moon } from 'lucide-react';
import { playSFX } from '../utils/audio';

interface NavbarProps {
  activePage: string;
  setPage: (page: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setPage, isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: <Home size={24} /> },
    { id: '11.1', label: 'UNIT 11.1', icon: <FolderOpen size={24} /> },
    { id: '11.2', label: 'UNIT 11.2', icon: <FolderOpen size={24} /> },
    { id: '11.3', label: 'UNIT 11.3', icon: <FolderOpen size={24} /> },
  ];

  const handleNav = (id: string) => {
    playSFX('click');
    setPage(id);
    setIsOpen(false);
  };

  const handleTheme = () => {
    playSFX('click');
    toggleTheme();
  };

  return (
    <>
      {/* Top Left Trigger */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 flex items-center gap-4">
        <button 
          onClick={() => { playSFX('click'); setIsOpen(true); }}
          className="bg-noir-red text-white p-3 md:p-3 rounded-lg shadow-lg hover:scale-110 transition-transform active:scale-95"
          aria-label="Open Menu"
        >
          <Menu size={24} className="md:w-8 md:h-8" />
        </button>
        
        {/* Theme Toggle - Visible on desktop always */}
        <button 
          onClick={handleTheme}
          className="hidden md:flex bg-white dark:bg-black text-black dark:text-white p-3 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-white dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 p-6 md:p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">NAVIGATE</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-noir-red p-2">
              <X size={28} />
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center gap-4 p-4 text-lg md:text-xl font-bold rounded-xl transition-all active:scale-95
                  ${activePage === item.id 
                    ? 'bg-noir-red text-white shadow-lg scale-105' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="absolute bottom-8 left-6 right-6 md:left-8 md:right-8">
             <button 
              onClick={() => { handleTheme(); setIsOpen(false); }}
              className="w-full flex justify-center items-center gap-2 p-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl text-lg font-bold text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
              <span>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};