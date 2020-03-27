<template>
    <span
        class="p-3"
        v-text="title"
    />
</template>

<script>
export default {
    name: 'Title',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
