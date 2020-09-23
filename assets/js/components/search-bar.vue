<template>
    <div>
        <input
            v-model="searchTerm"
            class="form-control"
            placeholder="Search products..."
            type="search"
            @input="onInput"
        >
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchTerm: '',
            searchTimeout: null,
        };
    },
    methods: {
        onInput() {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.$emit('search-products', { term: this.searchTerm });
                this.searchTimeout = null;
            }, 200);
        },
    },
};
</script>
