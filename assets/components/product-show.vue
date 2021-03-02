<template>
    <div>
        <div v-if="product">
            <h1>{{ product.name }}</h1>
        </div>
    </div>
</template>

<script>
import { fetchOneProduct } from '@/services/products-service';

export default {
    name: 'ProductShow',
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: null,
            loading: true,
        };
    },
    async created() {
        try {
            this.product = (await fetchOneProduct(this.productId)).data;
        } finally {
            this.loading = false;
        }
    },
};
</script>
