<template>
    <div class="row p-3">
        <div class="col-12">
            <form @submit="onSubmit">
                <form-input
                    v-model="form.customerName"
                    v-bind="getFormFields('customerName', 'Name:')"
                />

                <form-input
                    v-model="form.customerEmail"
                    v-bind="getFormFields('customerEmail', 'Email:', 'email')"
                />

                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFormFields('customerAddress', 'Address:')"
                />

                <form-input
                    v-model="form.customerZip"
                    v-bind="getFormFields('customerZip', 'Zip Code:')"
                />

                <form-input
                    v-model="form.customerCity"
                    v-bind="getFormFields('customerCity', 'City:')"
                />

                <form-input
                    v-model="form.customerPhone"
                    v-bind="getFormFields('customerPhone', 'Phone Number:', 'tel')"
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
        async onSubmit(event) {
            event.preventDefault();
            this.loading = true;
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
