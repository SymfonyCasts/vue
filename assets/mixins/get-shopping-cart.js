import { addItemToCart, fetchCart, getCartTotalItems } from '@/services/cart-service';

export default {
    data() {
        return {
            cart: null,
        };
    },
    async created() {
        this.cart = await fetchCart();
    },
    methods: {
        async addToCart() {
            if (this.product.colors.length && this.selectedColorId === null) {
                alert('Please select a color first!');
                return;
            }

            this.addToCartLoading = true;
            this.addToCartSuccess = false;
            await addItemToCart(this.cart, {
                product: this.product['@id'],
                color: this.selectedColorId,
                quantity: this.quantity,
            });
            this.addToCartLoading = false;
            this.addToCartSuccess = true;

            document.getElementById('js-shopping-cart-items')
                .innerHTML = getCartTotalItems(this.cart).toString();
        },
    },
};
