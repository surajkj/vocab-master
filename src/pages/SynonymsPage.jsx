import { Search } from 'lucide-react';
import QuizPage from '../components/QuizPage';
import { getSynonymsData } from '../services/dataService';

const SynonymsPage = () => {
    const synonymsData = getSynonymsData();
    if (!synonymsData) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-red-400 text-xl">Data not loaded. Please refresh the page.</div>
            </div>
        );
    }

    return (
        <QuizPage
            title="Synonyms Quiz"
            description="Choose the correct synonym for each word"
            data={synonymsData}
            type="synonyms"
            icon={Search}
            color="blue"
        />
    );
};

export default SynonymsPage;
