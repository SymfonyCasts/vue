<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <div class="row">
                    <div :class="$style['top-bar']">
                        <title-component text="Checkout" />
                    </div>

                    <div :class="$style.content">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';

export default {
    name: 'Checkout',
    components: {
        TitleComponent,
    },
    data: () => ({
        form: {
            customerName: '',
            customerEmail: '',
            customerAddress: '',
            customerZip: '',
            customerCity: '',
            customerPhone: '',
            purchaseItems: [],
        },
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
