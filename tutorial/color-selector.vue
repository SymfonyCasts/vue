<template>
    <div :class="$style.component">
        <span
            v-for="(color) in colors"
            :key="color['@id']"
            :class="{ selected: color['@id'] === selectedIndex}"
            :title="color.name"
            :style="{ backgroundColor: `#${color.hexColor}` }"
            @click="selectColor(color['@id'])"
        />
    </div>
</template>

<script>
import { getColors } from '@/services/colors-service';

export default {
    name: 'ColorSelector',
    data() {
        return {
            colors: [],
            selectedIndex: null,
        };
    },
    async created() {
        let response;

        try {
            response = await getColors();
        } catch (e) {
            return;
        }

        this.colors = response.data['hydra:member'];
    },
    methods: {
        selectColor(irl) {
            this.selectedIndex = irl;
            this.$emit('color-selected', irl);
        },
    },
};
</script>

<style lang="scss" module>
.component :global {
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
