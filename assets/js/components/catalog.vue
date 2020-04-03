<template>
    <div>
        <div class="row">
            <h2 class="p-3">
                Products
            </h2>
        </div>

        <product-list
            :products="products"
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

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
        ProductList,
    },
    data: () => ({
        products: [],
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
    async created() {
        this.products = [];

        const response = await axios({
            method: 'get',
            url: '/api/products',
        });

        this.products = response.data['hydra:member'];
    },
};
</script>
