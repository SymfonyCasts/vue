<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside class="col-xs-12 col-lg-3">
                <sidebar-component
                    :collapsed="sidebarCollapsed"
                    @sidebar-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div class="col-xs-12 col-lg-9">
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
