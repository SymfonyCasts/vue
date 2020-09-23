<template>
    <div>
        <div
            v-show="!items.length"
            class="p-3"
        >
            Sorry! You haven't bought anything yet!
        </div>

        <div v-show="items.length">
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
                :key="item['@id']"
                :cart="cart"
                :cart-item="item"
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
        cart: {
            type: Object,
            required: true,
        },
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
            return formatPrice(
                this.items.reduce((acc, item) => (acc + (item.price * item.qty)), 0),
            );
        },
    },
};
</script>
