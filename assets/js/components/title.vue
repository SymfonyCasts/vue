<template>
    <h6>{{ category.name }}</h6>
</template>

<script>
export default {
    name: 'Title',
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
    computed: {
        category() {
            if (typeof this.currentCategoryId === 'undefined') {
                return {
                    id: null,
                    name: 'All Products',
                };
            }

            return this.categories.find((cat) => (cat.id === this.currentCategoryId));
        },
    },
};
</script>
