<template>
    <div class="row p-3">
        <div class="col-12">
            <form>

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
