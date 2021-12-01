
export default {
    data() {
        return {
            timer: null
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
    },
    methods: {
        onResize() {
            clearTimeout(this.timer)
            this.timer = null
            this.timer = setTimeout(() => {
                this.chartInstance.resize();
            }, 100);
        }
    },
}