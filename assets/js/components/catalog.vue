<template>
    <div>
        <div class="row">
            <h2 class="p-3">
                Products
            </h2>
        </div>

        <product-list :products="products" />

        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LegendComponent from '@/components/legend';
import ProductList from '@/components/product-list';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
        ProductList,
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

        const response = await axios({
            method: 'get',
            url,
        });

        this.products = response.data['hydra:member'];
    },
};
</script>
