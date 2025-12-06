import { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, RefreshCw, HelpCircle, Award, TrendingUp, BarChart } from 'lucide-react';
import synonymsData from '../data/synonyms.json';

const SynonymsPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [averageScore, setAverageScore] = useState(0);

    // Use refs to track initial state
    const [isInitialized, setIsInitialized] = useState(false);
    const feedbackRef = useRef(null);
    const nextButtonRef = useRef(null);

    // Utility function to save progress to localStorage
    const saveProgress = (currentScore, totalAttempted) => {
        const progress = {
            date: new Date().toISOString(),
            score: currentScore,
            total: totalAttempted,
            percentage: totalAttempted > 0 ? Math.round((currentScore / totalAttempted) * 100) : 0
        };

        const existing = JSON.parse(localStorage.getItem('synonymsProgress') || '[]');
        existing.push(progress);

        // Keep only last 10 sessions
        const recent = existing.slice(-10);
        localStorage.setItem('synonymsProgress', JSON.stringify(recent));
    };

    // Utility function to get average score from localStorage
    const getAverageScore = () => {
        const history = JSON.parse(localStorage.getItem('synonymsProgress') || '[]');
        if (history.length === 0) return 0;

        const total = history.reduce((sum, session) => sum + session.percentage, 0);
        return Math.round(total / history.length);
    };

    // Get random question
    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * synonymsData.synonyms.length);
        const question = synonymsData.synonyms[randomIndex];

        // Shuffle options
        const shuffled = [...question.options].sort(() => Math.random() - 0.5);

        setCurrentQuestion(question);
        setShuffledOptions(shuffled);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowHint(false);
    };

    // Initialize state - using setTimeout to avoid synchronous setState in useEffect
    useEffect(() => {
        const initializeQuiz = () => {
            // Get initial question
            const randomIndex = Math.floor(Math.random() * synonymsData.synonyms.length);
            const question = synonymsData.synonyms[randomIndex];
            const shuffled = [...question.options].sort(() => Math.random() - 0.5);

            // Get average score
            const avgScore = getAverageScore();

            // Set all state at once
            setCurrentQuestion(question);
            setShuffledOptions(shuffled);
            setAverageScore(avgScore);
            setIsInitialized(true);
        };

        // Use setTimeout to defer state updates
        const timer = setTimeout(initializeQuiz, 0);

        return () => clearTimeout(timer);
    }, []);

    // Handle option selection
    const handleOptionSelect = (option) => {
        if (isAnswered) return;

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

    // Calculate percentage
    const percentage = questionsAttempted > 0 ? Math.round((score / questionsAttempted) * 100) : 0;

    if (!isInitialized) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-white">Synonyms Quiz</h1>
                <p className="text-gray-300">Choose the correct synonym for each word</p>
            </div>

            {/* Stats Bar */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <Award className="h-5 w-5 text-yellow-400" />
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
                            <TrendingUp className="h-5 w-5 text-green-400" />
                            <span className="text-lg font-semibold text-white">{percentage}%</span>
                        </div>
                        <p className="text-sm text-gray-400">Accuracy</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <BarChart className="h-5 w-5 text-purple-400" />
                            <span className="text-lg font-semibold text-white">{averageScore}%</span>
                        </div>
                        <p className="text-sm text-gray-400">Average Score</p>
                    </div>
                </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border border-gray-700">
                {/* Question */}
                <div className="text-center mb-2">
                    <h2 className="text-xl text-gray-400 mb-2">Find the synonym for:</h2>
                    <h1 className="text-4xl font-bold text-blue-400 mb-6">{currentQuestion.word}</h1>

                    {/* Hint */}
                    <div className="mb-3">
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <HelpCircle className="h-4 w-4" />
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {showHint && (
                            <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                                <p className="text-gray-300 italic">"{currentQuestion.hint}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {shuffledOptions.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correct;

                        let buttonClass = "p-4 text-xl font-medium rounded-lg transition-all duration-300 ";

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
                                            <CheckCircle className="h-6 w-6 text-green-400" />
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-400" />
                                        )
                                    )}
                                    {isAnswered && !isSelected && isCorrect && (
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Fixed height feedback area */}
                <div className="min-h-[100px] mb-4">
                    {isAnswered && (
                        <div
                            ref={feedbackRef}
                            className="animate-fadeIn"
                        >
                            {selectedOption === currentQuestion.correct ? (
                                <div className="inline-flex items-center gap-3 p-4 bg-green-900/30 text-green-300 rounded-lg border border-green-700 w-full">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0" />
                                    <span className="text-xl font-semibold">Correct! "{currentQuestion.correct}" is the right answer.</span>
                                </div>
                            ) : (
                                <div className="inline-flex items-start gap-3 p-4 bg-red-900/30 text-red-300 rounded-lg border border-red-700 w-full">
                                    <XCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold mb-2">Incorrect. The correct answer is "{currentQuestion.correct}"</p>
                                        <p className="text-sm text-red-200">
                                            <span className="font-semibold">Hint:</span> {currentQuestion.hint}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Next Button - Always at fixed position */}
                <div className="text-center" ref={nextButtonRef}>
                    <button
                        onClick={handleNextQuestion}
                        disabled={!isAnswered}
                        className="inline-flex items-center gap-3 px-5 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Next Question
                    </button>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-yellow-400" />
                    Tips for Learning Synonyms
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-300">Learning Strategies</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                Use new words in sentences immediately
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                Group related words together
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">✓</span>
                                Read extensively to encounter words in context
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-300">Practice Techniques</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                Use flashcards for regular review
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                Play word games and puzzles
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">•</span>
                                Write essays or stories using new words
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Reset Progress Button */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <button
                        onClick={() => {
                            localStorage.removeItem('synonymsProgress');
                            setAverageScore(0);
                        }}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                        Reset Progress History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SynonymsPage;
