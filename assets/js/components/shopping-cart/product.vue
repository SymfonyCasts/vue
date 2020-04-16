<template>
    <div
        :class="$style.component"
    >
        <span :class="$style['product-name']">{{ product.name }}</span>
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
}
</style>
