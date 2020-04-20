<template>
    <span
        class="p-3"
        v-text="title"
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
