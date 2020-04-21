<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="row">
                    <div :class="$style['top-bar']">
                        <title-component text="Shopping Cart" />
                    </div>

                    <div :class="$style.content">
                        <loading v-show="loading" />

                        <div
                            v-show="!loading && !products.length"
                            :class="$style['product-list']"
                        >
                            <div :class="$style['product-message']">
                                Sorry! You haven't bought anything yet!
                            </div>
                        </div>

                        <div
                            v-show="!loading && products.length"
                            :class="$style['product-list']"
                        >
                            <shopping-cart-product
                                v-for="product in products"
                                :key="product['@id']"
                                :product="product"
                            />

                            <div :class="$style['product-row']">
                                <span>Total: <strong>${{ totalPrice }}</strong></span>
                            </div>
                        </div>

                        <shopping-cart-actions v-show="!loading" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart';
import colorsService from '@/services/colors';
import formatPrice from '@/helpers/format-price';
import productsService from '@/services/products';
import Loading from '@/components/loading';
import ShoppingCartActions from '@/components/shopping-cart/actions';
import ShoppingCartProduct from '@/components/shopping-cart/product';
import TitleComponent from '@/components/title';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        ShoppingCartActions,
        ShoppingCartProduct,
        TitleComponent,
    },
    data: () => ({
        colors: {},
        loading: true,
        products: [],
    }),
    computed: {
        /**
         * Returns the formatted total price of the list
         *
         * @return {string}
         */
        totalPrice() {
            let total = 0;

            this.products.forEach((product) => {
                total += product.price * product.qty;
            });

            return formatPrice(total);
        },
    },
    async created() {
        const itemsInCart = cartService.getItems();

        if (itemsInCart.length) {
            const productIds = itemsInCart.map((item) => (Number(item.productId.split('/').pop())));
            let colorsResponse = null;
            let productsResponse = null;

            // Retrieve both colors and products from the server
            try {
                [colorsResponse, productsResponse] = await Promise.all([
                    colorsService.getColors(),
                    productsService.getProductsById(productIds),
                ]);
            } catch (e) {
                this.loading = false;
            }

            // Map all colors to our object dictionary by @id
            if (colorsResponse !== null) {
                colorsResponse.data['hydra:member'].forEach((color) => {
                    this.colors[color['@id']] = color;
                });
            }

            // Assign our returned products to our products array,
            // applying the proper colorId, hexColor and qty values
            if (productsResponse !== null) {
                this.products = productsResponse.data['hydra:member'].map((product) => {
                    const productInCart = itemsInCart.find((item) => (item.productId === product['@id']));

                    return {
                        ...product,
                        colorId: productInCart.colorId,
                        hexColor: productInCart.colorId ? this.colors[productInCart.colorId].hexColor : 'fff',
                        qty: productInCart.qty,
                    };
                });
            }
        }

        this.loading = false;
    },
};
</script>

<style lang="scss" module>
@import '~styles/top-bar.scss';
@import '~styles/components/light-component.scss';

.content {
    @include light-component;
    margin-top: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 900px;

    .product-list {
        margin-bottom: 25px;
        display: flex;
        flex-direction: column;

        .product-message {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid $light-component-border;
        }

        .product-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid $light-component-border;
            justify-content: flex-end;

            span {
                margin-right: 20px;
            }
        }
    }
}
</style>
