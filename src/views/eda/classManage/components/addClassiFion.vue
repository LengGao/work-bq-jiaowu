<template>
    <div class="class-detail">
        <!-- 上课通知弹窗 -->
        <el-dialog :visible.sync="visible" :title="title" width="600px" :close-on-click-modal="false" @open="handleOpen"
            @closed="resetForm('ruleForm')">
            <el-form :model="ruleForm" ref="ruleForm" :show-message="true" class="formmargin">
                <el-form-item label="通知标题" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.first" placeholder="请输入通知标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课时间" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.keyword1" placeholder="请输入上课时间" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课地点" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.keyword2" placeholder="请输入上课地点" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课老师" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.keyword3" placeholder="请输入上课老师" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.keyword4" placeholder="请输入课程名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="4" placeholder="请输入注意事项（请携带XX教材）" v-model="ruleForm.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hanldeCancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { createMessage, updateMessage } from "@/api/message";
    export default {
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            contractInfo: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            classroom_id: {
                type: [String, Number],
                default: "",
            },
            id: {
                type: [String, Number],
                default: "",
            },
            title: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
            ruleForm: {
                id: "",
                first: "",
                keyword1: "",
                keyword2: "",
                keyword3: "",
                keyword4: "",
                remark: "",
            },
                formLabelWidth: '100px',
                visible: this.value,
                dialogTitle: "添加通知",
            };
        },
        
        watch: {
            value(val) {
                this.visible = val;
            },
        },
        methods: {
            handleOpen() {
                if (this.contractInfo.classroom_id) {
                    for (var i in this.contractInfo) {
                    this.ruleForm = this.contractInfo.content_data;
                    }
                console.log(this.ruleForm)
                }
            },
            hanldeCancel() {
                this.$emit("input", false);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                for (var k in this.ruleForm) {
                    this.ruleForm[k] = "";
                }
                // this.hanldeCancel();
                this.$emit("on-success");
            },
            //添加通知接口
            async createMessage() {
                const data = {
                    classroom_id: this.$route.query.classroom_id,
                    first: this.ruleForm.first,
                    keyword1: this.ruleForm.keyword1,
                    keyword2: this.ruleForm.keyword2,
                    keyword3: this.ruleForm.keyword3,
                    keyword4: this.ruleForm.keyword4,
                    remark: this.ruleForm.remark,
                };
                const res = await createMessage(data);
                // console.log(res.data.data);
                if (res.code == 0) {
                    console.log(res);
                    this.$message.success(res.message);
                    this.hanldeCancel();
                    this.$emit("on-success");
                }
            },
            submitForm(formName) {
                console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.contractInfo.id) {
                            //修改
                            this.updateMessage();
                        } else {
                            //添加
                            this.createMessage();
                        }
                        console.log(this.contractInfo.id)
                    } else {
                        return false;
                    }
                });
            },
            // 编辑微信消息
            async updateMessage() {
                const data = {
                    id: this.contractInfo.id,
                    first: this.ruleForm.first,
                    keyword1: this.ruleForm.keyword1,
                    keyword2: this.ruleForm.keyword2,
                    keyword3: this.ruleForm.keyword3,
                    keyword4: this.ruleForm.keyword4,
                    remark: this.ruleForm.remark,
                };
                console.log(data);
                const res = await updateMessage(data);
                if (res.code == 0) {
                    console.log(res);
                    this.$message.success(res.message);
                    this.$emit("on-success");
                    this.hanldeCancel();
                }
            },


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

    /deep/.el-dialog__footer {
        padding-right: 40px;
    }
  
</style>