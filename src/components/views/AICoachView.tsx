import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, AlertTriangle, Lightbulb, TrendingUp, RefreshCw, CheckCircle2 } from 'lucide-react';

const AICoachView = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2500); // Mock network request
  };

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sunday AI Check-in</h1>
          <p>Generate your weekly progression report and get personalized adjustments.</p>
        </div>
        <button 
          className="primary-btn" 
          onClick={handleGenerate} 
          disabled={isGenerating || hasGenerated}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isGenerating ? 0.7 : 1 }}
        >
          {isGenerating ? <RefreshCw className="spin" size={20} /> : (hasGenerated ? <CheckCircle2 size={20} /> : <BrainCircuit size={20} />)}
          {isGenerating ? 'Analyzing Week...' : (hasGenerated ? 'Check-in Complete' : 'Run Weekly Check-in')}
        </button>
      </div>

      {!hasGenerated && !isGenerating && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          <BrainCircuit size={64} style={{ opacity: 0.2, marginBottom: '1rem', display: 'inline-block' }} />
          <h2>Ready for your Weekly Review?</h2>
          <p style={{ maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>Run the check-in to analyze your 7-day weight average, body measurements, pain logs, and workout progression.</p>
        </div>
      )}

      {isGenerating && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <RefreshCw className="spin" size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'inline-block' }} />
          <h3>Compiling your data...</h3>
          <p className="text-tertiary" style={{ marginTop: '0.5rem' }}>Sending week's logs to NVIDIA Nemotron...</p>
        </div>
      )}

      {hasGenerated && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-panel coach-hero">
            <BrainCircuit size={48} className="coach-icon gradient-text" />
            <div className="coach-message">
              <h2 className="gradient-text">Weekly Assessment</h2>
              <p>
                "You've done an excellent job sticking to your 1800 kcal target! I've noticed your side back pain has remained at a 1/10, which is fantastic. However, following the introduction of Mountain Climbers, you reported a new tingling in your Upper Outer Left Buttock (6/10). This indicates SI joint or Gluteus strain from the sudden increase in volume. I recommend reducing the reps for lower-body exercises this week and focusing on stretching."
              </p>
            </div>
          </div>

          <div className="insights-grid">
            <div className="glass-panel insight-card warning">
              <div className="insight-header">
                <AlertTriangle size={24} />
                <h3>Action Required</h3>
              </div>
              <p>Pause Mountain Climbers this week. If the buttock tingling persists, swap them for a low-impact core exercise like Dead Bugs.</p>
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
                <h3>Body Recomposition</h3>
              </div>
              <p>Your 7-day average belly measurement dropped by 0.5 inches, confirming the 1800 kcal target is working perfectly despite daily weight fluctuations.</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AICoachView;
