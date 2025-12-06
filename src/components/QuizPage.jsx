import { useState, useEffect } from 'react';
import {
    CheckCircle,
    XCircle,
    RefreshCw,
    HelpCircle,
    Award,
    TrendingUp,
    BarChart,
    Volume2,
    AlertCircle
} from 'lucide-react';

const QuizPage = ({
                      title,
                      description,
                      data = null,  // Changed to null for better detection
                      type = 'synonyms',
                      icon: Icon,
                      color = 'blue'
                  }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [averageScore, setAverageScore] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    // Color configurations
    const colorConfigs = {
        blue: {
            primary: 'bg-blue-600 hover:bg-blue-700',
            border: 'border-blue-500',
            text: 'text-blue-400',
            bgLight: 'bg-blue-500/10',
            correct: 'bg-green-900 border-green-500',
            incorrect: 'bg-red-900 border-red-500'
        },
        red: {
            primary: 'bg-red-600 hover:bg-red-700',
            border: 'border-red-500',
            text: 'text-red-400',
            bgLight: 'bg-red-500/10',
            correct: 'bg-green-900 border-green-500',
            incorrect: 'bg-red-900 border-red-500'
        },
        purple: {
            primary: 'bg-purple-600 hover:bg-purple-700',
            border: 'border-purple-500',
            text: 'text-purple-400',
            bgLight: 'bg-purple-500/10',
            correct: 'bg-green-900 border-green-500',
            incorrect: 'bg-red-900 border-red-500'
        },
        green: {
            primary: 'bg-green-600 hover:bg-green-700',
            border: 'border-green-500',
            text: 'text-green-400',
            bgLight: 'bg-green-500/10',
            correct: 'bg-green-900 border-green-500',
            incorrect: 'bg-red-900 border-red-500'
        },
        yellow: {
            primary: 'bg-yellow-600 hover:bg-yellow-700',
            border: 'border-yellow-500',
            text: 'text-yellow-400',
            bgLight: 'bg-yellow-500/10',
            correct: 'bg-green-900 border-green-500',
            incorrect: 'bg-red-900 border-red-500'
        }
    };

    const colors = colorConfigs[color] || colorConfigs.blue;

    // Utility function to save progress to localStorage
    const saveProgress = (currentScore, totalAttempted) => {
        const storageKey = `${type}Progress`;
        const progress = {
            date: new Date().toISOString(),
            score: currentScore,
            total: totalAttempted,
            percentage: totalAttempted > 0 ? Math.round((currentScore / totalAttempted) * 100) : 0,
            type: type
        };

        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existing.push(progress);

        // Keep only last 10 sessions
        const recent = existing.slice(-10);
        localStorage.setItem(storageKey, JSON.stringify(recent));
    };

    // Utility function to get average score from localStorage
    const getAverageScore = () => {
        const storageKey = `${type}Progress`;
        const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (history.length === 0) return 0;

        const total = history.reduce((sum, session) => sum + session.percentage, 0);
        return Math.round(total / history.length);
    };

    // Get random question - with safety checks
    const getRandomQuestion = () => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.error('No data available for quiz');
            return;
        }

        const randomIndex = Math.floor(Math.random() * data.length);
        const question = data[randomIndex];

        // Validate question structure
        if (!question || !question.options || !Array.isArray(question.options)) {
            console.error('Invalid question structure:', question);
            return;
        }

        // Shuffle options
        const shuffled = [...question.options].sort(() => Math.random() - 0.5);

        setCurrentQuestion(question);
        setShuffledOptions(shuffled);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    };

    // Initialize state - with better error handling and data dependency
    useEffect(() => {
        const initializeQuiz = () => {
            // Check if data is valid
            if (!data || !Array.isArray(data) || data.length === 0) {
                console.warn('No quiz data provided or data is still loading');
                setIsInitialized(true);
                return;
            }

            try {
                // Get initial question
                const randomIndex = Math.floor(Math.random() * data.length);
                const question = data[randomIndex];

                // Validate question
                if (!question || !question.options || !Array.isArray(question.options)) {
                    throw new Error('Invalid question structure');
                }

                const shuffled = [...question.options].sort(() => Math.random() - 0.5);

                // Get average score
                const avgScore = getAverageScore();

                // Set all state at once
                setCurrentQuestion(question);
                setShuffledOptions(shuffled);
                setAverageScore(avgScore);
                setIsInitialized(true);
            } catch (error) {
                console.error('Error initializing quiz:', error);
                setIsInitialized(true);
            }
        };

        // Only initialize if we have data
        if (data) {
            const timer = setTimeout(initializeQuiz, 0);
            return () => clearTimeout(timer);
        }
    }, [data]); // This will re-run when data changes

    // Handle option selection
    const handleOptionSelect = (option) => {
        if (isAnswered || !currentQuestion) return;

        setSelectedOption(option);
        setIsAnswered(true);
        const newAttempts = questionsAttempted + 1;
        setQuestionsAttempted(newAttempts);

        if (option === currentQuestion.correct) {
            const newScore = score + 1;
            setScore(newScore);
        }
    };

    // Handle next question
    const handleNextQuestion = () => {
        // Save progress before getting new question
        if (questionsAttempted > 0) {
            saveProgress(score, questionsAttempted);

            // Update average score
            const avgScore = getAverageScore();
            setAverageScore(avgScore);
        }

        getRandomQuestion();
    };

    // Speak the word
    const speakWord = (text) => {
        if ('speechSynthesis' in window && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Calculate percentage
    const percentage = questionsAttempted > 0 ? Math.round((score / questionsAttempted) * 100) : 0;

    // Show loading state if data is not loaded yet
    if (!data) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading quiz questions...</p>
            </div>
        );
    }

    // Show error if no data after loading
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <div className="text-red-400 text-xl mb-4">No questions available</div>
                <p className="text-gray-400 mb-6">The quiz data could not be loaded. Please try again later.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Reload Page
                </button>
            </div>
        );
    }

    // Show loading while initializing with data
    if (!isInitialized) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Initializing quiz...</p>
            </div>
        );
    }

    // Show error if no current question
    if (!currentQuestion) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-yellow-400 text-xl mb-4">⚠️ Could not load question</div>
                <p className="text-gray-400 mb-4">Please try loading a new question.</p>
                <button
                    onClick={getRandomQuestion}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Load Question
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    {Icon && <Icon className="h-12 w-12" style={{color: colors.text.replace('text-', '')}}/>}
                    <div>
                        <h1 className="text-4xl font-bold text-white">{title}</h1>
                        <p className="text-gray-300">{description}</p>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Award className="h-5 w-5 text-yellow-400"/>
                            <span className="text-lg font-semibold text-white">Score: {score}</span>
                        </div>
                        <p className="text-sm text-gray-400">Correct Answers</p>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-white">{questionsAttempted}</div>
                        <p className="text-sm text-gray-400">Questions Attempted</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-400"/>
                            <span className="text-lg font-semibold text-white">{percentage}%</span>
                        </div>
                        <p className="text-sm text-gray-400">Accuracy</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <BarChart className="h-5 w-5 text-purple-400"/>
                            <span className="text-lg font-semibold text-white">{averageScore}%</span>
                        </div>
                        <p className="text-sm text-gray-400">Average Score</p>
                    </div>
                </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border border-gray-700">
                {/* Question */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl text-gray-400 mb-4">
                        {type === 'synonyms'
                            ? 'Find the synonym for:'
                            : type === 'antonyms'
                                ? 'Find the antonym for:'
                                : 'Select the correct answer:'}
                    </h2>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <h1 className="text-5xl font-bold" style={{color: colors.text.replace('text-', '')}}>
                            {currentQuestion.word}
                        </h1>
                        <button
                            onClick={() => speakWord(currentQuestion.word)}
                            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                            title="Listen to pronunciation"
                        >
                            <Volume2 className="h-6 w-6 text-gray-300"/>
                        </button>
                    </div>

                    {/* Hint */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <HelpCircle className="h-4 w-4"/>
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {showHint && currentQuestion.hint && (
                            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                                <p className="text-gray-300 italic">"{currentQuestion.hint}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {shuffledOptions.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correct;

                        let buttonClass = "p-6 text-xl font-medium rounded-lg transition-all duration-300 ";

                        if (isAnswered) {
                            if (isCorrect) {
                                buttonClass += "bg-green-900 text-green-200 border-2 border-green-500 shadow-lg";
                            } else if (isSelected && !isCorrect) {
                                buttonClass += "bg-red-900 text-red-200 border-2 border-red-500";
                            } else {
                                buttonClass += "bg-gray-700 text-gray-400";
                            }
                        } else {
                            buttonClass += "bg-gray-700 text-white hover:bg-gray-600 hover:scale-[1.02] cursor-pointer";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                disabled={isAnswered}
                                className={buttonClass}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {isAnswered && isSelected && (
                                        isCorrect ? (
                                            <CheckCircle className="h-6 w-6 text-green-400"/>
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-400"/>
                                        )
                                    )}
                                    {isAnswered && !isSelected && isCorrect && (
                                        <CheckCircle className="h-6 w-6 text-green-400"/>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Fixed height feedback area */}
                <div className="min-h-[120px] mb-6">
                    {isAnswered && (
                        <div className="animate-fadeIn">
                            {selectedOption === currentQuestion.correct ? (
                                <div
                                    className="inline-flex items-center gap-3 p-4 bg-green-900/30 text-green-300 rounded-lg border border-green-700 w-full">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0"/>
                                    <span className="text-xl font-semibold">Correct! "{currentQuestion.correct}" is the right answer.</span>
                                </div>
                            ) : (
                                <div
                                    className="inline-flex items-start gap-3 p-4 bg-red-900/30 text-red-300 rounded-lg border border-red-700 w-full">
                                    <XCircle className="h-6 w-6 flex-shrink-0 mt-1"/>
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold mb-2">Incorrect. The correct answer is
                                            "{currentQuestion.correct}"</p>
                                        {currentQuestion.hint && (
                                            <p className="text-sm text-red-200">
                                                <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Next Button - Always at fixed position */}
                <div className="text-center">
                    <button
                        onClick={handleNextQuestion}
                        disabled={!isAnswered}
                        className={`inline-flex items-center gap-3 px-8 py-4 ${colors.primary} text-white text-lg font-semibold rounded-lg transition-colors hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    >
                        <RefreshCw className="h-5 w-5"/>
                        Next Question
                    </button>
                </div>
            </div>


            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <button
                    onClick={() => {
                        localStorage.removeItem(`${type}Progress`);
                        setAverageScore(0);
                        alert('Progress history has been reset');
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                    Reset Progress History
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
