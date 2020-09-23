<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
                <div class="p-3">
                    <label
                        for="customerName"
                        class="col-form-label"
                    >
                        Name:
                    </label>
                    <input
                        id="customerName"
                        v-model.trim="form.customerName"
                        type="text"
                        class="form-control"
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckoutForm',
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
