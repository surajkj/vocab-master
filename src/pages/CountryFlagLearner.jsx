import { useState, useEffect } from 'react';
import { getCountriesFlag } from '../services/dataService';
import CountryCard from '../pages/CountryFlagCard.jsx';

const CountryFlagLearner = () => {
    const [countries, setCountries] = useState([]);
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState({
        correct: 0,
        wrong: 0,
        total: 0
    });
    const [showStats, setShowStats] = useState(false);
    const [repetitionQueue, setRepetitionQueue] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const loadData = () => {
            const countryFlags = getCountriesFlag();

            if (!countryFlags || countryFlags.length === 0) {
                console.warn('No country flags data available');
                setIsLoading(false);
                return;
            }

            setCountries(countryFlags);
            initializeQueue(countryFlags);
            loadStats();
            setIsLoading(false);
        };

        loadData();
    }, []);

    const initializeQueue = (data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQueue(shuffled);
        setCurrentIndex(0);
        setRepetitionQueue([]);
    };

    const loadStats = () => {
        const saved = localStorage.getItem('countryFlagStats');
        if (saved) {
            try {
                setStats(JSON.parse(saved));
            } catch (e) {
                console.warn('Invalid stats data');
            }
        }
    };

    const saveStats = (newStats) => {
        localStorage.setItem('countryFlagStats', JSON.stringify(newStats));
    };

    const handleSwipe = (isCorrect, country) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        const newStats = {
            correct: isCorrect ? stats.correct + 1 : stats.correct,
            wrong: !isCorrect ? stats.wrong + 1 : stats.wrong,
            total: stats.total + 1
        };
        setStats(newStats);
        saveStats(newStats);

        // Spaced repetition logic
        if (isCorrect) {
            setTimeout(() => {
                setRepetitionQueue(prev => [...prev, country]);
            }, 100);
        } else {
            setRepetitionQueue(prev => [country, ...prev]);
        }

        // Move to next card after a shorter delay (200ms instead of 400ms)
        setTimeout(() => {
            if (currentIndex < queue.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setIsTransitioning(false);
            } else if (repetitionQueue.length > 0 || queue.length > 1) {
                if (repetitionQueue.length > 0) {
                    const nextCountry = repetitionQueue[0];
                    setRepetitionQueue(prev => prev.slice(1));
                    setQueue([nextCountry, ...queue.slice(currentIndex + 1)]);
                    setCurrentIndex(0);
                } else {
                    setShowStats(true);
                }
                setIsTransitioning(false);
            } else {
                setShowStats(true);
                setIsTransitioning(false);
            }
        }, 200); // Reduced from 400ms to 200ms
    };

    const getCurrentCountry = () => {
        if (queue.length === 0 || currentIndex >= queue.length) return null;
        return queue[currentIndex];
    };

    const resetGame = () => {
        const shuffled = [...countries].sort(() => Math.random() - 0.5);
        setQueue(shuffled);
        setCurrentIndex(0);
        setRepetitionQueue([]);
        setStats({ correct: 0, wrong: 0, total: 0 });
        setShowStats(false);
        setIsTransitioning(false);
        localStorage.setItem('countryFlagStats', JSON.stringify({ correct: 0, wrong: 0, total: 0 }));
    };

    const resetScoreOnly = () => {
        // Reset only the stats, keep the current game state
        const newStats = { correct: 0, wrong: 0, total: 0 };
        setStats(newStats);
        saveStats(newStats);
    };

    const currentCountry = getCurrentCountry();

    // Check if data is loaded
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading flags...</p>
            </div>
        );
    }

    if (!countries || countries.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-red-400 text-xl">Data not loaded. Please refresh the page.</div>
            </div>
        );
    }

    if (showStats) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        🎉 Learning Complete!
                    </h2>
                    <div className="space-y-3 text-left">
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">✅ Correct:</span>
                            <span className="font-semibold text-green-600 dark:text-green-400">{stats.correct}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">❌ Wrong:</span>
                            <span className="font-semibold text-red-600 dark:text-red-400">{stats.wrong}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">📊 Total:</span>
                            <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.total}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-600 dark:text-gray-400">🎯 Accuracy:</span>
                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <button
                            onClick={resetGame}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            🔄 Start Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentCountry) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-4">🌍</div>
                    <p>No more countries to learn!</p>
                    <button
                        onClick={resetGame}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-[600px]">


            {/* Stats with Reset Score Button */}
            <div className="absolute top-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-10 flex items-center gap-3">
                <div className="text-sm font-medium">
                    <span className="text-green-600 dark:text-green-400">✅ {stats.correct}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-red-600 dark:text-red-400">❌ {stats.wrong}</span>
                </div>
                <button
                    onClick={resetScoreOnly}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                    title="Reset score only (keep current progress)"
                >
                    Reset Score
                </button>
            </div>

            {/* Card Container */}
            <div className="relative w-full max-w-md mx-auto mt-12">
                <CountryCard
                    key={currentCountry.id}
                    country={currentCountry}
                    allCountries={countries}
                    onSwipe={handleSwipe}
                    isTransitioning={isTransitioning}
                />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-10">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          👆 Click the correct country name or swipe
        </span>
            </div>
        </div>
    );
};

export default CountryFlagLearner;
