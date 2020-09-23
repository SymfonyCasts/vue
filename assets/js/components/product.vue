<template>
    <div>
        <h1>{{ product.name }}</h1>
        I'd <3 to see a Product here!
    </div>
</template>

<script>
import { getProduct } from '@/services/products-service';

export default {
    name: 'Product',
    props: {
        currentProductId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            product: null,
            loading: true,
        };
    },
    async created() {
        let response;

        try {
            response = await getProduct(this.currentProductId);

            this.loading = false;
        } catch (e) {
            this.loading = false;

            return;
        }

        this.product = response.data;
    },
};
</script>
