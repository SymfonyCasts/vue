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

.component {
    border-bottom: 1px solid $light-component-border;
}
</style>
