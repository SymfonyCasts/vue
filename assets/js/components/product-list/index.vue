<template>
    <div :class="$style.component">
        <div
            v-for="product in products"
            :key="product['@id']"
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

<style lang="scss" module>
.component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 25px;
}
</style>
