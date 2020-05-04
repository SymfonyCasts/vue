<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
        <div v-if="!collapsed">
            <h5 class="text-center">
                Categories
            </h5>

            <ul class="nav flex-column mb-4">
                <li class="nav-item">
                    <a
                        :class="{
                            'nav-link': true,
                            [$style.selected]: currentCategoryId === null,
                            
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
                            [$style.selected]: category.id === currentCategoryId,
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
                @click="$emit('sidebar-collapsed')"
                v-text="collapsed ? '>>' : '<< Collapse'"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        collapsed: {
            type: Boolean,
            required: true,
            default: false,
        },
        currentCategoryId: {
            type: Number,
            default: null,
        },
        categories: {
            type: Array,
            default: () => ([]),
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.component {
    @include light-component;
    margin-top: 65px;

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
