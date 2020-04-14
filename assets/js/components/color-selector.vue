<template>
    <div :class="$style.component">
        <span
            v-for="(color, index) in colors"
            :key="color['@id']"
            :class="{ [$style.selected]: index === selectedIndex}"
            :title="color.name"
            :style="{ backgroundColor: `#${color.hexColor}` }"
            @click="selectColor(index)"
        />
    </div>
</template>

<script>
import colorsService from '@/services/colors';

export default {
    name: 'ColorSelector',
    data: () => ({
        colors: [],
        selectedIndex: null,
    }),
    async created() {
        try {
            const response = await colorsService.getColors();

            this.colors = response.data['hydra:member'];
        } catch (e) {
            this.colors = [];
        }
    },
    methods: {
        selectColor(index) {
            this.selectedIndex = index;
            this.$emit('color-selected', this.colors[index]['@id']);
        },
    },
};
</script>

<style lang="scss" module>
    .component {
        display: inline-block;
        width: 105px;
        height: 25px;

        span {
            display: inline-block;
            border-radius: 4px;
            border: 2px solid transparent;
            cursor: pointer;
            width: 25px;
            height: 25px;
            margin-right: 10px;

            &.selected {
                border: 2px solid black
            }
        }
    }
</style>
