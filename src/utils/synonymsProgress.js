// utils/synonymsProgress.js
export const saveProgress = (score, total) => {
    const progress = {
        date: new Date().toISOString(),
        score,
        total,
        percentage: Math.round((score / total) * 100)
    };

    const existing = JSON.parse(localStorage.getItem('synonymsProgress') || '[]');
    existing.push(progress);

    // Keep only last 10 sessions
    const recent = existing.slice(-10);
    localStorage.setItem('synonymsProgress', JSON.stringify(recent));

    return progress;
};

export const getProgressHistory = () => {
    return JSON.parse(localStorage.getItem('synonymsProgress') || '[]');
};

export const getAverageScore = () => {
    const history = getProgressHistory();
    if (history.length === 0) return 0;

    const total = history.reduce((sum, session) => sum + session.percentage, 0);
    return Math.round(total / history.length);
};