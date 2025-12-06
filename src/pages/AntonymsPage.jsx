import { Contrast } from 'lucide-react';
import QuizPage from '../components/QuizPage';
import {getAntonymsData} from '../services/dataService';


const AntonymsPage = () => {
    const antonymsData = getAntonymsData();
    if (!antonymsData) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-red-400 text-xl">Data not loaded. Please refresh the page.</div>
            </div>
        );
    }
    return (
        <QuizPage
            title="Antonyms Quiz"
            description="Choose the correct antonym for each word"
            data={antonymsData}  // Pass the data directly
            type="antonyms"
            icon={Contrast}
            color="red"
        />
    );
};

export default AntonymsPage;
