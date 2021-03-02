import Vue from 'vue';

new Vue({
    el: '#app',
    data() {
        return {
            firstName: 'Ryan',
        };
    },
    template: '<h1>Hello {{ firstName }}! Is this cooler?</h1>',
    render(h) {
        return Vue.compile(this.$options.template).render.call(this, h);
    },
});
