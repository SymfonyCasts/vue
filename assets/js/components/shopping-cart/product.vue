<template>
    <div
        :class="$style.component"
    >
        <span :class="$style['product-name']">{{ product.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartProduct',
    props: {
        product: {
            type: Object,
            require: true,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>

</style>