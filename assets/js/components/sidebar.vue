<template>
    <div :class="componentClass">
        <div v-if="!collapsed">
            <h5 class="text-center">
                Categories
            </h5>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="/"
                    >All Products</a>
                </li>

                <li
                    v-for="(category, index) in categories"
                    :key="index"
                    class="nav-item"
                >
                    <a
                        :href="category.link"
                        class="nav-link"
                    >
                        {{ category.name }}
                    </a>
                </li>
            </ul>
        </div>

        <div :class="$style.buttons">
            <button
                class="btn btn-secondary btn-sm"
                @click="$emit('sidebar-collapsed')"
                v-text="collapsed ? '>>' : '<< Collapse'"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Sidebar',
    props: {
        collapsed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data: () => ({
        categories: [],
    }),
    computed: {
        /**
         * Computes the component classes depending on collapsed state
         *
         * @return string[]
         */
        componentClass() {
            const classArray = [this.$style.component, 'p-3', 'mt-5', 'mb5'];

            if (this.collapsed) {
                classArray.push(this.$style.collapsed);
            }

            return classArray;
        },
    },
    async created() {
        this.categories = [];

        const response = await axios({
            method: 'get',
            url: '/api/categories',
        });

        this.categories = response.data['hydra:member'];
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component';

.component {
    @include light-component;
    margin-top: 65px;

    &.collapsed {
        width: 70px;
    }

    ul {
        border-bottom: 1px solid $light-component-border;
        margin-bottom: 20px;
        padding-bottom: 10px;

        li a {
            color: #000;
        }

        li a:hover {
            background: $blue-component-link-hover;
        }

        li a.selected {
            background: $light-component-border;
        }
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
}
</style>
