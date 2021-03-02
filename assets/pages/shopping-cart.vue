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
                />
            </aside>

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />

                <div class="content p-3">
                    <loading v-show="completeCart === null" />

                    <shopping-cart-list
                        v-if="completeCart"
                        :items="completeCart.items"
                        @updateQuantity="updateQuantity"
                        @removeFromCart="removeProductFromCart(
                            $event.productId,
                            $event.colorId,
                        )"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchColors } from '@/services/colors-service';
import { fetchFeaturedProducts, fetchProductsById } from '@/services/products-service';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import TitleComponent from '@/components/title';
import ShoppingCartList from '@/components/shopping-cart';
import Loading from '@/components/loading';
import CartSidebar from '@/components/shopping-cart/cart-sidebar';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        ShoppingCartList,
        TitleComponent,
        CartSidebar,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
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
                items: completeItems,
            };
        },
    },
    watch: {
        async cart() {
            this.loadProducts();
        },
    },
    async created() {
        this.loadFeaturedProduct();
        this.colors = (await fetchColors()).data['hydra:member'];
    },
    methods: {
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
}
</style>
