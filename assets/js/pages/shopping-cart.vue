<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="pb-3">
                    <title-component text="Shopping Cart" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';
import shoppingCartMixin from '@/mixins/get-shopping-cart';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
    },
    mixins: [shoppingCartMixin],
};
</script>

<style lang="scss" module>
</style>
