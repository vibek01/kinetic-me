import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

const AICoachView = () => {
  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1>AI Coach Insights</h1>
        <p>Personalized analysis based on your recent activity.</p>
      </div>

      <div className="glass-panel coach-hero">
        <BrainCircuit size={48} className="coach-icon gradient-text" />
        <div className="coach-message">
          <h2 className="gradient-text">Weekly Summary</h2>
          <p>
            "You've done an excellent job sticking to your 1800 kcal target this week! I've noticed your side back pain has remained at a 1/10, which is fantastic. However, following the introduction of Mountain Climbers, you reported a slight tingling in your left hip (3/10). I recommend reducing the reps for lower-body exercises this week and focusing on stretching."
          </p>
        </div>
      </div>

      <div className="insights-grid">
        <div className="glass-panel insight-card warning">
          <div className="insight-header">
            <AlertTriangle size={24} />
            <h3>Action Required</h3>
          </div>
          <p>Reduce Mountain Climbers to 1 set of 15 reps. If the hip tingling persists, swap them for a low-impact core exercise like Bird Dogs.</p>
        </div>

        <div className="glass-panel insight-card success">
          <div className="insight-header">
            <TrendingUp size={24} />
            <h3>Progression</h3>
          </div>
          <p>You successfully completed 2x15 proper push-ups with zero pain. I've updated your target to 2x18 for next week.</p>
        </div>

        <div className="glass-panel insight-card tip">
          <div className="insight-header">
            <Lightbulb size={24} />
            <h3>Diet Tip</h3>
          </div>
          <p>You are consistently hitting 85g of protein, but your target is 120g. Try adding 50g of soy chunks to your lunch to close the gap.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AICoachView;
