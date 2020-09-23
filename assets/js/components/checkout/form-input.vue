<template>
    <div class="p-3">
        <label
            :for="id"
            class="col-form-label"
        >
            {{ label }}
        </label>
        <input
            :id="id"
            type="text"
            :class="{
                'is-invalid': !isValid,
                'form-control': true,
            }"
        >
        <span
            v-show="!isValid"
            class="invalid-feedback"
        >
            {{ errorMessage }}
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
        },
        errorMessage: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        isValid() {
            return !this.errorMessage;
        },
    },
};
</script>
