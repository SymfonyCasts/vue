<template>
    <div
        :class="$style.component"
    >
        <span :class="$style['product-name']">{{ product.name }}</span>
    </div>
</template>

<script>
    export default {
        name: "product.vue"
    }
</script>

<style scoped>

</style>