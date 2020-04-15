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
