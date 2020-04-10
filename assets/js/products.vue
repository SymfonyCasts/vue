<template>
    <div class="container-fluid">
        <div class="row row-no-wrap">
            <aside class="col-xs-12 col-lg-3">
                <div :class="[$style.sidebar, 'p-3', 'mb-5']">
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
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                            >Category A</a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                            >Category B</a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div class="col-xs-12 col-lg-9">
                <div class="row">
                    <h2 class="p-3">
                        Products
                    </h2>
                </div>

                <div class="row">
                    <legend-component :title="legend" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LegendComponent from './components/legend';

export default {
    name: 'Products',
    components: {
        LegendComponent,
    },
    data: () => ({
        legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
    }),
};
</script>

<style lang="scss" module>
@import '../scss/components/light-component';

.sidebar {
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
    }
}
</style>
