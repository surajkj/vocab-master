import { FileText, CheckCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const OneWordSubstitutionPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const questions = [
        {
            phrase: "A person who loves books",
            options: ["Bibliophile", "Philatelist", "Omnivore", "Polyglot"],
            answer: "Bibliophile"
        },
        {
            phrase: "A government by the people",
            options: ["Autocracy", "Democracy", "Monarchy", "Oligarchy"],
            answer: "Democracy"
        },
        {
            phrase: "One who can use both hands equally well",
            options: ["Ambidextrous", "Ambivalent", "Amphibious", "Androgynous"],
            answer: "Ambidextrous"
        },
        {
            phrase: "A person who is indifferent to pleasure or pain",
            options: ["Stoic", "Epicurean", "Cynic", "Skeptic"],
            answer: "Stoic"
        }
    ];

    const handleAnswer = (selected) => {
        if (selected === questions[currentIndex].answer) {
            setScore(score + 1);
        }
        setShowAnswer(true);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 text-white">One-Word Substitution</h1>
                <p className="text-gray-300">Replace phrases with single words to improve vocabulary</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-300">Question {currentIndex + 1} of {questions.length}</span>
                    <span className="text-green-400 font-bold">Score: {score}</span>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">Phrase:</h3>
                    <p className="text-3xl font-semibold text-blue-300 mb-8">
                        "{questions[currentIndex].phrase}"
                    </p>

                    <h4 className="text-xl font-bold mb-4 text-white">Choose the correct one-word substitute:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        {questions[currentIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={showAnswer}
                                className={`p-4 rounded-lg text-left transition-all ${
                                    showAnswer
                                        ? option === questions[currentIndex].answer
                                            ? 'bg-green-900 text-green-200 border-2 border-green-500'
                                            : 'bg-gray-700 text-gray-400'
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {showAnswer && (
                    <div className="bg-gray-900 p-6 rounded-lg mb-6">
                        <CheckCircle className="h-6 w-6 text-green-400 inline mr-2" />
                        <span className="text-xl text-white font-semibold">
              Correct Answer: <span className="text-green-400">{questions[currentIndex].answer}</span>
            </span>
                    </div>
                )}

                <button
                    onClick={nextQuestion}
                    disabled={currentIndex === questions.length - 1}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {currentIndex === questions.length - 1 ? 'Quiz Complete!' : 'Next Question'}
                </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <HelpCircle className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Importance of One-Word Substitution</h3>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Makes writing more concise and effective
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Essential for competitive exams and formal writing
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Improves vocabulary and linguistic precision
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Enhances communication skills and writing style
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OneWordSubstitutionPage;