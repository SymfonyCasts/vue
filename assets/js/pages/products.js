import { createApp, h } from 'vue';
import App from '@/pages/products.vue';

createApp({
    setup() {
        return () => (h(App, {
            currentCategoryId: window.currentCategoryId,
            categories: window.categories,
            currentProductId: window.currentProductId,
        }));
    },
}).mount('#app');

/*
createApp({
    render: () => h(App),
}).mount('#app');
*/
