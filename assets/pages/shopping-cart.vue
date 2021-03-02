<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />

                <div class="content p-3">
                    TODO - show the cart!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component.scss';

.component :global {
    .content {
        @include light-component;
    }
}
</style>
