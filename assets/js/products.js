import Vue from 'vue';
import App from '@/products.vue';

new Vue({
    render: (h) => h(App, {
        props: {
            currentCategoryId: window.currentCategoryId,
            categories: window.categories,
        },
    }),
}).$mount('#app');
