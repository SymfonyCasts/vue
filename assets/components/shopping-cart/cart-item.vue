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
            />
        </div>
    </div>
</template>

<script>
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
