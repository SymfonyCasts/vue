import axios from 'axios';

/**
 * Gets the color information from our database
 *
 * @return {Promise}
 */
<<<<<<< HEAD
export function getColors() {
=======
export function fetchColors() {
>>>>>>> vue-2-final
    return axios({
        method: 'get',
        url: '/api/colors',
    });
}
