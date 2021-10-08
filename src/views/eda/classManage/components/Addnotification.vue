<template>
    <div class="class-detail">
        <el-select v-model="storemodel" placeholder="添加通知" @change="selectiondata" class="selectCss">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <!-- 上课通知弹窗 -->
        <el-dialog :visible.sync="changeStoreVisible" title="上课通知" width="600px" :close-on-click-modal="false">
            <el-form :model="formData">
                <el-form-item label="通知标题" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入通知标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课时间" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入上课时间" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课内容" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入上课内容" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课地点" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入上课地点" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注意事项" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="4" placeholder="请输入注意事项（请携带XX教材）" v-model="formData.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStoreCancle">取 消</el-button>
                <el-button type="primary" @click="changeStoreForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 考试通知弹窗 -->
        <el-dialog :visible.sync="examinationVisible" title="考试通知" width="600px" :close-on-click-modal="false">
            <el-form :model="formData">
                <el-form-item label="通知标题" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入通知标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考试科目" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入考试科目" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考试时间" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入考试时间" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="考试地点" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入考试地点" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注意事项" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="4" placeholder="请输入注意事项（请携带身份证、准考证等）" v-model="formData.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStoreCancle">取 消</el-button>
                <el-button type="primary" @click="changeStoreForm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 差生提醒弹窗 -->
        <el-dialog :visible.sync="remindVisible" title="差生提醒" width="580px" :close-on-click-modal="false">
            <el-form :model="formData">
                <el-form-item label="学生姓名" :label-width="formLabelWidth">
                    <el-select v-model="valuestudent" multiple placeholder="请选择学生姓名" style="width:100%">
                        <el-option v-for="item in optionstudent" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="通知标题" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" placeholder="请输入通知标题" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="通知详情" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="4" placeholder="请输入通知详情" v-model="formData.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeStoreCancle">取 消</el-button>
                <el-button type="primary" @click="changeStoreForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Addnotification",
        data() {
            return {
                options: [
                    {
                        value: '0',
                        label: '上课通知'
                    },
                    {
                        value: '1',
                        label: '考试通知'
                    },
                    {
                        value: '2',
                        label: '差生提醒'
                    },
                ],
                formData: {
                    name: '',
                    content: '',
                },
                formLabelWidth: '100px',
                storemodel: '',
                changeStoreVisible: false,
                examinationVisible: false,
                remindVisible: false,
                beforeStorageValue: '',
                valuestudent: [],
                optionstudent: [{
                    value: '选项1',
                    label: '学生1'
                }, {
                    value: '选项2',
                    label: '学生2'
                }, {
                    value: '选项3',
                    label: '学生3'
                }],
            };
        },

        methods: {
            changeStoreCancle() {
                this.changeStoreVisible = false
                this.examinationVisible = false
                this.remindVisible = false
            },
            changeStoreForm() {
                console.log(this.storemodel)
                this.changeStoreVisible = false
                this.examinationVisible = false
                this.remindVisible = false
            },
            selectiondata() {
                if (this.storemodel == '0') {
                    this.changeStoreVisible = true
                }
                if (this.storemodel == '1') {
                    this.examinationVisible = true
                }
                if (this.storemodel == '2') {
                    this.remindVisible = true
                }
            }
        },
    };
</script>

<style lang='scss' scoped>
    /deep/.selectCss .el-input__inner {
        border: none;
        background-color: #199fff;
        color: #fff;
        width: 105px;
    }

    /deep/.selectCss .el-input .el-select__caret {
        color: #fff;
    }

    /deep/.el-dialog__body {
        padding: 30px 40px 20px 10px;
    }

    /deep/.selectCss .el-input__inner::-webkit-input-placeholder {
        color: #fff;
    }
    /deep/.el-dialog__footer{
        padding-right: 40px;
    }
</style>