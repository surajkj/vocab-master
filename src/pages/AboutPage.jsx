import { Info, Users, Target, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-white">About EnglishMaster</h1>
                <p className="text-gray-300 text-lg">Your ultimate platform for mastering English language skills</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <Info className="h-12 w-12 text-blue-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
                    <p className="text-gray-300">
                        To provide students with a comprehensive, interactive platform for improving their English
                        language skills through engaging exercises and practical examples.
                    </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <Users className="h-12 w-12 text-green-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-white">For Students</h2>
                    <p className="text-gray-300">
                        Designed specifically for English learners of all levels, from beginners to advanced students
                        preparing for competitive exams.
                    </p>
                </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                        <Target className="h-6 w-6 text-yellow-400 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Targeted Practice</h3>
                            <p className="text-gray-300">Focus on specific areas like vocabulary, idioms, and word substitution</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <Globe className="h-6 w-6 text-purple-400 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Global Accessibility</h3>
                            <p className="text-gray-300">Available to students worldwide, completely free of charge</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
