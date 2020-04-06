<template>
    <div>
        <div class="row">
            <div :class="$style['top-bar']">
                <title-component
                    :current-category-id="currentCategoryId"
                    :categories="categories"
                />

                <search-bar @search-products="onSearchProducts" />
            </div>

            <product-list
                :products="filteredProducts"
                :loading="loading"
            />
        </div>


        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LegendComponent from '@/components/legend';
import ProductList from '@/components/product-list';
import SearchBar from '@/components/search-bar';
import TitleComponent from '@/components/title';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
        ProductList,
        SearchBar,
        TitleComponent,
    },
    props: {
        currentCategoryId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        products: [],
        searchTerm: '',
        loading: true,
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
    computed: {
        filteredProducts() {
            return this.searchTerm
                ? this.products
                    .filter((product) => (
                        product.name.toLowerCase().search(this.searchTerm.toLowerCase()) !== -1))
                : this.products;
        },
    },
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
    methods: {
        onSearchProducts(event) {
            this.searchTerm = event.term;
        },
    },
};
</script>

<style lang="scss" module>
    @import '~styles/top-bar.scss';
</style>
