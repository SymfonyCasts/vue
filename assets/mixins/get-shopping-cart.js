import {
    addItemToCart,
    fetchCart,
    getCartTotalItems,
    removeItemFromCart,
    updateCartItemQuantity,
} from '@/services/cart-service';

export default {
    data() {
        return {
            cart: null,
            addToCartLoading: false,
            addToCartSuccess: false,
        };
    },
    async created() {
        this.cart = await fetchCart();
    },
    methods: {
        async addProductToCart(product, selectedColorId, quantity) {
            if (product.colors.length && selectedColorId === null) {
                alert('Please select a color first!');
                return;
            }

            this.addToCartLoading = true;
            this.addToCartSuccess = false;
            await addItemToCart(this.cart, {
                product: product['@id'],
                color: selectedColorId,
                quantity,
            });
            this.addToCartLoading = false;
            this.addToCartSuccess = true;

            this.updateCartHeaderTotal();
        },

        async updateProductQuantity(productId, colorId, quantity) {
            await updateCartItemQuantity(this.cart, productId, colorId, quantity);

            this.updateCartHeaderTotal();
        },

        async removeProductFromCart(productId, colorId) {
            await removeItemFromCart(this.cart, productId, colorId);

            this.updateCartHeaderTotal();
        },

        updateCartHeaderTotal() {
            document.getElementById('js-shopping-cart-items')
                .innerHTML = getCartTotalItems(this.cart).toString();
        },
    },
};
