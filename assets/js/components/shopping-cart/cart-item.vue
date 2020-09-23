<template>
    <div :class="[$style.component, 'row', 'p-3', 'align-items-center']">
        <div class="col-3">
            <div class="row">
                <span class="col">
                    {{ cartItem.name }}
                </span>

                <span class="col-2">
                    <span
                        class="color-square"
                        :style="{
                            backgroundColor: `#${cartItem.hexColor}`
                        }"
                    />
                </span>
            </div>
        </div>

        <div class="col-3">
            <input
                v-model.number="cartItem.qty"
                class="form-control"
                type="number"
                min="1"
                @input="updateQty(cartItem['@id'], cartItem.colorId, cartItem.qty)"
            >
        </div>

        <div class="col-3">
            ${{ totalPrice }}
        </div>

        <div class="col-3">
            <button class="btn btn-info btn-sm">
                Remove
            </button>
        </div>
    </div>
</template>

<script>
import { updateCartItemQuantity } from '@/services/cart-service';
import formatPrice from '@/helpers/format-price';

export default {
    name: 'ShoppingCartItem',
    props: {
        cart: {
            type: Object,
            required: true,
        },
        cartItem: {
            type: Object,
            required: true,
        },
    },
    computed: {
        totalPrice() {
            return formatPrice(this.product.price * this.product.qty);
        },
    },
    methods: {
        /**
         * Updates the product quantity in the cart, then refreshes the page
         *
         * @param {string} productId
         * @param {string|null} colorId
         * @param {number} qty
         */
        async updateQty(productId, colorId, qty) {
            await updateCartItemQuantity(this.cart, productId, colorId, qty);
            window.location.reload();
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/variables/colors.scss';

.component :global {
    border-bottom: 1px solid $light-component-border;

    span.color-square {
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 4px;
    }

    input {
        width: 60px;
    }
}
</style>
