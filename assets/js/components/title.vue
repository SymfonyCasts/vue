<template>
    <div :class="$style.component">
        <h1>
            {{ categoryName }}
        </h1>
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
        categoryName() {
            if (this.currentCategoryId === null) {
                return 'All Products';
            }

            return this.categories.find((cat) => (cat.id === this.currentCategoryId)).name;
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
