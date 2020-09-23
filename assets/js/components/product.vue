<template>
    <div class="row">
        <div class="col-12">
            <title-component />
        </div>

        I'd <3 to see a Product here!
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
