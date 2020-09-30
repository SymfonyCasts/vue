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
                    v-bind="getFieldProps('customerName', 'Name:')"
                />

                <form-input
                    v-model="form.customerEmail"
                    type="email"
                    v-bind="getFieldProps('customerEmail', 'Email:')"
                />

                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFieldProps('customerAddress', 'Address:')"
                />

                <form-input
                    v-model="form.customerZip"
                    v-bind="getFieldProps('customerZip', 'Zip Code:')"
                />

                <form-input
                    v-model="form.customerCity"
                    v-bind="getFieldProps('customerCity', 'City:')"
                />

                <form-input
                    v-model="form.customerPhone"
                    type="tel"
                    v-bind="getFieldProps('customerPhone', 'Phone Number:')"
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
            this.form.purchaseItems = this.cart.items;
            this.serverError = false;

            try {
                const response = await createOrder(this.form);
            } catch (error) {
                const { response } = error;

                if (response.status !== 400) {
                    this.serverError = true;
                } else {
                    console.log(response.data);
                }
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
