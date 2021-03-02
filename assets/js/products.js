import Vue from 'vue';

const app = new Vue({
    el: '#app',
    data: function() {
        return {
            firstName: 'Ryan',
        };
    },
    template: '<h1>Hello {{ firstName }}! Is this cooler?</h1>',
});

window.app = app;
