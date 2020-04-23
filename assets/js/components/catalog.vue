<template>
    <div>
        <div class="row">
            <h2 class="p-3">
                Products
            </h2>
        </div>

        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LegendComponent from '@/components/legend';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
    },
    data: () => ({
        products: [],
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
    async mounted() {
        this.products = [];

        const response = await axios({
            method: 'get',
            url: '/api/products',
        });

        this.products = response.data['hydra:member'];
    },
};
</script>
