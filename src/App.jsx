import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import SynonymsPage from './pages/SynonymsPage';
import AntonymsPage from './pages/AntonymsPage';
import OneWordSubstitutionPage from './pages/OneWordSubstitutionPage';
import VocabularyPage from './pages/VocabularyPage';
import IdiomsPhrasesPage from './pages/IdiomsPhrasesPage';

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navbar is now outside Routes, so it shows on all pages */}
            <Navbar/>

            <main className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<SynonymsPage/>}/>
                    <Route path="vocab-master/about" element={<AboutPage/>}/>
                    <Route path="vocab-master/synonyms" element={<SynonymsPage/>}/>
                    <Route path="vocab-master/antonyms" element={<AntonymsPage/>}/>
                    <Route path="vocab-master/one-word-substitution" element={<OneWordSubstitutionPage/>}/>
                    <Route path="vocab-master/vocabulary" element={<VocabularyPage/>}/>
                    <Route path="vocab-master/idioms-phrases" element={<IdiomsPhrasesPage/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
