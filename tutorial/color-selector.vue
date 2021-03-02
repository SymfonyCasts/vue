<template>
    <div :class="$style.component">
        <span
            v-for="(color) in colors"
            :key="color['@id']"
            :class="{ selected: color['@id'] === selectedIRI}"
            :title="color.name"
            :style="{ backgroundColor: `#${color.hexColor}` }"
            @click="selectColor(color['@id'])"
        />
    </div>
</template>

<script>
import { fetchColors } from '@/services/colors-service';

export default {
    name: 'ColorSelector',
    data() {
        return {
            colors: [],
            selectedIRI: null,
        };
    },
    async created() {
        this.colors = (await fetchColors()).data['hydra:member'];
    },
    methods: {
        selectColor(iri) {
            this.selectedIRI = iri;
            this.$emit('color-selected', iri);
        },
    },
};
</script>

<style lang="scss" module>
.component :global {
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
