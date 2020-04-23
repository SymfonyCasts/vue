<template>
    <div class="form-row">
        <label
            for="customerName"
            class="col-form-label"
        >
            Name:
        </label>
        <input
            id="customerName"
            type="text"
            :class="{
                'is-invalid': !isFieldValid('customerName'),
                'form-control': true,
            }"
        >
        <span
            v-show="isFieldValid('customerName')"
            class="invalid-feedback"
        >
            {{ '' }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
            default: '',
        },
        errorMessage: {
            type: String,
            required: false,
            default: '',
        },
    },
    methods: {
        isFieldValid(fieldName) {
            return true;
        },
    },
};
</script>
