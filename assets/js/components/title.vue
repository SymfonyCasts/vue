<template>
    <div :class="$style.component">
        <h6 class="ml-2">
            {{ category.name }}
        </h6>
    </div>
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

<style lang="scss" module>
.component {
    h6 {
        font-size: 1.7rem;
        margin-left: -6px !important;
    }
}
</style>
