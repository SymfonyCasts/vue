<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                // TODO: List the products in the cart here
            </div>
        </div>
    </div>
</template>

<script>
import shoppingCartMixin from '@/mixins/get-shopping-cart';

export default {
    name: 'ShoppingCart',
    mixins: [shoppingCartMixin],
};
</script>

<style lang="scss" module>
</style>
