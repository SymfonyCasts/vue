<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="row">
                    <div :class="$style['top-bar']">
                        <title-component text="Shopping Cart" />
                    </div>

                    <div :class="$style.content">
                        <loading v-show="loading" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';

export default {
    name: 'ShoppingCart',
    components: {
        Loading,
        TitleComponent,
    },
    data: () => ({
        loading: true,
    }),
};
</script>

<style lang="scss" module>
@import '~styles/top-bar.scss';
@import '~styles/components/light-component.scss';

.content {
    @include light-component;
    margin-top: 25px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 900px;
}
</style>
