import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconColor?: string;
  subtextColor?: string;
  variants?: any;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtext, 
  icon, 
  iconColor = 'var(--accent-primary)', 
  subtextColor = 'var(--text-tertiary)',
  variants 
}) => {
  return (
    <motion.div className="glass-panel metric-card" variants={variants}>
      <div className="metric-header">
        <span>{title}</span>
        <div className="metric-icon" style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-subtext" style={{ color: subtextColor }}>{subtext}</div>
    </motion.div>
  );
};

export default MetricCard;
