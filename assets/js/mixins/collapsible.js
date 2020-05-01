const collapsible = {
    data: () => ({
        sidebarCollapsed: false,
    }),
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'aside-collapsed' : 'col-xs-12 col-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-xs-12 col-11' : 'col-xs-12 col-9';
        },
    },
    methods: {
        /**
         * Toggles the sidebarCollapsed value
         */
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};

export default collapsible;
