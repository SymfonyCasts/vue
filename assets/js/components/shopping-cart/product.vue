<template>
    <div
        :class="$style.component"
    >
        <span :class="$style['product-name']">{{ product.name }}</span>

        <span
            :class="$style['color-square']"
            :style="{
                backgroundColor: `#${product.hexColor}`
            }"
        />

        <input
            v-model.number="product.qty"
            class="form-control"
            type="number"
            min="1"
        >

        <button
            class="btn btn-info btn-sm"
        >
            Update
        </button>

        <button
            class="btn btn-info btn-sm"
        >
            Remove
        </button>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartProduct',
    props: {
        product: {
            type: Object,
            require: true,
            default: () => ({}),
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/variables/colors.scss';

.component {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid $light-component-border;

    span, input, button {
        margin-right: 20px;
    }

    span.color-square {
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 4px;
    }

    input {
        width: 60px;
    }

    .product-name {
        flex-grow: 1;
    }
}
</style>
