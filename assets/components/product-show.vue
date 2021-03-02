<template>
    <div>
        <loading v-if="loading" />

        <div v-if="product">
            <title-component :text="product.name" />
        </div>
    </div>
</template>

<script>
import { fetchOneProduct } from '@/services/products-service';
import Loading from '@/components/loading';
import TitleComponent from '@/components/title';

export default {
    name: 'ProductShow',
    components: {
        Loading,
        TitleComponent,
    },
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
