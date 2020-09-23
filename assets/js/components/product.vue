<template>
    <div>
        I'd <3 to see a Product here!
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: {
        currentProductId: {
            type: String,
            default: null,
        },
    },
};
</script>
