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

    /**
     * Gets a product from the database according to the product id
     *
     * @param {number} id
     * @return {Promise}
     */
    getProduct(id) {
        return axios({
            method: 'get',
            url: `/api/products/${id}`,
        });
    },

    /**
     * Retrieves a set of products identified by an array of ids
     *
     * @param {number[]} ids
     * @return {Promise}
     */
    getProductsById(ids) {
        if (ids.length) {
            let idString = '';

            ids.forEach((id) => {
                if (idString.length) {
                    idString += '&';
                }

                idString += `id[]=${id}`;
            });

            return axios({
                method: 'get',
                url: `/api/products?${idString}`,
            });
        }

        return new Promise((resolve) => {
            resolve([]);
        });
    },
};

export default products;
