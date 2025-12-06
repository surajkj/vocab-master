import { BookOpen, TrendingUp, Volume2 } from 'lucide-react';
import { useState } from 'react';

const VocabularyPage = () => {
    const [words] = useState([
        {
            word: "Ephemeral",
            meaning: "Lasting for a very short time",
            example: "The beauty of cherry blossoms is ephemeral.",
            pronunciation: "ih-fem-er-uhl"
        },
        {
            word: "Ubiquitous",
            meaning: "Present everywhere at the same time",
            example: "Smartphones have become ubiquitous in modern society.",
            pronunciation: "yoo-bik-wi-tuhs"
        },
        {
            word: "Serendipity",
            meaning: "Finding something good by chance",
            example: "Meeting my best friend was pure serendipity.",
            pronunciation: "ser-uhn-dip-i-tee"
        },
        {
            word: "Eloquent",
            meaning: "Fluent or persuasive in speaking or writing",
            example: "Her eloquent speech moved the entire audience.",
            pronunciation: "el-uh-kwuhnt"
        }
    ]);

    const [selectedWord, setSelectedWord] = useState(0);

    const speakWord = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 text-white">Vocabulary Builder</h1>
                <p className="text-gray-300">Expand your English vocabulary with carefully selected words</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Word List */}
                <div className="md:col-span-1 bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-6 text-white">Word List</h3>
                    <div className="space-y-3">
                        {words.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedWord(index)}
                                className={`w-full text-left p-4 rounded-lg transition-colors ${
                                    selectedWord === index
                                        ? 'bg-gray-700 border-l-4 border-green-500'
                                        : 'bg-gray-900 hover:bg-gray-700'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold text-white">{item.word}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speakWord(item.word);
                                        }}
                                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                                    >
                                        <Volume2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{item.meaning.substring(0, 40)}...</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Word Details */}
                <div className="md:col-span-2 bg-gray-800 rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{words[selectedWord].word}</h2>
                            <p className="text-gray-400 italic">{words[selectedWord].pronunciation}</p>
                        </div>
                        <button
                            onClick={() => speakWord(words[selectedWord].word)}
                            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        >
                            <Volume2 className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Meaning</h4>
                            <p className="text-xl text-white">{words[selectedWord].meaning}</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Example Sentence</h4>
                            <p className="text-xl text-white italic">"{words[selectedWord].example}"</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-300 mb-2">Usage Tips</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-blue-400 mr-2">•</span>
                                    Try using this word in your daily conversations
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-400 mr-2">•</span>
                                    Write sentences using this word to reinforce learning
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-400 mr-2">•</span>
                                    Look for this word in books or articles you read
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                <TrendingUp className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Vocabulary Building Tips</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-white">Daily Practice</h4>
                        <p className="text-gray-300">Learn 5 new words every day and review them regularly</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-white">Context Learning</h4>
                        <p className="text-gray-300">Learn words in context through reading and real-life usage</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VocabularyPage;