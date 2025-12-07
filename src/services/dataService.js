let synonymsData = null;
let antonymsData = null;
let oneWordData = null;
let countryCapitalData = null;

export const loadAllData = async () => {
    try {
        const [synonyms, antonyms, oneWord, countryCapital, ] = await Promise.all([
            import('../data/synonyms.json'),
            import('../data/antonyms.json'),
            import('../data/oneWordSubstitution.json'),
            import('../data/countryCapital.json'),
        ]);

        synonymsData = synonyms.default;
        antonymsData = antonyms.default;
        oneWordData = oneWord.default;
        countryCapitalData = countryCapital.default;

        return { synonymsData, antonymsData, oneWordData };
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
};

export const getSynonymsData = () => synonymsData;
export const getAntonymsData = () => antonymsData;
export const getOneWordData = () => oneWordData;
export const getCountryCapital = () => countryCapitalData;
