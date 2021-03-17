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

        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height:600px;"></quill-editor>
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
    classTitle: '新建公告',
    dialogVisible: false,
    schoolData: [ ],
     content: '',
            editorOption: {
               placeholder: '编辑文章内容'
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

</style>

