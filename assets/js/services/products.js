import axios from 'axios';
import generateListingUrl from '@/helpers/generate-listing-url';

const products = {
    /**
     * Fetches products from the database according to current category and search term
     *
     * @param {number|null} category
     * @param {string} searchTerm
     * @return {Promise}
     */
    fetchProducts(category, searchTerm) {
        return axios({
            method: 'get',
            url: generateListingUrl(category, searchTerm),
        });
    },
};

export default products;
