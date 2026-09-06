import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import SynonymsPage from './pages/SynonymsPage';
import AntonymsPage from './pages/AntonymsPage';
import OneWordSubstitutionPage from './pages/OneWordSubstitutionPage';
import VocabularyPage from './pages/VocabularyPage';
import IdiomsPhrasesPage from './pages/IdiomsPhrasesPage';
import CountryCapitalPage  from "./pages/CountryCapitalPage.jsx";
import CountryFlagLearner from './pages/CountryFlagLearner';
import { loadAllData } from './services/dataService';

function App() {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (!saved) return false;

        try {
            // Try to parse as JSON
            return JSON.parse(saved);
        } catch (error) {
            // If it's not valid JSON, check if it's the string 'true' or 'false'
            if (saved === 'true') return true;
            if (saved === 'false') return false;
            if (saved === 'light') return false;
            if (saved === 'dark') return true;

            // Default to false for any other values
            console.warn('Invalid darkMode value in localStorage:', saved);
            return false;
        }
    });

    useEffect(() => {
        const initApp = async () => {
            await loadAllData();
            setIsDataLoaded(true);
        };

        initApp();
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (!isDataLoaded) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-400 text-lg">Loading English Practice App...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Navbar is now outside Routes, so it shows on all pages */}
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="vocab-master" element={<Homepage/>}/>
                    <Route path="vocab-master/about" element={<AboutPage/>}/>
                    <Route path="vocab-master/synonyms" element={<SynonymsPage/>}/>
                    <Route path="vocab-master/antonyms" element={<AntonymsPage/>}/>
                    <Route path="vocab-master/one-word-substitution" element={<OneWordSubstitutionPage/>}/>
                    <Route path="vocab-master/vocabulary" element={<VocabularyPage/>}/>
                    <Route path="vocab-master/idioms-phrases" element={<IdiomsPhrasesPage/>}/>
                    <Route path="vocab-master/country-capital" element={<CountryCapitalPage/>}/>
                    <Route path="vocab-master/country-flags" element={<CountryFlagLearner />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
