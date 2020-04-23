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
                        <form @submit="onSubmit">
                            <div
                                v-show="formError"
                                class="invalid-feedback"
                            >
                                Oops, there's been an error sending your data! Please, try again!
                            </div>

                            <form-input
                                id="customerName"
                                v-model="form.customerName"
                                label="Name:"
                                :error-message="validation.customerName"
                            />

                            <form-input
                                id="customerEmail"
                                v-model="form.customerEmail"
                                label="Email:"
                                :error-message="validation.customerEmail"
                            />

                            <form-input
                                id="customerAddress"
                                v-model="form.customerAddress"
                                label="Address:"
                                :error-message="validation.customerAddress"
                            />

                            <form-input
                                id="customerZip"
                                v-model="form.customerZip"
                                label="Zip Code:"
                                :error-message="validation.customerZip"
                            />

                            <form-input
                                id="customerCity"
                                v-model="form.customerCity"
                                label="City:"
                                :error-message="validation.customerCity"
                            />

                            <form-input
                                id="customerPhone"
                                v-model="form.customerPhone"
                                label="Phone Number:"
                                :error-message="validation.customerPhone"
                            />

                            <div :class="$style['form-action']">
                                <loading v-show="loading" />

                                <input
                                    type="submit"
                                    class="btn btn-info btn-sm"
                                    value="Checkout!"
                                    :disabled="loading"
                                >
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
import checkoutService from '@/services/checkout';
import FormInput from '@/components/checkout/form-input';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';

export default {
    name: 'Checkout',
    components: {
        FormInput,
        Loading,
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
        loading: false,
        formError: false,
    }),
    async created() {
        const itemsInCart = cartService.getItems();

        this.form.purchaseItems = itemsInCart.map((item) => ({
            product: item.productId,
            color: item.colorId,
            quantity: item.qty,
        }));
    },
    methods: {
        /**
         * Sends the form data and process the response!
         *
         * @param {Event} event
         */
        async onSubmit(event) {
            event.preventDefault();
            this.loading = true;
            this.formError = false;
            this.resetValidationFields();

            try {
                const response = await checkoutService.createOrder(this.form);
                cartService.clear();
            } catch (error) {
                const { response } = error;

                if (response.status !== 400) {
                    this.formError = true;
                } else {
                    response.data.violations.forEach((violation) => {
                        this.validation[violation.propertyPath] = violation.message;
                    });
                }
            } finally {
                this.loading = false;
            }
        },

        /**
         * Resets our validation fields back to null
         */
        resetValidationFields() {
            this.validation = {
                customerName: null,
                customerEmail: null,
                customerAddress: null,
                customerZip: null,
                customerCity: null,
                customerPhone: null,
            };
        },
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

    .form-action {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        input {
            margin-left: 20px;
        }
    }
}
</style>
