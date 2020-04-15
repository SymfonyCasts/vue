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
                :products="products"
                :loading="loading"
            />
        </div>

        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import productsService from '@/services/products';
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
        category: {
            id: null,
            name: 'All Products',
        },
        products: [],
        searchTerm: '',
        loading: true,
        searchTimeout: null,
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
    async created() {
        this.getProducts('');

        if (this.currentCategoryId !== null) {
            this.category = this.categories.find((cat) => (cat.id === this.currentCategoryId));
        }
    },
    methods: {
        /**
         * Handles a change in the searchTerm provided by the search bar and fetches new products
         *
         * @param {string} term
         */
        onSearchProducts({ term }) {
            if (this.searchTimeout !== null) {
                window.clearTimeout(this.searchTimeout);
                this.searchTimeout = null;
            }

            this.searchTimeout = window.setTimeout(() => {
                this.getProducts(term);
            }, 200);
        },

        /**
         * Fetches products from the database according to current category and search term
         *
         * @param {string} searchTerm
         */
        async getProducts(searchTerm) {
            this.products = [];
            this.loading = true;

            try {
                const response = await productsService
                    .fetchProducts(this.currentCategoryId, searchTerm);

                this.loading = false;
                this.products = response.data['hydra:member'];
            } catch (e) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/top-bar.scss';
</style>
