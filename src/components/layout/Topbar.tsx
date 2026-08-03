import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface TopbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="topbar">
      <div className="date-display" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
      
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Topbar;
