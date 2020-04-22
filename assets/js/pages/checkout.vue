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
                        <form>
                            <div class="form-row">
                                <label
                                    for="customerName"
                                    class="col-form-label"
                                >
                                    Name:
                                </label>
                                <input
                                    id="customerName"
                                    v-model.trim="form.customerName"
                                    type="text"
                                    :class="{
                                        'is-invalid': !form.customerName,
                                        'form-control': true,
                                    }"
                                >
                                <span
                                    v-show="isFieldValid('customerName')"
                                    class="invalid-feedback"
                                >
                                    {{ validation.customerName }}
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart';
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
        validation: {
            customerName: null,
            customerEmail: null,
            customerAddress: null,
            customerZip: null,
            customerCity: null,
            customerPhone: null,
        },
    }),
    async created() {
        const itemsInCart = cartService.getItems();

        this.form.purchaseItems = itemsInCart.map((item) => ({
            product: item.productId,
            color: item.colorId,
            quantity: item.qty,
        }));
    },
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
