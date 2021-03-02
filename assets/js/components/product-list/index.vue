<template>
    <div class="row">
        <div
            v-for="product in products"
            :key="product['@id']"
            class="col-xs-12 col-6 mb-2 pb-2"
        >
            {{ product.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
};
</script>
