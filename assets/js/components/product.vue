<template>
    <div class="row">
        <div :class="$style['top-bar']">
            <title-component />
        </div>

        TODO: Show product here!
    </div>
</template>

<script>
import productsService from '@/services/products';
import TitleComponent from '@/components/title';

export default {
    name: 'Product',
    components: {
        TitleComponent,
    },
    props: {
        currentCategoryId: {
            type: Number,
            default: null,
        },
        currentProductId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        product: null,
        loading: true,
    }),
    async created() {
        try {
            const response = await productsService.getProduct(this.currentProductId);

            this.product = response.data;
            this.loading = false;
        } catch (e) {
            this.loading = false;
        }
    },
};
</script>

<style lang="scss" module>
@import '~styles/top-bar.scss';
</style>
