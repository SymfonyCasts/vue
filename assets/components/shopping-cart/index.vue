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
                Total: <strong>${{ totalPrice }}</strong>
            </div>
        </div>
    </div>
</template>

<script>
import ShoppingCartItem from '@/components/shopping-cart/cart-item';
import formatPrice from '@/helpers/format-price';

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
    computed: {
        /**
         * Returns the formatted total price of the list
         *
         * @return {string}
         */
        totalPrice() {
            let total = 0;

            this.items.forEach((item) => {
                total += item.product.price * item.quantity;
            });

            return formatPrice(total);
        },
    },
};
</script>
