<template>
    <div>
        // Product goes here
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: {
        currentProductId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
    },
};
</script>
