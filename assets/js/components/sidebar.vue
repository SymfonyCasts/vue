<template>
    <div :class="[$style.sidebar, 'p-3', 'mb-5']">
        <h5 class="text-center">
            Categories
        </h5>

        <ul class="nav flex-column mb4">
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
@import '~styles/components/light-component';

.sidebar {
    @include light-component;

    ul {
        li a:hover {
            background: $blue-component-link-hover;
        }
    }
}
</style>
