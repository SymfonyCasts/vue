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
    }),
};
</script>

<style lang="scss" module>
@import '~styles/variables/colors.scss';

.component {
    width: 400px;
}
</style>
