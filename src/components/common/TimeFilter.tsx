import React from 'react';

interface TimeFilterProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ options, selected, onChange }) => {
  return (
    <div className="time-filter-container">
      {options.map((option) => (
        <button
          key={option}
          className={`time-filter-btn ${selected === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
