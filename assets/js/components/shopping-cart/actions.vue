<template>
    <div
        :class="$style.component"
    >
        <button
            class="btn btn-info btn-sm"
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
export default {
    name: 'CheckoutActions',
    props: {
        hasProducts: {
            type: Boolean,
            required: true,
            default: false,
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
