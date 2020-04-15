import Vue from 'vue';
import App from '@/pages/products.vue';

new Vue({
    render: (h) => h(App, {
        props: {
            currentCategoryId: window.currentCategoryId,
            categories: window.categories,
            currentProductId: window.currentProductId,
        },
    }),
}).$mount('#app');
