import { fetchCart } from '@/services/cart-service';

export default {
    data() {
        return {
            cart: null,
        };
    },
    async created() {
        fetchCart().then((cart) => {
            this.cart = cart;
        });
    },
};
