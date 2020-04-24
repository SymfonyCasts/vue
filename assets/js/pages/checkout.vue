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
                        <form @submit.prevent="onSubmit">
                            <div
                                v-show="formError"
                                class="alert alert-danger"
                            >
                                Oops, there's been an error sending your data! Please, try again!
                            </div>

                            <form-input
                                id="customerName"
                                :value="form.customerName"
                                label="Name:"
                                :error-message="validation.customerName"
                                @input="(event) => form.customerName = event.target.value"
                                @blur="validateForm"
                            />

                            <form-input
                                id="customerEmail"
                                :value="form.customerEmail"
                                label="Email:"
                                :error-message="validation.customerEmail"
                                @input="(event) => form.customerEmail = event.target.value"
                                @blur="validateForm"
                            />

                            <form-input
                                id="customerAddress"
                                :value="form.customerAddress"
                                label="Address:"
                                :error-message="validation.customerAddress"
                                @input="(event) => form.customerAddress = event.target.value"
                                @blur="validateForm"
                            />

                            <form-input
                                id="customerZip"
                                :value="form.customerZip"
                                label="Zip Code:"
                                :error-message="validation.customerZip"
                                @input="(event) => form.customerZip = event.target.value"
                                @blur="validateForm"
                            />

                            <form-input
                                id="customerCity"
                                :value="form.customerCity"
                                label="City:"
                                :error-message="validation.customerCity"
                                @input="(event) => form.customerCity = event.target.value"
                                @blur="validateForm"
                            />

                            <form-input
                                id="customerPhone"
                                :value="form.customerPhone"
                                label="Phone Number:"
                                :error-message="validation.customerPhone"
                                @input="(event) => form.customerPhone = event.target.value"
                                @blur="validateForm"
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

const initializeValidationFields = () => ({
    customerName: null,
    customerEmail: null,
    customerAddress: null,
    customerZip: null,
    customerCity: null,
    customerPhone: null,
});

export default {
    name: 'Checkout',
    components: {
        FormInput,
        Loading,
        TitleComponent,
    },
    data() {
        console.log(this.initializeValidationFields);
        return {
            form: {
                customerName: '',
                customerEmail: '',
                customerAddress: '',
                customerZip: '',
                customerCity: '',
                customerPhone: '',
                purchaseItems: [],
            },
            validation: initializeValidationFields(),
            loading: false,
            formError: false,
        };
    },
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
         */
        async onSubmit() {
            this.loading = true;
            this.formError = false;
            this.validation = initializeValidationFields();

            try {
                const response = await checkoutService.createOrder(this.form);
                cartService.clear();
                window.location = `/confirmation/${response.data.id}`;
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
         * Validates our form fields and sets proper validation messages if any of them are empty.
         *
         * @param {Event} event
         */
        validateForm(event) {
            const validationMessages = {
                customerName: 'Please, enter your full name!',
                customerEmail: 'Please, enter your email address!',
                customerAddress: 'Please, enter your street address!',
                customerZip: 'Please, enter your ZIP code!',
                customerCity: 'Please, enter your City!',
                customerPhone: 'Please, provide a phone number!',
            };

            const validationField = event.target.id;

            if (!this.form[validationField]) {
                this.validation[validationField] = validationMessages[validationField];
            } else {
                this.validation[validationField] = null;
            }
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
