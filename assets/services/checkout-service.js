import axios from 'axios';

/**
 * Makes a POST call to create a purchase object after checkout
 *
 * @param {Object} data
 * @return {Promise}
 */
export function createOrder(data) {
    return axios.post('/api/purchases', data);
}
