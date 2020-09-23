import { getCart, getCartTotalItems } from '@/services/cart-service';

export default {
    data() {
        return {
            cart: null,
        };
    },
    async mounted() {
        try {
            this.cart = await getCart();
        } catch (e) {
            return;
        }

        document.getElementById('js-shopping-cart-items')
            .innerHTML = getCartTotalItems(this.cart).toString();
    },
};
