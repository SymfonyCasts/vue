/**
 * Generates the params for the URL to call for a list of products
 * by category or search term
 *
 * @param {number|null} category
 * @param {string} searchTerm
 * @return {object}
 */
const generateListingParams = (category, searchTerm) => {
    const params = {};

    if (category) {
        params.category = category;
    }

    if (searchTerm !== '') {
        params.name = searchTerm;
    }

    return params;
};

export default generateListingParams;
