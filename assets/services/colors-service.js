import axios from 'axios';

/**
 * Gets the color information from our database
 *
 * @return {Promise}
 */
export function fetchColors() {
    return axios({
        method: 'get',
        url: '/api/colors',
    });
}
