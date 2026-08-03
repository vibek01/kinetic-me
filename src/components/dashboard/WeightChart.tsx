import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { weightData } from '../../data/mockData';
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

interface WeightChartProps {
  variants?: any;
}

const WeightChart: React.FC<WeightChartProps> = ({ variants }) => {
  const [filter, setFilter] = useState('30D');

  const getFilteredData = () => {
    let days = 30;
    if (filter === '7D') days = 7;
    if (filter === '15D') days = 15;
    if (filter === '3M') days = 90;
    
    // Slice from the end since the most recent data is at the end
    return weightData.slice(-days);
  };

  return (
    <motion.div className="glass-panel chart-card" variants={variants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Weight Trend</h3>
        <TimeFilter 
          options={['7D', '15D', '30D', '3M']} 
          selected={filter} 
          onChange={setFilter} 
        />
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getFilteredData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="weight" name="Daily Weight" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
            <Area type="monotone" dataKey="average" name="7-Day Avg" stroke="var(--accent-secondary)" strokeWidth={2} strokeDasharray="5 5" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeightChart;
