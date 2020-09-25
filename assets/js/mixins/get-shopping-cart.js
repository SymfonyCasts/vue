import { getCart, getCartTotalItems } from '@/services/cart-service';

export default {
    data() {
        return {
            cart: {
                items: [],
            },
        };
    },
    async mounted() {
        try {
            this.cart = await getCart();
        } catch (e) {
            return;
        }

        this.updateShoppingCartHeader();
    },
    methods: {
        updateShoppingCartHeader() {
            document.getElementById('js-shopping-cart-items')
                .innerHTML = getCartTotalItems(this.cart).toString();
        },
    },
};
