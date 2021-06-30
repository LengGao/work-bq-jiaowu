export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            letterMap: {
                1: "A",
                2: "B",
                3: "C",
                4: "D",
                5: "E",
                6: "F",
                7: "G",
                8: "H",
                9: "I",
                10: "J",
            },
        }
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