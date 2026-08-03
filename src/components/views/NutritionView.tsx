import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, BrainCircuit } from 'lucide-react';

const NutritionView = () => {
  const [macros, setMacros] = useState([
    { name: 'Calories', target: 1800, current: 1250, unit: 'kcal', color: 'var(--accent-primary)' },
    { name: 'Protein', target: 120, current: 85, unit: 'g', color: 'var(--accent-success)' },
    { name: 'Carbs', target: 200, current: 150, unit: 'g', color: 'var(--accent-warning)' },
    { name: 'Fats', target: 60, current: 40, unit: 'g', color: 'var(--accent-danger)' },
  ]);

  const [meals, setMeals] = useState([
    { time: '6:15 AM', name: 'Pre-workout', items: '1 medium banana', cals: 105 },
    { time: '7:30 AM', name: 'Breakfast', items: '250ml milk, 3 boiled eggs, 2 rotis', cals: 480 },
    { time: '10:30 AM', name: 'Mid-morning', items: '1 apple', cals: 95 },
    { time: '2:00 PM', name: 'Lunch', items: '200g rice, 150g dal, 120g chicken', cals: 650 },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleLogMeal = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const payload = {
        model: "nvidia/nemotron-3-ultra-550b-a55b",
        messages: [{
          role: "user",
          content: `You are a highly accurate nutritional API. Calculate the macros for this Indian diet input: '${inputText}'. Return ONLY a valid JSON object with the keys: calories (number), protein (number), carbs (number), fats (number). Do not include any other text or markdown formatting.`
        }],
        temperature: 0.1,
        top_p: 0.95,
        max_tokens: 16384,
      };

      const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY || 'YOUR_NVIDIA_API_KEY'}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (data.choices && data.choices[0]) {
        let jsonStr = data.choices[0].message.content.trim();
        // Strip out any markdown code blocks the AI might return
        jsonStr = jsonStr.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonStr);
        
        // Update macros
        setMacros(prev => prev.map(m => {
          if (m.name === 'Calories') return { ...m, current: m.current + parsed.calories };
          if (m.name === 'Protein') return { ...m, current: m.current + parsed.protein };
          if (m.name === 'Carbs') return { ...m, current: m.current + parsed.carbs };
          if (m.name === 'Fats') return { ...m, current: m.current + parsed.fats };
          return m;
        }));

        // Add to timeline
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setMeals(prev => [...prev, {
          time: timeStr,
          name: 'Smart Logged Meal',
          items: inputText,
          cals: parsed.calories
        }]);

        setInputText('');
        setShowInput(false);
      }
    } catch (err) {
      console.error("Failed to parse meal:", err);
      alert("AI failed to parse the meal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <h1>Nutrition</h1>
        <p>Track your macros to support fat loss and muscle retention.</p>
      </div>

      <div className="macro-grid">
        {macros.map((macro, idx) => {
          const percentage = Math.min((macro.current / macro.target) * 100, 100);
          return (
            <div key={idx} className="glass-panel macro-card">
              <div className="macro-info">
                <h3>{macro.name}</h3>
                <div className="macro-stats">
                  <span className="current">{macro.current}</span>
                  <span className="target">/ {macro.target} {macro.unit}</span>
                </div>
              </div>
              <div className="progress-track">
                <motion.div 
                  className="progress-fill" 
                  style={{ backgroundColor: macro.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Today's Log</h2>
          <button 
            className="primary-btn outline" 
            onClick={() => setShowInput(!showInput)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <BrainCircuit size={18} />
            {showInput ? 'Close AI Logger' : 'Smart Add Meal'}
          </button>
        </div>

        <AnimatePresence>
          {showInput && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: '1.5rem' }}
            >
              <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g. 150g paneer tikka, 20g almonds, 1 scoop whey"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogMeal()}
                  disabled={loading}
                />
                <button 
                  className="primary-btn" 
                  onClick={handleLogMeal}
                  disabled={loading || !inputText.trim()}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: (loading || !inputText.trim()) ? 0.7 : 1 }}
                >
                  {loading ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
                  {loading ? 'Analyzing...' : 'Log'}
                </button>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <BrainCircuit size={14} /> Powered by NVIDIA Nemotron-3-Ultra
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="meal-timeline">
          {meals.map((meal, idx) => (
            <div key={idx} className="meal-item">
              <div className="meal-time">{meal.time}</div>
              <div className="meal-content">
                <div className="meal-header">
                  <span className="meal-name">{meal.name}</span>
                  <span className="meal-cals">{meal.cals} kcal</span>
                </div>
                <div className="meal-desc">{meal.items}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionView;
