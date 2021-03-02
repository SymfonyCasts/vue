<template>
    <div class="row p-3">
        <div class="col-12">
            <form @submit.prevent="onSubmit">
                <div class="form-row">
                    <form-input
                        v-model="form.customerName"
                        class="col"
                        v-bind="getFieldProps('customerName', 'Name:')"
                    />

                    <form-input
                        v-model="form.customerEmail"
                        class="col"
                        type="email"
                        v-bind="getFieldProps('customerEmail', 'Email:')"
                    />
                </div>

                <form-input
                    v-model="form.customerAddress"
                    v-bind="getFieldProps('customerAddress', 'Address:')"
                />

                <div class="form-row">
                    <form-input
                        v-model="form.customerZip"
                        class="col"
                        v-bind="getFieldProps('customerZip', 'Zip Code:')"
                    />

                    <form-input
                        v-model="form.customerCity"
                        class="col"
                        v-bind="getFieldProps('customerCity', 'City:')"
                    />

                    <form-input
                        v-model="form.customerPhone"
                        class="col"
                        type="tel"
                        v-bind="getFieldProps('customerPhone', 'Phone Number:')"
                    />
                </div>

                <div class="form-row justify-content-end align-items-center">
                    <loading v-show="loading" />

                    <div class="col-auto">
                        <button
                            type="submit"
                            class="btn btn-info btn-lg"
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
            validationErrors: {},
            loading: false,
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

            try {
                const response = await createOrder({
                    ...this.form,
                    purchaseItems: this.cart.items,
                });

                console.log(response.data);
            } catch (error) {
                console.error(error.response);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
