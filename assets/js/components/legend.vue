<template>
    <span
        v-text="title"
        class="p-3"
    />
</template>

<script>
export default {
    name: 'Legend',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
