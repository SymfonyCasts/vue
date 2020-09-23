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

        </span>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    methods: {
        isFieldValid(fieldName) {
            return true;
        },
    },
};
</script>
