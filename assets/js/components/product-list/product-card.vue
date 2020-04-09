<template>
    <div :class="[$style.component, 'col-xs-12', 'mb-2', 'ml-2', 'pb-2']">
        {{ item.name }}
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.component {
    @include light-component;
    width: 355px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;

    .top {
        border-bottom: 1px solid $light-component-border;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        margin-bottom: 5px;

        .image {
            flex-grow: 1;

            img {
                width: 100%;
                height: auto;
            }

            h3 {
                font-size: 1.2rem;
                font-weight: bold;
            }
        }
    }
}
</style>
