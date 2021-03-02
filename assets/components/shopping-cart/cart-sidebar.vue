<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
        <h5 class="text-center">
            Featured Product!
        </h5>

        <img
            class="d-block"
            :src="featuredProduct.image"
            :alt="featuredProduct.name"
        >

        <div class="pt-3">
            <h6>
                {{ featuredProduct.name }}

                ${{ price }}
            </h6>

            <cart-add-controls
                :product="featuredProduct"
                :add-to-cart-loading="addToCartLoading"
                :add-to-cart-success="addToCartSuccess"
                :allow-add-to-cart="allowAddToCart"
                add-button-text="+"
                @add-to-cart="$emit('add-to-cart', $event)"
            />
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import CartAddControls from '@/components/product-show/cart-add-controls';

export default {
    name: 'ShoppingCartSidebar',
    components: {
        CartAddControls,
    },
    props: {
        featuredProduct: {
            type: Object,
            required: true,
        },
        allowAddToCart: {
            type: Boolean,
            required: true,
        },
        addToCartLoading: {
            type: Boolean,
            required: true,
        },
        addToCartSuccess: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        price() {
            return formatPrice(this.featuredProduct.price);
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component.scss';

.component :global {
    @include light-component;

    img {
        max-width:100%;
        max-height:100%;
    }
}
</style>
