<template>
    <div>
        <title-component
            :current-category-id="currentCategoryId"
            :categories="categories"
            :class="$style.title"
        />

        <product-list
            :products="products"
            :loading="loading"
        />

        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LegendComponent from '@/components/legend';
import ProductList from '@/components/product-list';
import TitleComponent from '@/components/title';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
        ProductList,
        TitleComponent,
    },
    props: {
        currentCategoryId: {
            type: Number,
            default: null,
        },
    },
    data: () => ({
        products: [],
        loading: true,
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
    async created() {
        const url = this.currentCategoryId
            ? `/api/products?category=${this.currentCategoryId}`
            : '/api/products';

        this.products = [];
        this.loading = true;

        try {
            const response = await axios({
                method: 'get',
                url,
            });

            this.loading = false;
            this.products = response.data['hydra:member'];
        } catch (e) {
            this.loading = false;
        }
    },
};
</script>

<style lang="scss" module>
.title {
    margin-left: 10px;
}
</style>
