<template>
    <div class="col-xs-12 col-6 mb-2 pb-2">
        {{ product.name }}
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>
