<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
                <form-input
                    v-model="form.customerName"
                    v-bind="getFieldProps('customerName', 'Name:')"
                />

                <form-input
                    v-model="form.customerEmail"
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
                    v-bind="getFieldProps('customerPhone', 'Phone Number:')"
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
    },
};
</script>
