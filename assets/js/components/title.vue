<template>
    <div :class="$style.component">
        <h1>
            {{ text }}
        </h1>
    </div>
</template>

<script>
export default {
    name: 'Title',
    props: {
        text: {
            type: String,
            required: true,
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
