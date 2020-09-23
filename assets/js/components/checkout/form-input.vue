<template>
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
</template>

<script>
export default {
    name: 'FormInput',
    methods: {
        isFieldValid(fieldName) {
            return (typeof this.validationErrors[fieldName] === 'undefined');
        },
    },
};
</script>
