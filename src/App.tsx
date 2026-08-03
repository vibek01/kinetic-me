import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Droplet, Activity, Scale } from 'lucide-react';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';

// Dashboard Components
import MetricCard from './components/dashboard/MetricCard';
import WeightChart from './components/dashboard/WeightChart';
import TaskList from './components/dashboard/TaskList';
import PainVolumeChart from './components/dashboard/PainVolumeChart';
import ActivityHeatMap from './components/dashboard/ActivityHeatMap';

// Views
import WorkoutsView from './components/views/WorkoutsView';
import NutritionView from './components/views/NutritionView';
import AICoachView from './components/views/AICoachView';

// Main application component
function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'workouts': return <WorkoutsView key="workouts" />;
      case 'nutrition': return <NutritionView key="nutrition" />;
      case 'aicoach': return <AICoachView key="aicoach" />;
      default: return (
        <motion.div 
          key="dashboard"
          className="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="dashboard-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1>Good Morning!</h1>
            <p>You're on a 14-day streak. Keep it up!</p>
          </motion.div>

          {/* METRICS GRID */}
          <motion.div 
            className="metrics-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MetricCard 
              title="Current Weight" 
              value="63.2 kg" 
              subtext="↓ 0.8kg from last month" 
              icon={<Scale size={32} />} 
              subtextColor="var(--accent-success)"
              variants={itemVariants}
            />
            <MetricCard 
              title="Calories Today" 
              value="450 / 1800" 
              subtext="1350 kcal remaining" 
              icon={<Flame size={32} />} 
              variants={itemVariants}
            />
            <MetricCard 
              title="Pain Level" 
              value="1 / 10" 
              subtext="Minimal joint pain today" 
              icon={<Activity size={32} />} 
              iconColor="var(--accent-success)"
              variants={itemVariants}
            />
            <MetricCard 
              title="Water" 
              value="1.2 / 3.0 L" 
              subtext="On track" 
              icon={<Droplet size={32} />} 
              variants={itemVariants}
            />
          </motion.div>

          {/* CHARTS GRID */}
          <motion.div 
            className="charts-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <WeightChart variants={itemVariants} />
            <TaskList variants={itemVariants} />
            <ActivityHeatMap />
            <PainVolumeChart variants={itemVariants} />
          </motion.div>
        </motion.div>
      );
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <Topbar isDark={isDark} toggleTheme={toggleTheme} />
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
