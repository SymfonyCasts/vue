<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside :class="asideClass">
                <sidebar-component
                    :collapsed="sidebarCollapsed"
                    @sidebar-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
                <catalog-component />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogComponent from '@/components/catalog';
import SidebarComponent from '@/components/sidebar';

export default {
    name: 'Products',
    components: {
        CatalogComponent,
        SidebarComponent,
    },
    data: () => ({
        sidebarCollapsed: false,
    }),
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'aside-collapsed' : 'col-xs-12 col-lg-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-xs-12 col-lg-11' : 'col-xs-12 col-lg-9';
        },
    },
    methods: {
        /**
         * Toggles the sidebarCollapsed value
         */
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
