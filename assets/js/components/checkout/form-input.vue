<template>
    <div class="form-row">
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
                'is-invalid': !valid,
                'form-control': true,
            }"
            @input="$emit('input', $event.target.value)"
        >
        <span
            v-show="!valid"
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
            default: '',
        },
        errorMessage: {
            type: String,
            required: false,
            default: '',
        },
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        valid() {
            return !this.errorMessage;
        },
    },
};
</script>
