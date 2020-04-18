<template>
    <div :class="$style.component">
        <input
            class="form-control"
            placeholder="Search products..."
            type="text"
        >
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
};
</script>

<style lang="scss" module>
.component {
    width: 400px;
}
</style>
