<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />

                <div class="content p-3">
                    <loading v-show="completeCart === null" />
                    <div v-if="completeCart !== null">
                        <div
                            v-for="(cartItem, index) in completeCart.items"
                            :key="index"
                        >
                            {{ cartItem.product.name }} ({{ cartItem.quantity }})
                            {{ cartItem.color ? cartItem.color.hexColor : '' }}
                        </div>

                        <div v-if="completeCart.items.length === 0">
                            Your cart is empty! Get to shopping!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchColors } from '@/services/colors-service';
import { fetchProductsById } from '@/services/products-service';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import TitleComponent from '@/components/title';
import Loading from '@/components/loading';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        TitleComponent,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            products: null,
            colors: null,
        };
    },
    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) {
                return null;
            }

            const completeItems = this.cart.items.map((cartItem) => (
                {
                    product: this.products.find((product) => product['@id'] === cartItem.product),
                    color: this.colors.find((color) => color['@id'] === cartItem.color),
                    quantity: cartItem.quantity,
                }
            ));

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
        this.colors = (await fetchColors()).data['hydra:member'];
    },
    methods: {
        async loadProducts() {
            const productIds = this.cart.items.map((item) => item.product);

            const productsResponse = await fetchProductsById(productIds);
            this.products = productsResponse.data['hydra:member'];
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
