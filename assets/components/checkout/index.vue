<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
                <form-input
                    id="customerName"
                    :value="form.customerName"
                    label="Name:"
                    :error-message="validationErrors.customerName"
                    @input="form.customerName = $event"
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
        };
    },
};
</script>
