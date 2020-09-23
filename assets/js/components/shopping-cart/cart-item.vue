<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-12">
            {{ cartItem.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartItem',
    props: {
        cartItem: {
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
