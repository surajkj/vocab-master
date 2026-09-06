import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CountryCard = ({ country, allCountries, onSwipe, isTransitioning }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (country) {
            generateOptions();
            setSelectedOption(null);
            setIsCorrect(null);
            setShowAnswer(false);
            controls.start({ x: 0, opacity: 1, scale: 1 });
        }
    }, [country]);

    const generateOptions = () => {
        if (!country) return;

        const otherCountries = allCountries.filter(c => c.id !== country.id);
        const shuffled = [...otherCountries].sort(() => Math.random() - 0.5);
        const wrongOptions = shuffled.slice(0, 3);

        const allOptions = [
            { ...country, isCorrect: true },
            ...wrongOptions.map(c => ({ ...c, isCorrect: false }))
        ];

        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        setOptions(shuffledOptions);
    };

    const handleOptionClick = (option) => {
        if (selectedOption || isTransitioning) return;

        setSelectedOption(option.id);
        const correct = option.isCorrect;
        setIsCorrect(correct);
        setShowAnswer(true);

        // Faster animation
        controls.start({
            x: correct ? 300 : -300,
            opacity: 0,
            scale: 0.9,
            rotate: correct ? 3 : -3,
            transition: { duration: 0.25 } // Reduced from 0.4 to 0.25
        });

        setTimeout(() => {
            onSwipe(correct, country);
        }, 250); // Reduced from 450ms to 250ms
    };

    if (!country) return null;

    return (
        <motion.div
            className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }} // Faster entrance
        >
            <motion.div
                animate={controls}
                initial={{ x: 0, opacity: 1 }}
            >
                {/* Flag Image */}
                <div className="relative h-56 bg-gray-100 dark:bg-gray-700"> {/* Reduced height from 64 to 56 */}
                    <img
                        src={country.flagUrl}
                        alt={`Flag of ${country.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="40"%3E🏳️%3C/text%3E%3C/svg%3E';
                        }}
                    />
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <span className="text-white text-sm">{country.emoji}</span>
                    </div>
                </div>

                {/* Question */}
                <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                        Which country does this flag belong to?
                    </h3>

                    {/* Options */}
                    <div className="space-y-2">
                        {options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const showCorrect = showAnswer && option.isCorrect;
                            const showWrong = showAnswer && isSelected && !option.isCorrect;

                            return (
                                <motion.button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={selectedOption !== null || isTransitioning}
                                    whileHover={!selectedOption && !isTransitioning ? { scale: 1.01 } : {}}
                                    whileTap={!selectedOption && !isTransitioning ? { scale: 0.98 } : {}}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 flex items-center justify-between text-sm
                    ${showCorrect ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : ''}
                    ${showWrong ? 'bg-red-100 dark:bg-red-900 border-2 border-red-500' : ''}
                    ${!selectedOption && !isTransitioning ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600' : ''}
                    ${isSelected && option.isCorrect ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : ''}
                    ${!showAnswer && !selectedOption && !isTransitioning ? 'cursor-pointer' : 'cursor-default'}
                  `}
                                >
                  <span className="text-gray-800 dark:text-white font-medium">
                    {option.name}
                  </span>
                                    {showCorrect && (
                                        <span className="text-green-600 dark:text-green-400 font-bold text-xs">✓ Correct</span>
                                    )}
                                    {showWrong && (
                                        <span className="text-red-600 dark:text-red-400 font-bold text-xs">✗ Wrong</span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Feedback Message */}
                    {showAnswer && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-3 p-2 rounded-lg text-center font-semibold text-sm
                ${isCorrect ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}
                        >
                            {isCorrect ? '✅ Correct! Great job!' : `❌ Oops! The correct answer is ${country.name}`}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CountryCard;
