<template>
    <div class="col-xs-12 col-6 mb-2 pb-2">
        <div :class="$style['product-box']">
            <div :class="$style.top">
                <div :class="$style.image">
                    <a :href="productUrl">
                        <img
                            :alt="item.name"
                            :src="item.image"
                            class="d-block mb-2"
                        >
                    </a>

                    <h3 class="mb-2 px-2">
                        <a
                            :href="productUrl"
                            v-text="item.name"
                        />
                    </h3>
                </div>

                <div class="p-2 my-3 d-md-flex justify-content-between">
                    <p class="p-0 d-inline">
                        <strong>$ {{ price }}</strong>
                    </p>

                    <button
                        class="btn btn-info btn-sm"
                        @click="goToProduct()"
                    >
                        View Product
                    </button>
                </div>
            </div>

            <div class="p-2">
                <small>brought to you by {{ item.brand }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';

export default {
    name: 'ProductCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        /**
         * Returns a formatted price for the product
         * @returns {string}
         */
        price() {
            return formatPrice(this.item.price);
        },

        /**
         * Returns the URL for the product
         * @returns {string}
         */
        productUrl() {
            return `/product/${this.item.id}`;
        },
    },
    methods: {
        /**
         * Goes to the URL of the product
         */
        goToProduct() {
            window.location = this.productUrl;
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.product-box {
    border: 1px solid #efefee;
    box-shadow: 0px 0px 7px 4px #efefee;
    border-radius: 5px;

    .top {
        border-bottom: 1px solid $light-component-border;
        }
    .image {
        img {
        width: 100%;
        height: auto;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        }
        
        h3 {
            font-size: 1.2rem;
            font-weight: bold;
        }
        }
    }
</style>
