<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-2">
            {{ item.product.name }}
        </div>

        <div class="col-1">
            <span
                class="color-square"
                :style="{
                    backgroundColor: `#${hexColor}`
                }"
            />
        </div>

        <div class="col-3">
            <input
                :value="item.quantity"
                class="form-control"
                type="number"
                min="1"
                @input="updateQuantity"
            />
        </div>

        <div class="col-3">
            ${{ totalPrice }}
        </div>

        <div class="col-3">
            <button
                class="btn btn-info btn-sm"
                @click="$emit('removeFromCart')"
            >
                Remove
            </button>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';

export default {
    name: 'ShoppingCartItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        hexColor() {
            return this.item.color ? this.item.color.hexColor : 'fff';
        },
        totalPrice() {
            return formatPrice(this.item.product.price * this.item.quantity);
        },
    },
    methods: {
        updateQuantity(event) {
            this.$emit('updateQuantity', {
                quantity: parseFloat(event.target.value),
            });
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/variables/colors.scss';

.component :global {
    border-bottom: 1px solid $light-component-border;

    .color-square {
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
