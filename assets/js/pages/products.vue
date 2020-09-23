<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-xs-12 col-3">
                <sidebar
                    :collapsed="sidebarCollapsed"
                    v-on:toggle-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div class="col-xs-12 col-9">
                <catalog />
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog';
import Sidebar from '@/components/sidebar';

export default {
    name: 'Products',
    components: {
        Catalog,
        Sidebar,
    },
    data() {
        return {
            sidebarCollapsed: false,
        };
    },
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
