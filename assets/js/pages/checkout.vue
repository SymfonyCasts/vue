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
                            <form-input
                                id="customerName"
                                v-model="form.customerName"
                                label="Name:"
                                :error-message="validation.customerName"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartService from '@/services/cart';
import FormInput from '@/components/checkout/form-input';
import TitleComponent from '@/components/title';

export default {
    name: 'Checkout',
    components: {
        FormInput,
        TitleComponent,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
            default: '',
        },
        errorMessage: {
            type: String,
            required: false,
            default: '',
        },
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
