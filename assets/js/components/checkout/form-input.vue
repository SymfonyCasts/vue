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
            v-model.trim="form.customerName"
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
            {{ validation.customerName }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
};
</script>
