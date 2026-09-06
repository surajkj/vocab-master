let synonymsData = null;
let antonymsData = null;
let oneWordData = null;
let countryCapitalData = null;
let countriesFlagData = null;

export const loadAllData = async () => {
    try {
        const [synonyms, antonyms, oneWord, countryCapital, countriesFlag ] = await Promise.all([
            import('../data/synonyms.json'),
            import('../data/antonyms.json'),
            import('../data/oneWordSubstitution.json'),
            import('../data/countryCapital.json'),
            import('../data/countriesFlag.json'),
        ]);

        synonymsData = synonyms.default;
        antonymsData = antonyms.default;
        oneWordData = oneWord.default;
        countryCapitalData = countryCapital.default;
        countriesFlagData = countriesFlag.default;

        return { synonymsData, antonymsData, oneWordData, countryCapitalData, countriesFlag };
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
};

export const getSynonymsData = () => synonymsData;
export const getAntonymsData = () => antonymsData;
export const getOneWordData = () => oneWordData;
export const getCountryCapital = () => countryCapitalData;
export const getCountriesFlag = () => countriesFlagData;
