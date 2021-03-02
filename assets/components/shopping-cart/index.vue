<template>
    <div>
        <div v-if="items.length === 0">
            Your cart is empty! Get to shopping!
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartList',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
