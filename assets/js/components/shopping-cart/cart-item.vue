<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-12">
            {{ cartItem.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartItem',
};
</script>

<style scoped>

</style>
