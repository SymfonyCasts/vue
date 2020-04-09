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
import ProductList from '@/components/product-list';
import SearchBar from '@/components/search-bar';
import TitleComponent from '@/components/title';
import LegendComponent from '@/components/legend';

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
    async created() {
        this.fetchProducts('');
    },
    methods: {
        /**
         * Fetches products from the database according to current category and search term
         *
         * @param {string} searchTerm
         */
        async fetchProducts(searchTerm) {
            this.products = [];
            this.loading = true;

            try {
                const response = await axios({
                    method: 'get',
                    url: this.generateListingUrl(searchTerm),
                });

                this.loading = false;
                this.products = response.data['hydra:member'];
            } catch (e) {
                this.loading = false;
            }
        },

        /**
         * Generates the URL to call for a list of products by category or search term
         *
         * @param {string} searchTerm
         * @return {string}
         */
        generateListingUrl(searchTerm) {
            let url = '/api/products';

            if (this.currentCategoryId || searchTerm !== '') {
                url += '?';

                if (this.currentCategoryId && searchTerm === '') {
                    url += `category=${this.currentCategoryId}`;
                } else if (!this.currentCategoryId && searchTerm !== '') {
                    url += `name=${searchTerm}`;
                } else {
                    url += `category=${this.currentCategoryId}&name=${searchTerm}`;
                }
            }

            return url;
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/top-bar.scss';
</style>
