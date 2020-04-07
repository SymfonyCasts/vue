/**
 * Generates the URL to call for a list of products by category or search term
 *
 * @param {number|null} category
 * @param {string} searchTerm
 * @return {string}
 */
const generateListingUrl = (category, searchTerm) => {
    let url = '/api/products';

    if (category || searchTerm !== '') {
        url += '?';

        if (category && searchTerm === '') {
            url += `category=${category}`;
        } else if (!category && searchTerm !== '') {
            url += `name=${searchTerm}`;
        } else {
            url += `category=${category}&name=${searchTerm}`;
        }
    }

    return url;
};

export default generateListingUrl;
