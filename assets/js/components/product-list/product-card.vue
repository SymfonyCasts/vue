<template>
    <div :class="[$style.component, 'col-xs-12', 'mb-2', 'ml-2', 'pb-2']">
        <div :class="$style.top">
            <div :class="$style.image">
                <img
                    :alt="item.name"
                    :src="item.image"
                    class="mx-auto d-block my-2"
                >

                <h3
                    class="mb-2"
                    v-text="item.name"
                />
            </div>

            <div class="pt-2 my-3 d-md-flex justify-content-between">
                <p class="p-0 d-inline">
                    <strong>$ {{ getPrice() }}</strong>
                </p>

                <button
                    class="btn btn-info btn-sm"
                >
                    View Product
                </button>
            </div>
        </div>

        <div>
            <small>brought to you by </small>

            <small
                class="d-inline"
                v-text="item.brand"
            />
        </div>
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
    methods: {
        /**
         * Returns a formatted price for the product
         * @returns {string}
         */
        getPrice() {
            const strPrice = this.price.toString();
            return `${strPrice.substr(0, strPrice.length - 2)}.${strPrice.substr(-2)}`;
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
