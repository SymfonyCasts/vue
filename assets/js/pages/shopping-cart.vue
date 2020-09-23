<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="pb-3">
                    <title-component text="Shopping Cart" />
                </div>

                <div class="content">
                    <div
                        v-show="loading"
                        class="p-3"
                    >
                        <loading />
                    </div>

                    <div
                        v-show="!loading"
                        class="p-3"
                    >
                        <div
                            v-for="(cartItem, index) in items"
                            :key="index"
                            class="p-3"
                        >
                            {{ cartItem.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFullShoppingCart } from '@/services/cart-service';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';
import shoppingCartMixin from '@/mixins/get-shopping-cart';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        TitleComponent,
    },
    mixins: [shoppingCartMixin],
    data() {
        return {
            colors: {},
            items: [],
            loading: false,
        };
    },
    watch: {
        async cart() {
            this.loading = true;
            this.items = [];

            if (!this.cart.items.length) {
                this.loading = false;
                return;
            }

            try {
                this.items = await getFullShoppingCart(this.cart);
            } catch (e) {
                this.loading = false;
            }

            this.loading = false;
        },
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
