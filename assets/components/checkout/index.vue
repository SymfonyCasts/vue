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
