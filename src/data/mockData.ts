// Generate 365 days of dummy data
const generateMockData = () => {
  const weight = [];
  const pain = [];
  const heatmap = [];
  
  let currentWeight = 66.0;
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 365);

  for (let i = 0; i < 365; i++) {
    const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const fullDateStr = currentDate.toISOString().split('T')[0];
    
    // Weight slowly decreases with some random fluctuation
    currentWeight -= (Math.random() * 0.1);
    currentWeight += (Math.random() * 0.05);
    
    weight.push({
      day: dateStr,
      weight: parseFloat(currentWeight.toFixed(1)),
      average: parseFloat((currentWeight + (Math.random() * 0.2 - 0.1)).toFixed(1))
    });

    // Workout intensity logic
    const isRestDay = Math.random() < 0.25; // 25% chance of rest day randomly distributed
    const reps = isRestDay ? 0 : Math.floor(Math.random() * 50) + 30; // 30-80 reps
    const painScore = isRestDay ? 0 : (reps > 60 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2)); // Pain 0-3

    pain.push({
      day: dateStr,
      reps: reps,
      pain: painScore
    });

    // Heatmap data
    let intensity = 0;
    if (reps > 0 && reps < 40) intensity = 1;
    else if (reps >= 40 && reps < 60) intensity = 2;
    else if (reps >= 60 && reps < 75) intensity = 3;
    else if (reps >= 75) intensity = 4;

    heatmap.push({
      date: fullDateStr,
      intensity: intensity,
      reps: reps,
      exercises: isRestDay ? 'Rest' : 'Squats, Push-ups, Plank'
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { weight, pain, heatmap };
};

const generatedData = generateMockData();

export const weightData = generatedData.weight;
export const painData = generatedData.pain;
export const heatmapData = generatedData.heatmap;

export const todayTasks = [
  { id: 1, text: 'Morning Walk', subtext: '15 mins', checked: true },
  { id: 2, text: 'Bodyweight Squats', subtext: '2 x 15 reps', checked: true },
  { id: 3, text: 'Incline Push-ups', subtext: '2 x 12 reps', checked: false },
  { id: 4, text: 'Plank', subtext: '2 x 20 sec', checked: false },
];
