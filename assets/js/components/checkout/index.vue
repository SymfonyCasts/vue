<template>
    <div class="row p-3">
        <div class="col-12">
            <form @submit.prevent="onSubmit">
                <div
                    v-show="serverError"
                    class="alert alert-danger m-3"
                >
                    Oops, there's been an error sending your data! Please, try again!
                </div>

                <form-input
                    v-model="form.customerName"
                    v-bind="getFormFields('customerName', 'Name:')"
                    @blur="validateForm"
                />

                <form-input
                    v-model="form.customerEmail"
                    v-bind="getFormFields('customerEmail', 'Email:', 'email')"
                    @blur="validateForm"
                />

                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFormFields('customerAddress', 'Address:')"
                    @blur="validateForm"
                />

                <form-input
                    v-model="form.customerZip"
                    v-bind="getFormFields('customerZip', 'Zip Code:')"
                    @blur="validateForm"
                />

                <form-input
                    v-model="form.customerCity"
                    v-bind="getFormFields('customerCity', 'City:')"
                    @blur="validateForm"
                />

                <form-input
                    v-model="form.customerPhone"
                    v-bind="getFormFields('customerPhone', 'Phone Number:', 'tel')"
                    @blur="validateForm"
                />

                <div class="row p-3 justify-content-end align-items-center">
                    <loading
                        v-show="loading"
                        class="col-auto"
                    />

                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-info btn-sm"
                            :disabled="loading"
                        >
                            Checkout!
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import FormInput from '@/components/checkout/form-input';
import Loading from '@/components/loading';
import { createOrder } from '@/services/checkout-service';
import { clearCart } from '@/services/cart-service';

export default {
    name: 'CheckoutForm',
    components: {
        FormInput,
        Loading,
    },
    props: {
        cart: {
            type: Object,
            required: true,
        },
    },
    data() {
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
            validationErrors: {},
            loading: false,
            serverError: false,
        };
    },
    created() {
        this.form.purchaseItems = this.cart.items;
    },
    methods: {
        /**
         * Gets an object with the necessary form fields
         *
         * @param {string} id
         * @param {string} label
         * @param {string} [type=text]
         * @return {object}
         */
        getFormFields(id, label, type) {
            return {
                id,
                label,
                type: type || 'text',
                errorMessage: this.validationErrors[id],
            };
        },
        async onSubmit() {
            this.loading = true;
            this.serverError = false;
            this.validationErrors = {};

            try {
                const response = await createOrder(this.form);
                await clearCart();

                const id = Number(response.data['@id'].split('/').pop());
                window.location = `/confirmation/${id}`;
            } catch (error) {
                const { response } = error;

                if (response.status !== 400) {
                    this.formError = true;
                } else {
                    response.data.violations.forEach((violation) => {
                        this.validationErrors[violation.propertyPath] = violation.message;
                    });
                }
            } finally {
                this.loading = false;
            }
        },
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
                this.validationErrors[validationField] = validationMessages[validationField];
            } else {
                delete this.validationErrors[validationField];
            }
        },
    },
};
</script>
