import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { painData } from '../../data/mockData';
import TimeFilter from '../common/TimeFilter';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="desc" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface PainVolumeChartProps {
  variants?: any;
}

const PainVolumeChart: React.FC<PainVolumeChartProps> = ({ variants }) => {
  const [filter, setFilter] = useState('7D');

  const getFilteredData = () => {
    let days = 7;
    if (filter === '15D') days = 15;
    if (filter === '30D') days = 30;
    if (filter === '3M') days = 90;
    
    return painData.slice(-days);
  };

  return (
    <motion.div className="glass-panel chart-card" style={{ gridColumn: '1 / -1' }} variants={variants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>Workout Volume vs Pain Score</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
            Monitoring for exercise-induced flare-ups
          </span>
        </div>
        <TimeFilter 
          options={['7D', '15D', '30D', '3M']} 
          selected={filter} 
          onChange={setFilter} 
        />
      </div>
      
      <div className="chart-container" style={{ minHeight: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={getFilteredData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 10]} stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="reps" name="Total Reps" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} opacity={0.8} barSize={filter === '3M' ? 4 : 30} />
            <Line yAxisId="right" type="monotone" dataKey="pain" name="Pain Score" stroke="var(--accent-danger)" strokeWidth={3} dot={filter === '3M' ? false : { r: 4, fill: 'var(--accent-danger)' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PainVolumeChart;
