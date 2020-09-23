<template>
    <h1>Hello {{ firstName }}! Is this cooler?</h1>
</template>

<script>
export default {
    name: 'Products',
    data() {
        return {
            firstName: 'Ryan',
        };
    },
};
</script>
