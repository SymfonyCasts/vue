<template>
    <div :class="$style.component">
        <input
            v-model="searchTerm"
            class="form-control"
            placeholder="Search products..."
            type="text"
        >
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data: () => ({
        searchTerm: '',
        searchTimeout: null,
    }),
    watch: {
        searchTerm(newTerm) {
            if (this.searchTimeout !== null) {
                window.clearTimeout(this.searchTimeout);
                this.searchTimeout = null;
            }

            this.searchTimeout = window.setTimeout(() => {
                this.$emit('search-products', { term: newTerm });
            }, 200);
        },
    },
};
</script>

<style lang="scss" module>
.component {
    width: 400px;
}
</style>
