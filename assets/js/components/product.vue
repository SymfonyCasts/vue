<template>
    <div class="row">
        <div :class="$style['top-bar']">
            <title-component :text="product.name" />
        </div>

        <div :class="$style.content">
            <loading v-show="loading" />

            <div
                v-show="!loading"
                :class="$style.product"
            >
                <div :class="$style['img-wrapper']">
                    <img
                        class="d-block"
                        :src="product.image"
                        :alt="product.name"
                    >

                    <small>brought to you by </small>

                    <small
                        class="d-inline"
                        v-text="product.brand"
                    />
                </div>

                <div :class="$style['description-wrapper']">
                    <div :class="$style.description">
                        <p v-text="product.description" />

                        <p>Price: <strong>$ {{ price }}</strong></p>
                    </div>

                    <div :class="$style['actions-wrapper']">
                        <color-selector
                            v-show="product.colors.length !== 0"
                            @color-selected="updateSelectedColor"
                        />

                        <input
                            v-model.number="qty"
                            class="form-control"
                            type="number"
                            min="1"
                        >

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
import productsService from '@/services/products';
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
        currentCategoryId: {
            type: Number,
            default: null,
        },
        currentProductId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        product: { name: '', price: 0, colors: [] },
        selectedColorId: null,
        qty: 1,
        loading: true,
    }),
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
            const response = await productsService.getProduct(this.currentProductId);

            this.product = response.data;
            this.loading = false;
        } catch (e) {
            this.loading = false;
        }
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
@import '~styles/top-bar.scss';
@import '~styles/components/light-component';

.content {
    margin-top: 25px;

    .product {
        @include light-component;
        padding: 20px;
        display: flex;
        flex-direction: row;

        .img-wrapper {
            margin: 0 20px 0 0;

            img {
                width: 400px;
                padding-bottom: 20px;
                margin-bottom: 20px;
                border-bottom: 1px solid $light-component-border;
            }
        }

        .description-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .description {
                height: 420px;
                width: 500px;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid $light-component-border;
            }

            .actions-wrapper {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                height: 30px;

                input {
                    width: 80px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
