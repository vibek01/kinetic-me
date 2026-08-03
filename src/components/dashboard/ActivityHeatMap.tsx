import React from 'react';
import { motion } from 'framer-motion';
import { heatmapData } from '../../data/mockData';

const ActivityHeatMap = () => {
  // Calculate grid layout for 90 days (roughly 13 weeks)
  // We want to show a 7x13 grid roughly
  
  // Create a mapping of intensity to color class
  const getIntensityClass = (intensity: number) => {
    switch(intensity) {
      case 1: return 'heat-level-1';
      case 2: return 'heat-level-2';
      case 3: return 'heat-level-3';
      case 4: return 'heat-level-4';
      default: return 'heat-level-0';
    }
  };

  return (
    <motion.div 
      className="glass-panel chart-card" 
      style={{ gridColumn: '1 / -1', marginTop: '1.5rem' }}
    >
      <h3>Activity Heat Map (Last 365 Days)</h3>
      <div className="heatmap-container">
        <div className="heatmap-grid">
          {heatmapData.map((day, index) => (
            <div 
              key={index} 
              className={`heat-square ${getIntensityClass(day.intensity)}`}
            >
              <div className="heat-tooltip">
                <strong>{day.date}</strong><br/>
                {day.intensity === 0 ? 'Rest Day' : `${day.reps} Reps Total`}<br/>
                <span style={{fontSize: '0.75rem'}}>{day.exercises}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          <div className="heat-square heat-level-0"></div>
          <div className="heat-square heat-level-1"></div>
          <div className="heat-square heat-level-2"></div>
          <div className="heat-square heat-level-3"></div>
          <div className="heat-square heat-level-4"></div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityHeatMap;
