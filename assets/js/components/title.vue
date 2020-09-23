<template>
    <div :class="$style.component">
        <h1>
            Products
        </h1>
    </div>
</template>

<script>
export default {
    name: 'Title',
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
};
</script>

<style lang="scss" module>
.component {
    h1 {
        font-size: 1.7rem;
    }
}
</style>
