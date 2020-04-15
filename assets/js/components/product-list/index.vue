<template>
    <div :class="$style.component">
        <loading v-show="products.length === 0" />

        <product-card
            v-for="product in products"
            v-show="products.length > 0"
            :key="product['@id']"
            :item="product"
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

<style lang="scss" module>
.component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 25px;
}
</style>
