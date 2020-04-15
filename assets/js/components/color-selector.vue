
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
};
</script>
