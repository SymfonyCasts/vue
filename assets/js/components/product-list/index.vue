<template>
    <div :class="$style.component">

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
