<template>
    <div :class="[$style.component, 'p-3', 'mb-5']">
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
</template>

<script>
export default {
    name: 'Sidebar',
};
</script>

<style lang="scss" module>
@import '../../scss/components/light-component';

.component {
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
