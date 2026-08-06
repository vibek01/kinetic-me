import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockPainHistory = [
  { date: 'Aug 1', 'Side Back': 5, 'Left Hip': 3, 'Outer Buttock': 0, 'Workout Volume': 40 },
  { date: 'Aug 2', 'Side Back': 4, 'Left Hip': 2, 'Outer Buttock': 0, 'Workout Volume': 60 },
  { date: 'Aug 3', 'Side Back': 4, 'Left Hip': 1, 'Outer Buttock': 2, 'Workout Volume': 90 },
  { date: 'Aug 4', 'Side Back': 3, 'Left Hip': 1, 'Outer Buttock': 4, 'Workout Volume': 110 },
  { date: 'Aug 5', 'Side Back': 2, 'Left Hip': 0, 'Outer Buttock': 5, 'Workout Volume': 120 },
  { date: 'Aug 6', 'Side Back': 2, 'Left Hip': 0, 'Outer Buttock': 6, 'Workout Volume': 130 },
];

const PainTrackerView = () => {
  const [pains, setPains] = useState({
    sideBack: 2,
    leftHip: 0,
    outerButtock: 6
  });

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1>Recovery & Pain Tracker</h1>
        <p>Monitor your musculoskeletal health and correlate it with your workout volume.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity className="text-tertiary" size={24} />
          Today's Pain Log
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Side Back Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Side Back Muscle</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{pains.sideBack} / 10</span>
            </div>
            <div className="pain-slider-container">
              <input 
                type="range" min="0" max="10" 
                className="pain-slider"
                value={pains.sideBack}
                onChange={(e) => setPains({...pains, sideBack: parseInt(e.target.value)})}
                style={{ background: `linear-gradient(to right, var(--accent-success) 0%, var(--accent-warning) 50%, var(--accent-danger) 100%)` }}
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Bites sharply when breathing while sleeping.</p>
          </div>

          {/* Left Hip Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Left Hip Joint</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{pains.leftHip} / 10</span>
            </div>
            <div className="pain-slider-container">
              <input 
                type="range" min="0" max="10" 
                className="pain-slider"
                value={pains.leftHip}
                onChange={(e) => setPains({...pains, leftHip: parseInt(e.target.value)})}
                style={{ background: `linear-gradient(to right, var(--accent-success) 0%, var(--accent-warning) 50%, var(--accent-danger) 100%)` }}
              />
            </div>
          </div>

          {/* Upper Outer Buttock Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500, color: pains.outerButtock > 4 ? 'var(--accent-danger)' : 'inherit' }}>Upper Outer Left Buttock (New)</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{pains.outerButtock} / 10</span>
            </div>
            <div className="pain-slider-container">
              <input 
                type="range" min="0" max="10" 
                className="pain-slider"
                value={pains.outerButtock}
                onChange={(e) => setPains({...pains, outerButtock: parseInt(e.target.value)})}
                style={{ background: `linear-gradient(to right, var(--accent-success) 0%, var(--accent-warning) 50%, var(--accent-danger) 100%)` }}
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={14} color="var(--accent-danger)" /> 
              Triggered by prolonged sitting and sudden increase in squats/push-ups.
            </p>
          </div>
        </div>
        
        <button className="primary-btn" style={{ marginTop: '2rem', width: '100%' }}>
          Save Today's Log
        </button>
      </div>

      <div className="glass-panel chart-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Pain vs. Workout Volume Correlation</h3>
        </div>
        <div className="chart-container" style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPainHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              
              {/* Primary Y Axis for Pain (0-10) */}
              <YAxis yAxisId="left" domain={[0, 10]} stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              
              {/* Secondary Y Axis for Workout Volume */}
              <YAxis yAxisId="right" orientation="right" stroke="var(--accent-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              
              <Line yAxisId="left" type="monotone" dataKey="Side Back" stroke="var(--accent-primary)" strokeWidth={3} dot={{r:4}} />
              <Line yAxisId="left" type="monotone" dataKey="Outer Buttock" stroke="var(--accent-danger)" strokeWidth={3} dot={{r:4}} />
              
              {/* Plotting Workout volume to show correlation */}
              <Line yAxisId="right" type="monotone" dataKey="Workout Volume" stroke="var(--accent-secondary)" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default PainTrackerView;
