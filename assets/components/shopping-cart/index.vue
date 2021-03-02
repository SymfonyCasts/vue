<template>
    <div>
        <div v-if="items.length === 0">
            Your cart is empty! Get to shopping!
        </div>

        <div v-if="items.length">
            <div class="row p-3">
                <div class="col-3">
                    Item Name
                </div>
                <div class="col-3">
                    Quantity
                </div>
                <div class="col-3">
                    Price
                </div>
                <div class="col-3" />
            </div>

            <shopping-cart-item
                v-for="item in items"
                :key="item.id"
                :item="item"
            />

            <div class="p-3">
                Total: <strong>$ // TODO</strong>
            </div>
        </div>
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
