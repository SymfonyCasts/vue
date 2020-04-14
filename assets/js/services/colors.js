import axios from 'axios';

const colors = {
    /**
     * Gets color information from database
     *
     * @return {Promise}
     */
    getColors() {
        return axios({
            method: 'get',
            url: '/api/colors',
        });
    },
};

export default colors;
