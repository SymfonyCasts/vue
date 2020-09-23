<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
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
            </form>
        </div>
    </div>
</template>

<script>
import FormInput from '@/components/checkout/form-input';

export default {
    name: 'CheckoutForm',
    components: {
        FormInput,
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
    },
};
</script>
