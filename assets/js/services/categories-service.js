import axios from 'axios';

/**
 * @returns {Promise}
 */
export function fetchCategories() {
    return axios.get('/api/categories');
}
