import axios from 'axios';

/**
 * @param {string|null} categoryIri
 * @param {string|null} searchTerm
 * @returns {Promise}
 */
export function fetchProducts(categoryIri, searchTerm) {
    const params = {};
    if (categoryIri) {
        params.category = categoryIri;
    }

    if (searchTerm) {
        params.name = searchTerm;
    }

    return axios.get('/api/products', {
        params,
    });
}

/**
 * Gets a product from the API according to the productIri
 *
 * @param {string} productIri
 * @return {Promise}
 */
export function getProduct(productIri) {
    return axios.get(productIri);
}

/**
 * Retrieves a set of products identified by an array of IRIs
 *
 * @param {string[]} ids
 * @return {Promise}
 */
export function getProductsById(ids) {
    if (!ids.length) {
        return Promise.resolve({ 'hydra:member': [] });
    }

    return axios.get(
        '/api/products',
        {
            params: { id: ids },
        },
    );
}
