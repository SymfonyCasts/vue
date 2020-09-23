<template>
    <div class="row p-3">
        <div class="col-12">
            A cool checkout form will appear right here!
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckoutForm',
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
        };
    },
};
</script>
