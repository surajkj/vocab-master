import { Globe } from 'lucide-react';
import QuizPage from '../components/QuizPage';
import { getCountryCapital } from '../services/dataService';

const CountryCapitalPage = () => {
    const countryCapital = getCountryCapital();
    if (!countryCapital) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="text-red-400 text-xl">Data not loaded. Please refresh the page.</div>
            </div>
        );
    }

    return (
        <QuizPage
            title="Country Capital"
            description="Choose the correct capital for country"
            data={countryCapital}
            type="country-capital"
            icon={Globe}
            color="blue"
        />
    );
};

export default CountryCapitalPage;
