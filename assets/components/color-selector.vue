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
<<<<<<< HEAD
import { getColors } from '@/services/colors-service';
=======
import { fetchColors } from '@/services/colors-service';
>>>>>>> vue-2-final

export default {
    name: 'ColorSelector',
    data() {
        return {
            colors: [],
            selectedIRI: null,
        };
    },
    async created() {
<<<<<<< HEAD
        let response;

        try {
            response = await getColors();
        } catch (e) {
            return;
        }

        this.colors = response.data['hydra:member'];
=======
        this.colors = (await fetchColors()).data['hydra:member'];
>>>>>>> vue-2-final
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
<<<<<<< HEAD
    display: inline-block;
    width: 105px;
=======
>>>>>>> vue-2-final
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
