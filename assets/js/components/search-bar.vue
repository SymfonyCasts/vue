<template>
    <div :class="$style.component">
        <input
            v-model="searchTerm"
            class="form-control"
            placeholder="Search products..."
            type="text"
            @input="onInput"
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
    }),
    watch: {
        searchTerm(newTerm) {
            this.$emit('search-products', { term: newTerm });
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
@import '~styles/variables/colors.scss';

.component {
    width: 400px;

    .erase {
        color: $red-component-border;
        cursor: pointer;
        display: block;
        font-weight: bold;
        height: 20px;
        left: 372px;
        margin: -32px 0 0 0;
        position: relative;
        text-align: center;
        width: 20px;
    }
}
</style>
