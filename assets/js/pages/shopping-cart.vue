<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="pb-3">
                    <title-component text="Shopping Cart" />
                </div>

                <div class="content">
                    <div
                        v-show="loading"
                        class="p-3"
                    >
                        <loading />
                    </div>

                    <shopping-cart-list
                        v-show="!loading"
                        :items="items"
                        @updateQuantity="updateQuantity"
                        @removeFromCart="removeFromCart"
                    />

                    <div
                        v-show="!loading && items.length"
                        class="row p-3 justify-content-end"
                    >
                        <div class="col-2">
                            <button
                                class="btn btn-info btn-sm"
                                @click="switchState"
                            >
                                Checkout!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFullShoppingCart, updateCartItemQuantity, removeItemFromCart } from '@/services/cart-service';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';
import ShoppingCartList from '@/components/shopping-cart';
import shoppingCartMixin from '@/mixins/get-shopping-cart';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        ShoppingCartList,
        TitleComponent,
    },
    mixins: [shoppingCartMixin],
    data() {
        return {
            currentState: 1,
            colors: {},
            items: [],
            loading: false,
        };
    },
    watch: {
        'cart.items.length': async function watchCartItemsLength() {
            this.loading = true;
            this.items = [];

            if (!this.cart.items.length) {
                this.loading = false;
                return;
            }

            try {
                this.items = await getFullShoppingCart(this.cart);
            } catch (e) {
                this.loading = false;
            }

            this.loading = false;
        },
    },
    methods: {
        switchState() {
            this.currentState = 3 - this.currentState;
        },

        /**
         * Updates the product quantity in the cart, then refreshes the page
         *
         * @param {string} product
         * @param {string|null} color
         * @param {number} quantity
         */
        async updateQuantity({ product, color, quantity }) {
            await updateCartItemQuantity(this.cart, product, color, quantity);

            this.updateShoppingCartHeader();
        },

        /**
         * Removes a product from the cart, then refreshes the page
         *
         * @param {string} product
         * @param {string|null} color
         */
        async removeFromCart({ product, color }) {
            await removeItemFromCart(this.cart, product, color);

            this.updateShoppingCartHeader();
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component.scss';

.component :global {
    .content {
        @include light-component;
    }
}
</style>
