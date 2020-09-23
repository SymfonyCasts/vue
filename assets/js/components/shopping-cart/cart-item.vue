<template>
    <div :class="[$style.component, 'row', 'p-3']">
        <div class="col-3">
            <div class="row">
                <span class="col">
                    {{ cartItem.name }}
                </span>

                <span class="col-2">
                    <span
                        class="color-square"
                    />
                </span>
            </div>
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

.component :global {
    border-bottom: 1px solid $light-component-border;

    span.color-square {
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 4px;
    }
}
</style>
