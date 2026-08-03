import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const WorkoutsView = () => {
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Incline Push-ups', target: '2 sets × 12 reps', actual: '', completed: false },
    { id: 2, name: 'Bodyweight Squats', target: '2 sets × 18 reps', actual: '', completed: false },
    { id: 3, name: 'Plank', target: '2 sets × 25 sec', actual: '', completed: false },
    { id: 4, name: 'Mountain Climbers', target: '2 sets × 20 reps', actual: '', completed: false },
  ]);

  const [painScore, setPainScore] = useState(1);

  const toggleComplete = (id: number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  const handleInputChange = (id: number, value: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, actual: value } : ex
    ));
  };

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1>Workouts</h1>
        <p>Week 2 Progression - Focus on form and monitoring pain.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Today's Routine</h2>
          <button className="primary-btn">Save Workout</button>
        </div>

        <div className="workout-list">
          {exercises.map((ex) => (
            <div key={ex.id} className="workout-row">
              <div className="workout-info" onClick={() => toggleComplete(ex.id)}>
                {ex.completed ? (
                  <CheckCircle2 size={24} className="workout-check text-success" />
                ) : (
                  <Circle size={24} className="workout-check text-tertiary" />
                )}
                <div>
                  <div className={`workout-name ${ex.completed ? 'completed-text' : ''}`}>{ex.name}</div>
                  <div className="workout-target">Target: {ex.target}</div>
                </div>
              </div>
              <div className="workout-input-group">
                <input 
                  type="text" 
                  className="workout-input" 
                  placeholder="e.g. 12, 10" 
                  value={ex.actual}
                  onChange={(e) => handleInputChange(ex.id, e.target.value)}
                  disabled={ex.completed}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Post-Workout Pain Check</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          How are your joints (left hip, side back) feeling after this routine? 
          <br/><em>Note: Keep pain ≤2/10. Do not push through sharp pain.</em>
        </p>
        
        <div className="pain-slider-container">
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={painScore} 
            onChange={(e) => setPainScore(parseInt(e.target.value))} 
            className="pain-slider"
          />
          <div className="pain-score-display">
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: painScore > 3 ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
              {painScore}
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>/ 10</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutsView;
