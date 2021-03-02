<template>
    <div>
        I'd ❤️ to see Product {{ productId }} here!
    </div>
</template>

<script>
export default {
    name: 'ProductShow',
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
};
</script>
