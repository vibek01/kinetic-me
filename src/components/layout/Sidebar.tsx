import React from 'react';
import { Activity, LayoutDashboard, Dumbbell, Utensils, BrainCircuit, Ruler } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity className="gradient-text" size={28} />
        <span className="gradient-text">KineticMe</span>
      </div>
      
      <nav>
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'workouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('workouts')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <Dumbbell size={20} />
          <span>Workouts</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <Utensils size={20} />
          <span>Nutrition</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <Ruler size={20} />
          <span>Body Metrics</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'pain' ? 'active' : ''}`}
          onClick={() => setActiveTab('pain')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <Activity size={20} />
          <span>Pain Tracker</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'aicoach' ? 'active' : ''}`}
          onClick={() => setActiveTab('aicoach')}
          style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit' }}
        >
          <BrainCircuit size={20} />
          <span>AI Coach</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
