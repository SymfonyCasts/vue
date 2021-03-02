<template>
    <div class="row">
        <div class="col-12">
            <div class="mt-4">
                <loading v-show="products.length === 0" />
            </div>
        </div>

        <product-card
            v-for="product in products"
            v-show="products.length > 0"
            :key="product['@id']"
            :product="product"
        />
    </div>
</template>

<script>
import Loading from '@/components/loading';
import ProductCard from '@/components/product-list/product-card';

export default {
    name: 'ProductList',
    components: {
        Loading,
        ProductCard,
    },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
    },
};
</script>
