<template>
    <div>
        <div
            v-show="!items.length"
            class="p-3"
        >
            Sorry! You haven't bought anything yet!
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingCartList',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
