import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { todayTasks } from '../../data/mockData';

interface TaskListProps {
  variants?: any;
}

const TaskList: React.FC<TaskListProps> = ({ variants }) => {
  const [tasks, setTasks] = useState(todayTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  return (
    <motion.div className="glass-panel chart-card" variants={variants}>
      <h3>Today's Plan</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item" onClick={() => toggleTask(task.id)}>
            <div className="task-info">
              <div className={`task-checkbox ${task.checked ? 'checked' : ''}`}>
                {task.checked && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <div>
                <div className="task-text" style={{ textDecoration: task.checked ? 'line-through' : 'none', color: task.checked ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
                  {task.text}
                </div>
                <div className="task-subtext">{task.subtext}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TaskList;
