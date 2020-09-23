<template>
    <div class="row">
        <div class="col-12">
            <title-component :text="product.name" />
        </div>
    </div>
</template>

<script>
import { getProduct } from '@/services/products-service';
import TitleComponent from '@/components/title';

export default {
    name: 'Product',
    components: {
        TitleComponent,
    },
    props: {
        currentProductId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            product: { name: '' },
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
