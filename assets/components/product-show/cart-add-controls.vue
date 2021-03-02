<template>
    <div :class="[$style.component, 'd-flex', 'align-items-center', 'justify-content-center']">
        <color-selector
            v-if="product.colors.length !== 0"
            @color-selected="updateSelectedColor"
        />

        <input
            v-model.number="quantity"
            class="form-control mx-3"
            type="number"
            min="1"
        >

        <button
            class="btn btn-info btn-sm"
            :disabled="!allowAddToCart"
            @click="addToCart"
        >
            Add to Cart
            <i
                v-show="addToCartLoading"
                class="fas fa-spinner fa-spin"
            />
            <i
                v-show="addToCartSuccess"
                class="fas fa-check"
            />
        </button>
    </div>
</template>

<script>
import ColorSelector from '@/components/color-selector';

export default {
    name: 'ProductCartAddControls',
    components: {
        ColorSelector,
    },
    props: {
        product: {
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
};
</script>

<style lang="scss" module>
.component :global {
    input {
        width: 60px;
    }
}
</style>
