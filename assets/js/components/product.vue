<template>
    <div>
        <div class="pb-3">
            <title-component :text="product.name" />
        </div>

        <div
            :class="$style.product"
        >
            <div class="p-3">
                <loading v-show="loading" />
            </div>

            <div class="row">
                <div
                    v-show="!loading"
                    class="col-8"
                >
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

                <div
                    v-show="!loading"
                    class="col-4"
                >
                    <div class="p-3 row">
                        <p v-text="product.description" />

                        <p>Price: <strong>${{ price }}</strong></p>
                    </div>

                    <div class="p-3 row align-items-center">
                        <color-selector
                            v-show="product.colors.length !== 0"
                            @color-selected="updateSelectedColor"
                        />

                        <div class="col-3">
                            <input
                                v-model.number="qty"
                                class="form-control"
                                type="number"
                                min="1"
                            >
                        </div>

                        <button
                            class="btn btn-info btn-sm"
                            @click="addToCart"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import { getProduct } from '@/services/products-service';
import ColorSelector from '@/components/color-selector';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';

export default {
    name: 'Product',
    components: {
        ColorSelector,
        Loading,
        TitleComponent,
    },
    props: {
        currentProductId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            product: {
                name: '', image: '', price: 0, colors: [],
            },
            selectedColorId: null,
            qty: 1,
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
        let response;

        try {
            response = await getProduct(this.currentProductId);

            this.loading = false;
        } catch (e) {
            this.loading = false;

            return;
        }

        this.product = response.data;
    },
    methods: {
        addToCart() {
            // TODO
        },

        /**
         * Update the selectedColorId index accordingly
         *
         * @params {string} colorId
         */
        updateSelectedColor(colorId) {
            this.selectedColorId = colorId;
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.product {
    @include light-component;
}
</style>
