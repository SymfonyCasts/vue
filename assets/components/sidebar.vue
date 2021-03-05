<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
        <div v-show="!collapsed">
            <h5 class="text-center">
                Categories
            </h5>

            <loading v-show="loading" />

            <ul class="nav flex-column mb4">
                <li class="nav-item">
                    <a
                        :class="{
                            'nav-link': true,
                            'selected': currentCategoryId === null,
                        }"
                        href="/"
                    >All Products</a>
                </li>

                <li
                    v-for="category in categories"
                    :key="category['@id']"
                    class="nav-item"
                >
                    <a
                        :href="`/category/${category.id}`"
                        :class="{
                            'nav-link': true,
                            'selected': category['@id'] === currentCategoryId,
                        }"
                    >
                        {{ category.name }}
                    </a>
                </li>
            </ul>

            <hr>
        </div>

        <div class="d-flex justify-content-end">
            <button
                class="btn btn-secondary btn-sm"
                @click="$emit('toggle-collapsed')"
                v-text="collapsed ? '>>' : '<< Collapse'"
            />
        </div>
    </div>
</template>

<script>
import Loading from '@/components/loading';
import { fetchCategories } from '@/services/categories-service';

export default {
    name: 'Sidebar',
    components: {
        Loading,
    },
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
        currentCategoryId: {
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    computed: {
        loading() {
            return this.categories.length === 0;
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.component :global {
    @include light-component;

    ul {
        li a:hover {
            background: $blue-component-link-hover;
        }

        li a.selected {
            background: $light-component-border;
        }
    }
}
</style>
