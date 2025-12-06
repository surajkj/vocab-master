import { Search, Contrast, Zap } from 'lucide-react';
import { useState } from 'react';

const AntonymsPage = () => {
    const [word, setWord] = useState('');
    const [antonyms, setAntonyms] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Mock data - Replace with actual API call
        const mockAntonyms = {
            happy: ['sad', 'unhappy', 'miserable', 'depressed', 'gloomy'],
            beautiful: ['ugly', 'unattractive', 'hideous', 'plain', 'unsightly'],
            smart: ['stupid', 'dumb', 'foolish', 'unintelligent', 'slow'],
        };
        setAntonyms(mockAntonyms[word.toLowerCase()] || ['No antonyms found']);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <Contrast className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4 text-white">Antonyms Practice</h1>
                <p className="text-gray-300">Learn words with opposite meanings to enhance your vocabulary</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder="Enter a word to find antonyms..."
                            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                            <Search className="h-4 w-4" />
                            Search
                        </button>
                    </div>
                </form>

                {antonyms.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold mb-4 text-white">Antonyms for "{word}"</h3>
                        <div className="flex flex-wrap gap-3">
                            {antonyms.map((ant, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                  {ant}
                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Benefits of Learning Antonyms</h3>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Improves critical thinking and understanding of word relationships
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Enhances comprehension in reading and listening
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Essential for competitive exams and vocabulary building
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Helps in creating contrast and emphasis in writing
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AntonymsPage;
