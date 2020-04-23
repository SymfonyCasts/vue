import axios from 'axios';

const checkout = {
    /**
     * Makes a POST call to create a purchase object after checkout
     *
     * @param {Object} data
     * @return {Promise}
     */
    createOrder(data) {
        return axios({
            method: 'post',
            url: '/api/purchases',
            data,
        });
    },
};

export default checkout;
