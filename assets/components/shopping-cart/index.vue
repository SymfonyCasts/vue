<template>
    <div>
        <div v-if="items.length === 0">
            Your cart is empty! Get to shopping!
        </div>

        <shopping-cart-item
            v-for="(item, index) in items"
            :key="index"
            :item="item"
        />
    </div>
</template>

<script>
import ShoppingCartItem from '@/components/shopping-cart/cart-item';

export default {
    name: 'ShoppingCartList',
    components: {
        ShoppingCartItem,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
