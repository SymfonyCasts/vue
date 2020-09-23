<template>
    <div>
        <input
            :value="searchTerm"
            class="form-control"
            placeholder="Search products..."
            type="search"
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
};
</script>
