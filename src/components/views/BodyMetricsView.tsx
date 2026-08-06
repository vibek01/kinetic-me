import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMetricsHistory = [
  { date: 'Aug 1', belly: 38.0, chest: 37.0, thighs: 23.0 },
  { date: 'Aug 2', belly: 37.9, chest: 37.0, thighs: 22.8 },
  { date: 'Aug 3', belly: 37.8, chest: 37.0, thighs: 22.7 },
  { date: 'Aug 4', belly: 37.6, chest: 37.0, thighs: 22.6 },
  { date: 'Aug 5', belly: 37.5, chest: 37.0, thighs: 22.5 },
  { date: 'Aug 6', belly: 37.5, chest: 37.0, thighs: 22.5 },
];

const BodyMetricsView = () => {
  const [metrics] = useState({
    belly: 37.5,
    lowerBelly: 35.0,
    chest: 37.0,
    thighs: 22.5,
    arms: 11.0
  });

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1>Body Metrics</h1>
        <p>Track your measurements and body recomposition progress.</p>
      </div>

      <div className="metrics-grid">
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Belly (Widest)</span>
            <Ruler className="metric-icon" size={32} />
          </div>
          <div className="metric-value">{metrics.belly}"</div>
          <div className="metric-subtext" style={{ color: 'var(--accent-success)' }}>↓ 0.5" this month</div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Lower Belly</span>
            <Ruler className="metric-icon" size={32} />
          </div>
          <div className="metric-value">{metrics.lowerBelly}"</div>
          <div className="metric-subtext">Pant line measurement</div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Chest</span>
            <Ruler className="metric-icon" size={32} />
          </div>
          <div className="metric-value">{metrics.chest}"</div>
          <div className="metric-subtext">Maintained</div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Thighs</span>
            <Ruler className="metric-icon" size={32} />
          </div>
          <div className="metric-value">{metrics.thighs}"</div>
          <div className="metric-subtext">Leg progress</div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Arms (Triceps)</span>
            <Ruler className="metric-icon" size={32} />
          </div>
          <div className="metric-value">{metrics.arms}"</div>
          <div className="metric-subtext">Arm progression</div>
        </div>
      </div>

      <div className="charts-grid" style={{ marginTop: '2rem' }}>
        <div className="glass-panel chart-card" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Measurements Trend (Last 7 Days)</h3>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMetricsHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBelly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="belly" name="Belly (inches)" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBelly)" />
                <Area type="monotone" dataKey="thighs" name="Thighs (inches)" stroke="var(--accent-secondary)" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BodyMetricsView;
