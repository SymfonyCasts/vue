<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3">
                <cart-sidebar
                    v-if="featuredProduct"
                    :featured-product="featuredProduct"
                    :allow-add-to-cart="cart !== null"
                    :add-to-cart-success="addToCartSuccess"
                    :add-to-cart-loading="addToCartLoading"
                    @add-to-cart="addProductToCart(
                        featuredProduct,
                        $event.selectedColorId,
                        $event.quantity
                    )"
                />
            </aside>

            <div class="col-xs-12 col-lg-9">
                <transition
                    name="fade"
                    mode="out-in"
                >
                    <title-component
                        :key="currentState"
                        :text="pageTitle"
                    />
                </transition>

                <div class="content p-3">
                    <loading v-show="completeCart === null" />

                    <transition
                        name="fade"
                        mode="out-in"
                    >
                        <shopping-cart-list
                            v-if="completeCart && currentState === 'cart'"
                            :items="completeCart.items"
                            @updateQuantity="updateQuantity"
                            @removeFromCart="removeProductFromCart(
                                $event.productId,
                                $event.colorId,
                            )"
                        />

                        <checkout-form
                            v-if="completeCart && currentState === 'checkout'"
                            :cart="cart"
                        />
                    </transition>

                    <div
                        v-if="completeCart && completeCart.items.length > 0"
                    >
                        <button
                            class="btn btn-primary"
                            @click="switchState"
                        >
                            {{ buttonText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchColors } from '@/services/colors-service';
import { fetchFeaturedProducts, fetchProductsById } from '@/services/products-service';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import CheckoutForm from '@/components/checkout';
import TitleComponent from '@/components/title';
import ShoppingCartList from '@/components/shopping-cart';
import Loading from '@/components/loading';
import CartSidebar from '@/components/shopping-cart/cart-sidebar';

export default {
    name: 'ShoppingCart',
    components: {
        CheckoutForm,
        Loading,
        ShoppingCartList,
        TitleComponent,
        CartSidebar,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            currentState: 'cart',
            products: null,
            colors: null,
            featuredProduct: null,
        };
    },
    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) {
                return null;
            }

            const completeItems = this.cart.items.map((cartItem) => {
                const product = this.products.find((productItem) => productItem['@id'] === cartItem.product);
                const color = this.colors.find((colorItem) => colorItem['@id'] === cartItem.color);

                return {
                    id: `${cartItem.product}_${cartItem.color ? cartItem.color : 'none'}`,
                    product,
                    color,
                    quantity: cartItem.quantity,
                };
            });

            return {
                // filter out missing products: they may still be loading
                items: completeItems.filter((item) => item.product),
            };
        },

        pageTitle() {
            return this.currentState === 'cart'
                ? 'Shopping Cart'
                : 'Checkout';
        },
        buttonText() {
            return this.currentState === 'cart'
                ? 'Check Out >>'
                : '<< Back';
        },
    },
    watch: {
        'cart.items.length': function watchCartItemsLength() {
            this.loadProducts();
        },
    },
    async created() {
        this.loadFeaturedProduct();
        this.colors = (await fetchColors()).data['hydra:member'];
    },
    methods: {
        switchState() {
            this.currentState = this.currentState === 'cart' ? 'checkout' : 'cart';
        },
        async loadProducts() {
            const productIds = this.cart.items.map((item) => item.product);

            const productsResponse = await fetchProductsById(productIds);
            this.products = productsResponse.data['hydra:member'];
        },
        updateQuantity({ productId, colorId, quantity }) {
            this.updateProductQuantity(productId, colorId, quantity);
        },

        async loadFeaturedProduct() {
            const featuredProducts = (await fetchFeaturedProducts()).data['hydra:member'];

            if (featuredProducts.length === 0) {
                return;
            }

            [this.featuredProduct] = featuredProducts;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
}
</style>
