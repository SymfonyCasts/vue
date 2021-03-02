<template>
    <div :class="[$style.component, 'row', 'p-3']">
        {{ item.product.name }}
    </div>
</template>

<script>
    export default {
        name: "cart-item.vue"
    }
</script>

<style scoped>

</style>
