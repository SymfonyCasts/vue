<template>
    <h4 :class="$style.component">
        Loading...
    </h4>
</template>

<script>
export default {
    name: 'Loading',
};
</script>

<style lang="scss" module>
.component {
    background: url('../images/loading.gif') no-repeat left center;
    padding: 0 0 4px 50px;
}
</style>
