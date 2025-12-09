import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Case11_1 } from './pages/Case11_1';
import { Case11_2 } from './pages/Case11_2';
import { Case11_3 } from './pages/Case11_3';
import { Storybook11_2 } from './pages/Storybook11_2';
import { DetectiveChat } from './components/DetectiveChat';
import { QuizRunner } from './components/QuizRunner';
import { Quiz } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Reset scroll when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-noir-red selection:text-white bg-gray-100 dark:bg-noir-bg text-gray-900 dark:text-noir-text transition-colors duration-300">
      
      {activeQuiz && (
        <QuizRunner 
          quiz={activeQuiz} 
          onExit={() => setActiveQuiz(null)} 
        />
      )}

      {page !== '11.2-comic' && !activeQuiz && (
        <Navbar 
          activePage={page} 
          setPage={setPage} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      )}

      {!activeQuiz && (
        <main>
          {page === 'home' && <Dashboard onNavigate={setPage} />}
          {page === '11.1' && <Case11_1 onStartQuiz={handleStartQuiz} />}
          {page === '11.2' && <Case11_2 onOpenComic={() => setPage('11.2-comic')} onStartQuiz={handleStartQuiz} />}
          {page === '11.3' && <Case11_3 onStartQuiz={handleStartQuiz} />}
          {page === '11.2-comic' && <Storybook11_2 onBack={() => setPage('11.2')} />}
        </main>
      )}

      {page !== '11.2-comic' && !activeQuiz && <DetectiveChat />}
    </div>
  );
};

export default App;