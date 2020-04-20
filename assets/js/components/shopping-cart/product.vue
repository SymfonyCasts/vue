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
};
</script>

<style scoped>

</style>