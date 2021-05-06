export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    created() {
        console.log('mixins')
        this.initData(this.data, this.editorForm)
    },
    methods: {
        // 对传进来的值进行复制 
        initData(data, newData) {
            for (const k in newData) {
                if (typeof data[k] === 'object') {
                    newData[k] = Array.isArray(data[k]) ? [] : {}
                    this.initData(data[k], newData[k])
                } else {
                    // 对 0 要特殊对待
                    // newData[k] = data[k] === 0 ? data[k] : data[k] || ''
                    newData[k] = data[k] ?? ''
                }
            }
        }
    }
}