<template>
    <div class="container-fluid">
        <div class="row">
            <aside :class="asideClass">
                <sidebar
                    :collapsed="sidebarCollapsed"
                    :current-category-id="currentCategoryId"
                    :categories="categories"
                    @toggle-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
                <component
                    :is="currentComponent"
                    v-bind="currentProps"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '@/components/catalog';
import ProductShow from '@/components/product-show';
import Sidebar from '@/components/sidebar';
import { getCurrentCategoryId, getCurrentProductId } from '@/services/page-context';
import { fetchCategories } from '@/services/categories-service';

export default {
    name: 'Products',
    components: {
        Catalog,
        ProductShow,
        Sidebar,
    },
    data() {
        return {
            sidebarCollapsed: false,
            categories: [],
            currentCategoryId: getCurrentCategoryId(),
        };
    },
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'aside-collapsed' : 'col-xs-12 col-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-xs-12 col-11' : 'col-xs-12 col-9';
        },
        currentProductId() {
            return getCurrentProductId();
        },
        currentComponent() {
            return this.currentProductId !== null ? ProductShow : Catalog;
        },
        currentProps() {
            return this.currentComponent === ProductShow ? {
                productId: this.currentProductId,
            } : {
                currentCategoryId: this.currentCategoryId,
                categories: this.categories,
            };
        },
    },
    async created() {
        const response = await fetchCategories();

        this.categories = response.data['hydra:member'];
    },
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
