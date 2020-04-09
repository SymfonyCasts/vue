<template>
    <div :class="$style.component">
        <product-card
            v-for="product in products"
            :key="product['@id']"
            :item="product"
        />
    </div>
</template>

<script>
import ProductCard from '@/components/product-list/product-card';

export default {
    name: 'ProductList',
    components: {
        ProductCard,
    },
    props: {
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
