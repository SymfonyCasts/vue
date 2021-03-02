<template>
    <div>
        <div class="row">
            <div class="col-12">
                <title-component
                    :current-category-id="currentCategoryId"
                    :categories="categories"
                />
            </div>
        </div>

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
import { fetchProducts } from '@/services/products-service';
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
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            products: [],
            loading: false,
            legend: 'Shipping takes 10-13 weeks, and products probably won\'t work',
        };
    },
    async created() {
        this.loading = true;

        let response;
        try {
            response = await fetchProducts(this.currentCategoryId);

            this.loading = false;
        } catch (e) {
            this.loading = false;

            return;
        }

        this.products = response.data['hydra:member'];
    },
};
</script>
