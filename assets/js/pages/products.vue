<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside :class="asideClass">
                <sidebar-component
                    :collapsed="sidebarCollapsed"
                    :current-category-id="currentCategoryId"
                    :categories="categories"
                    @sidebar-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
                <component
                    :is="currentComponent"
                    :categories="categories"
                    :current-category-id="currentCategoryId"
                    :current-product-id="currentProductId"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogComponent from '@/components/catalog';
import ProductComponent from '@/components/product';
import SidebarComponent from '@/components/sidebar';
import collapsible from '@/mixins/collapsible';

export default {
    name: 'Products',
    components: {
        CatalogComponent,
        ProductComponent,
        SidebarComponent,
    },
    mixins: [collapsible],
    props: {
        currentCategoryId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
        currentProductId: {
            type: Number,
            default: null,
        },
    },
    computed: {
        currentComponent() {
            return this.currentProductId !== null ? 'ProductComponent' : 'CatalogComponent';
        },
    },
};
</script>
