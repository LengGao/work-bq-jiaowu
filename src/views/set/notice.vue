<template>
    <div>
     <div class="head_remind">
      *可向全体员工或指定角色身份员工推送通知公告。
    </div>

     <section class="mainwrap">
         <div class="client_head">
        <search2
          :contentShow="true"
          api="getHomeclassifiList"
          inputText="通知标题"
    
        ></search2>
        <el-button type="primary" @click="dialogVisible = true">新建通知</el-button>
       
      </div>

      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          tooltip-effect="light"
          stripe
          
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="title"
            label="通知标题"
            min-width="180"
            column-key="role_id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="digest"
            label="内容摘要"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="receiver_name"
            label="通知对象"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="sent"
            label="是否推送"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="editNotice(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text"  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
                <el-button type="text"
                  >发送记录</el-button
                >
              </div>
            </template>            
          </el-table-column>


          <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination>
        </el-table>
      </div>

      <el-dialog
        :title="classTitle"
        :visible.sync="dialogVisible"
        width="45%"
        >
         <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="通知标题" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入通知标题" style="width:300px"></el-input>
            </el-form-item>

        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="display:block;height:280px;margin-bottom:40px"></quill-editor>

           <el-form-item label="内容摘要" prop="abstract" style="margin-top:80px;">
              <el-input v-model="ruleForm.abstract" placeholder="请输入内容摘要" style="width:100%;"></el-input>
            </el-form-item>

              <div class="abstract">
            <el-form-item label="接受范围" prop="abstract">
             <el-radio-group v-model="radio2" @change="change">
            <el-radio :label="1">全部员工</el-radio>
            <el-radio :label="2">指定角色</el-radio>
          </el-radio-group>
          <el-select v-model="value1" multiple placeholder="请选择" v-if="radio2 !== 1">
                 <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
          </el-select>
            </el-form-item>
            </div>

             <div class="abstract">
            <el-form-item label="是否发送短信" prop="abstract" class="abstract" style="width:400px">
             <el-radio-group>
            <el-radio v-model="radio2" label="1">是</el-radio>
            <el-radio v-model="radio2" label="1" >否</el-radio>
          </el-radio-group>
            </el-form-item>
             </div>

            </el-form>
    </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        
      </el-dialog>
     </section>
    </div>

</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    name: 'role',

    data() {
    return {

      options: [{
          value: '选项1',
          label: '校长'
        }, {
          value: '选项2',
          label: '招生'
        }, {
          value: '选项3',
          label: '教务'
        }],
         value1: [],

    radio2: 1,
    inputValue: '',
    radio: '0',
    classTitle: '新建公告',
    dialogVisible: false,
    schoolData: [ ],
    content: '',
            editorOption: {
            placeholder: '编辑公告内容'
            },
    ruleForm: {
      type:[],
    },
    rules: {
      name: [
            { required: true, message: '请输入通知标题', trigger: 'blur' },
          ],
      abstract: [
            { required: true, message: '请输入公告摘要', trigger: 'blur' },
          ],
      
      type: [
            { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],
    },
    }
  },

  components: {
    quillEditor
  },

   mounted() {
    // let status = 3
    this.$api.noticelist(this, 'schoolData')
  },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      change(val){
          console.log(val, 'val');
        console.log(this.inputValue, 'input的值');
      },

      handleDelete(ab) {
        console.log(ab)
      this.$confirm('此操作将删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deletenoticelist(this, ab.id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    editNotice(ab) {
      console.log(ab)
      this.classTitle = '编辑公告'
      this.ruleForm = ab
      this.dialogVisible = true
    },
      doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.noticelist(this, 'schoolData', this.datas)
    },
     onEditorChange({ editor, html, text }) {
            this.content = html;
        },

  },

}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item{
  margin-bottom:10px;
}
/deep/.el-dialog__header{
  background: #f1f1f1;
}
/deep/.el-form-item__content{
  width: 50%;
}
/deep/.el-radio__input.is-checked + .el-radio__label{
  margin-right: 10px;
}

.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.add-role{
    float: right;
    margin-bottom: 20px;
}
.client_head{
  display:flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.abstract{
  width: 50%;
 float: left;
}


</style>

