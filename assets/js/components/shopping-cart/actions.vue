<template>
    <div
        :class="$style.component"
    >
        <button
            class="btn btn-info btn-sm"
            @click="clearCart"
        >
            Clear Shopping Cart
        </button>

        <button
            class="btn btn-info btn-sm"
            :disabled="!hasProducts"
        >
            Check Out!
        </button>
    </div>
</template>

<script>
import cartService from '@/services/cart';

export default {
    name: 'CheckoutActions',
    props: {
        hasProducts: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    methods: {
        /**
         * Clears the shopping cart and goes to the home page
         */
        clearCart() {
            cartService.clear();

            window.location = '/';
        },
    },
};
</script>

<style lang="scss" module>
.component {
    display: flex;
    justify-content: flex-end;

    button {
        margin-right: 20px;
    }
}
</style>
