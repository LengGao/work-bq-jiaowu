export default {
    props: {
        data: {
            type: Object,
            default: () => ({ child_list: [] }),
        },
    },
    data() {
        return {
            editorHeight: 300,
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
            indexMap: {
                "A": 0,
                "B": 1,
                "C": 2,
                "D": 3,
                "E": 4,
                "F": 5,
                "G": 6,
                "H": 7,
                "I": 8,
                "J": 9,
            },
        }
    },
    watch: {
        data() {
            this.setEditorForm()
        }
    },
    methods: {
        // 对传进来的值进行复制 
        setEditorForm() {
            this.editorForm.id = this.data.id
            this.editorForm.topic_analysis = this.data.topic_analysis
            this.editorForm.topic_description = this.data.topic_description
            this.editorOptions = []
            this.eId = this.data.option.length
            this.data.option.forEach((item, index) => {
                this.editorOptions.push(index + 1)
                this.$set(this.editorForm, `option${index + 1}`, item.topic_option_description)
            })
            switch (this.data.topic_child_type) {
                case 1:
                case 3:
                    this.editorForm.correct = this.indexMap[this.data.topic_answer]
                    break;
                case 2:
                case 4:
                    this.editorForm.correct = this.data.topic_answer.split(',').map(item => this.indexMap[item])
                    break;
                case 5:
                    this.editorForm.checked = !!this.data.ignore_order
                case 6:
                    this.editorForm.correct = this.data.topic_answer
                    break;

            }
        }
    }
}