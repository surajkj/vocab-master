import { FileText } from 'lucide-react';
import QuizPage from '../components/QuizPage';
import {getOneWordData} from '../services/dataService';

const OneWordSubstitutionPage = () => {
    const oneWordData = getOneWordData();
    if (!oneWordData) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-red-400 text-xl">Data not loaded. Please refresh the page.</div>
            </div>
        );
    }
    return (
        <QuizPage
            title="One-Word Substitution"
            description="Replace phrases with single, precise words"
            data={oneWordData}
            type="oneWord"
            icon={FileText}
            color="purple"
        />
    );
};

export default OneWordSubstitutionPage;
