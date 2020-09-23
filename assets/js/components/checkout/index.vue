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
