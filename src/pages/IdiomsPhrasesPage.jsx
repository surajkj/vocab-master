import { MessageSquare, Puzzle, Eye } from 'lucide-react';
import { useState } from 'react';

const IdiomsPhrasesPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const idioms = [
        {
            idiom: "Break the ice",
            meaning: "To initiate a conversation in a social setting",
            example: "He told a joke to break the ice at the meeting.",
            category: "Social"
        },
        {
            idiom: "Bite the bullet",
            meaning: "To endure a painful or difficult situation bravely",
            example: "I had to bite the bullet and tell him the truth.",
            category: "Courage"
        },
        {
            idiom: "Hit the nail on the head",
            meaning: "To describe exactly what is causing a situation or problem",
            example: "Your analysis really hit the nail on the head.",
            category: "Accuracy"
        },
        {
            idiom: "Piece of cake",
            meaning: "Something very easy to do",
            example: "The exam was a piece of cake for her.",
            category: "Difficulty"
        }
    ];

    const nextIdiom = () => {
        if (currentIndex < idioms.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setRevealed(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <MessageSquare className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 text-white">Idioms & Phrases</h1>
                <p className="text-gray-300">Learn common English idioms and their meanings</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-300">Idiom {currentIndex + 1} of {idioms.length}</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
            {idioms[currentIndex].category}
          </span>
                </div>

                <div className="text-center mb-8">
                    <h3 className="text-4xl font-bold text-yellow-300 mb-6">
                        "{idioms[currentIndex].idiom}"
                    </h3>

                    {!revealed ? (
                        <button
                            onClick={() => setRevealed(true)}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <Eye className="h-5 w-5" />
                            Reveal Meaning
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-2">Meaning</h4>
                                <p className="text-2xl text-white">{idioms[currentIndex].meaning}</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-2">Example</h4>
                                <p className="text-xl text-white italic">"{idioms[currentIndex].example}"</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                        disabled={currentIndex === 0}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        onClick={nextIdiom}
                        disabled={currentIndex === idioms.length - 1}
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                    >
                        Next Idiom
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <Puzzle className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Why Learn Idioms?</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Makes you sound more like a native speaker
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Enhances comprehension of English media
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-400 mr-2">✓</span>
                            Adds color and expressiveness to your language
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <MessageSquare className="h-8 w-8 text-green-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Practice Tips</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Learn one idiom daily and use it in conversation
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Note idioms you hear in movies or books
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            Practice with native speakers or language partners
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IdiomsPhrasesPage;