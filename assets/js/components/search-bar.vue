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
        };
    },
    methods: {
        onInput() {
            setTimeout(() => {
                this.$emit('search-products', { term: this.searchTerm });
            }, 200);
        },
    },
};
</script>
