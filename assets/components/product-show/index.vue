<template>
    <div>
        <loading v-if="loading" />

        <div v-if="product">
            <title-component :text="product.name" />
        </div>

        <div
            v-if="product"
            :class="$style.product"
            class="row"
        >
            <div class="col-4 pt-3">
                <img
                    class="d-block"
                    :src="product.image"
                    :alt="product.name"
                >

                <div class="p-2">
                    <small>brought to you by </small>

                    <small
                        class="d-inline"
                        v-text="product.brand"
                    />
                </div>
            </div>

            <div class="col-8 p-3">
                <div v-text="product.description" />

                <div class="row mt-4 align-items-center">
                    <div class="col-4">
                        Price: <strong>${{ price }}</strong>
                    </div>

                    <div class="col-8 p-3">
                        <cart-add-controls
                            v-if="product"
                            :product="product"
                            :allow-add-to-cart="cart !== null"
                            :add-to-cart-loading="addToCartLoading"
                            :add-to-cart-success="addToCartSuccess"
                            @add-to-cart="addToCart"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import { fetchOneProduct } from '@/services/products-service';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import CartAddControls from './cart-add-controls';

export default {
    name: 'ProductShow',
    components: {
        Loading,
        TitleComponent,
        CartAddControls,
    },
    mixins: [ShoppingCartMixin],
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: null,
            loading: true,
        };
    },
    computed: {
        /**
         * Returns a formatted price for the product
         * @returns {string}
         */
        price() {
            return formatPrice(this.product.price);
        },
    },
    async created() {
        try {
            this.product = (await fetchOneProduct(this.productId)).data;
        } finally {
            this.loading = false;
        }
    },
    methods: {
        addToCart({ quantity, selectedColorId }) {
            this.addProductToCart(this.product, selectedColorId, quantity);
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.product {
    @include light-component;

    img {
        max-width:100%;
        max-height:100%;
    }
}
</style>
