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

export function fetchFeaturedProducts() {
    return axios.get('/api/products', {
        params: { featured: 1 },
    });
}

/**
 * Gets a product from the API according to the IRI.
 *
 * @param {string} iri
 * @return {Promise}
 */
export function fetchOneProduct(iri) {
    return axios.get(iri);
}

/**
 * Retrieves a set of products identified by an array of IRIs
 *
 * @param {string[]} ids
 * @return {Promise}
 */
export function fetchProductsById(ids) {
    if (!ids.length) {
        return Promise.resolve({ data: { 'hydra:member': [] } });
    }

    return axios.get(
        '/api/products',
        {
            params: { id: ids },
        },
    );
}
