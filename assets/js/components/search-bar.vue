<template>
    <div :class="$style.component">
        <input
            v-model="searchTerm"
            class="form-control"
            placeholder="Search products..."
            type="text"
        >

        <span
            v-show="searchTerm !== ''"
            :class="$style.erase"
            @click="eraseSearchTerm"
        >
            X
        </span>
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
    methods: {
        /**
         * Resets the search term
         */
        eraseSearchTerm() {
            this.searchTerm = '';
        },
    },
};
</script>

<style lang="scss" module>
.component {
    width: 400px;
}
</style>
