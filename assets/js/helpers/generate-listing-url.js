/**
 * Generates the URL to call for a list of products by category or search term
 *
 * @param {number|null} category
 * @param {string} searchTerm
 * @return {string}
 */
const generateListingUrl = (category, searchTerm) => {
    let url = '/api/products';

    if (this.currentCategoryId || searchTerm !== '') {
        url += '?';

        if (this.currentCategoryId && searchTerm === '') {
            url += `category=${this.currentCategoryId}`;
        } else if (!this.currentCategoryId && searchTerm !== '') {
            url += `name=${searchTerm}`;
        } else {
            url += `category=${this.currentCategoryId}&name=${searchTerm}`;
        }
    }

    return url;
};

export default generateListingUrl;
