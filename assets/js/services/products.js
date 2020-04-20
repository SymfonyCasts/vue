import axios from 'axios';
import generateListingParams from '@/helpers/generate-listing-params';

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
            url: '/api/products',
            params: generateListingParams(category, searchTerm),
        });
    },
};

export default products;
