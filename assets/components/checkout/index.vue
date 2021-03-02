<template>
    <div class="row p-3">
        <div class="col-12">
            <form @submit.prevent="onSubmit">
                <div
                    v-show="serverError"
                    class="alert alert-danger"
                >
                    Well this is embarrassing ... something went wrong!
                    Please try again!
                </div>

                <div class="form-row">
                    <form-input
                        v-model="form.customerName"
                        class="col"
                        v-bind="getFieldProps('customerName', 'Name:')"
                        @blur="validateField"
                    />

                    <form-input
                        v-model="form.customerEmail"
                        class="col"
                        type="email"
                        v-bind="getFieldProps('customerEmail', 'Email:')"
                        @blur="validateField"
                    />
                </div>

                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFieldProps('customerAddress', 'Address:')"
                    @blur="validateField"
                />

                <div class="form-row">
                    <form-input
                        v-model="form.customerZip"
                        class="col"
                        v-bind="getFieldProps('customerZip', 'Zip Code:')"
                        @blur="validateField"
                    />

                    <form-input
                        v-model="form.customerCity"
                        class="col"
                        v-bind="getFieldProps('customerCity', 'City:')"
                        @blur="validateField"
                    />

                    <form-input
                        v-model="form.customerPhone"
                        class="col"
                        type="tel"
                        v-bind="getFieldProps('customerPhone', 'Phone Number:')"
                        @blur="validateField"
                    />
                </div>

                <div class="form-row justify-content-end align-items-center">
                    <loading v-show="loading" />

                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-info btn-lg"
                            :disabled="loading"
                        >
                            Order!
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
            },
            validationErrors: this.getEmptyValidationErrors(),
            loading: false,
            serverError: false,
        };
    },
    methods: {
        /**
         * Gets an object with the necessary form fields
         *
         * @param {string} id
         * @param {string} label
         * @return {object}
         */
        getFieldProps(id, label) {
            return {
                id,
                label,
                errorMessage: this.validationErrors[id],
            };
        },
        async onSubmit() {
            this.loading = true;
            this.serverError = false;
            this.validationErrors = this.getEmptyValidationErrors();

            try {
                const response = await createOrder({
                    ...this.form,
                    purchaseItems: this.cart.items,
                });

                await clearCart();

                window.location = `/confirmation/${response.data.id}`;
            } catch (error) {
                const { response } = error;

                if (response.status !== 400) {
                    this.serverError = true;
                } else {
                    response.data.violations.forEach((violation) => {
                        this.validationErrors[violation.propertyPath] = violation.message;
                    });
                }
            } finally {
                this.loading = false;
            }
        },
        validateField(event) {
            const validationMessages = {
                customerName: 'Please, enter your full name!',
                customerEmail: 'Please, enter your email address!',
                customerAddress: 'Please, enter your street address!',
                customerZip: 'Please, enter your ZIP code!',
                customerCity: 'Please, enter your city!',
                customerPhone: 'Please, provide a phone number!',
            };

            const validationField = event.target.id;

            if (!this.form[validationField]) {
                this.validationErrors[validationField] = validationMessages[validationField];
            } else {
                this.validationErrors[validationField] = null;
            }
        },
        getEmptyValidationErrors() {
            return {
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
