<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <div class="col-xs-12 col-lg-3">
                <aside :class="[$style.aside, 'p-3', 'mt-5', 'mb-5']">
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
                    </ul>
                </aside>
            </div>

            <div class="col-xs-12 col-lg-9">
                <div class="row">
                    <h2 class="p-3">Products</h2>
                </div>

                <div class="row">
                    <span class="p-3">
                        {{ legend }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data: () => ({
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
};
</script>

<style lang="scss" module>
@import '../scss/components/light-component';

.aside {
    @include light-component;
    margin-top: 65px;

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
}
</style>
