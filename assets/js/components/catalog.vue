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
import LegendComponent from './legend';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
    },
    data: () => ({
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
};
</script>
