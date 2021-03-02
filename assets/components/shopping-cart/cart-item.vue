<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-2">
            {{ item.product.name }}
        </div>

        <div class="col-1">
            <span
                class="color-square"
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
}
</style>
