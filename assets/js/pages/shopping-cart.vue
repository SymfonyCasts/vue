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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart';
import colorsService from '@/services/colors';
import productsService from '@/services/products';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        TitleComponent,
    },
    data: () => ({
        colors: {},
        loading: true,
        products: [],
    }),
    async created() {
        const itemsInCart = cartService.getItems();
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
        colorsResponse.data['hydra:member'].forEach((color) => {
            this.colors[color['@id']] = color;
        });

        // Assign our returned products to our products array,
        // applying the proper colorId, hexColor and qty values
        this.products = productsResponse.data['hydra:member'].map((product) => {
            const productInCart = itemsInCart.find((item) => (item.productId === product['@id']));

            return {
                ...product,
                colorId: productInCart.colorId,
                hexColor: productInCart.colorId ? this.colors[productInCart.colorId].hexColor : 'fff',
                qty: productInCart.qty,
            };
        });

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
}
</style>
