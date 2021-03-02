<template>
    <div class="row p-3">
        <div class="col-12">
            <form>
                <div class="form-group">
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
                        :class="{
                            'is-invalid': !isFieldValid('customerName'),
                            'form-control': true,
                        }"
                    >
                    <span
                        v-show="!isFieldValid('customerName')"
                        class="invalid-feedback"
                    >
                        {{ validationErrors.customerName }}
                    </span>
                </div>
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
    methods: {
        isFieldValid(fieldName) {
            return !(fieldName in this.validationErrors);
        },
    },
};
</script>
