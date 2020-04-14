import Vue from 'vue';
import App from '@/products.vue';
import cartService from '@/services/cart';

window.cart = cartService;

new Vue({
    render: (h) => h(App, {
        props: {
            currentCategoryId: window.currentCategoryId,
            categories: window.categories,
            currentProductId: window.currentProductId,
        },
    }),
}).$mount('#app');
