<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
                <form-input
                    id="customerName"
                    v-model="form.customerName"
                    label="Name:"
                    :error-message="validationErrors.customerName"
                />

                <form-input
                    id="customerEmail"
                    v-model="form.customerEmail"
                    label="Email:"
                    :error-message="validationErrors.customerEmail"
                />

                <form-input
                    id="customerAddress"
                    v-model="form.customerAddress"
                    label="Address:"
                    :error-message="validationErrors.customerAddress"
                />

                <form-input
                    id="customerZip"
                    v-model="form.customerZip"
                    label="Zip Code:"
                    :error-message="validationErrors.customerZip"
                />

                <form-input
                    id="customerCity"
                    v-model="form.customerCity"
                    label="City:"
                    :error-message="validationErrors.customerCity"
                />

                <form-input
                    id="customerPhone"
                    v-model="form.customerPhone"
                    label="Phone Number:"
                    :error-message="validationErrors.customerPhone"
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
};
</script>
