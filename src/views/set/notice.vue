<template>
  <div>
    <div class="head_remind">
      *可向全体员工或指定角色身份员工推送通知公告。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="addClassiFion"
          >新建通知</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
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
            label="是否推送"
            min-width="180"
            show-overflow-tooltip
          > <template slot-scope="{row}">
              <div 
              :class ="row.sent==1?'wordcolor':''">
              {{noticeMap[row.sent] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display: flex; justify-content:center;">
                <el-button type="text" @click="editNotice(scope.row)"
                 :class="scope.row.sent==1?'details':''"
                  >编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)"
                 :class="scope.row.sent==1?'details':''"
                  >删除</el-button>
                <el-button type="text"
                :class="scope.row.sent==0?'details':''"
                @click="viewdetails(scope.row)"
                >查看详情</el-button>
              </div>
            </template>
          </el-table-column>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-table>
          <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            class="demo-ruleForm">
            <el-form-item label="通知标题" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入通知标题"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <quill-editor
              ref="myTextEditor"
              v-model="ruleForm.content"
              prop="content"
              :options="editorOption"
              style="display:block;height:280px;margin-bottom:40px;margin-top:20px"
            ></quill-editor>
            <el-form-item
              label="内容摘要"
              prop="digest"
              style="margin-top:80px;">
              <el-input
                v-model="ruleForm.digest"
                placeholder="请输入内容摘要"
                style="width:100%;"
              ></el-input>
            </el-form-item>
            <div class="abstract">
              <el-form-item label="通知对象" prop="receiver">
                <el-select
                  v-model="ruleForm.receiver"
                  multiple 
                  placeholder="请选择账号身份（可多选）">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="发送短信">
                <el-radio-group v-model="ruleForm.send_sms">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                  <!-- <el-radio :label="3">指定校区</el-radio> -->
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button>
        </span>
      </el-dialog>

      <!-- 弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible2" width="45%">
        <div :model="ruleForm" :rules="rules" ref="ruleForm">
          <h3 class="detailtitle">
            {{ruleForm.title}}
          </h3>
          <div class="notictitle">
            <p>发布时间：{{ruleForm.update_time}}</p>
            <p>发布人：</p>
            <p>已读人数 </p>
          </div>
          <div class="noticontent">
            {{ruleForm.content}}
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button>
        </span>
      </el-dialog> 
    </section>
  </div>
</template>

<script>
import { noticelist,noticecreate,noticeupdate,getReceiverSelect,noticedelete,noticeinfo } from '@/api/system'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'role',
  data() {
    return {

      noticeMap: {
        1: "已推送",
        0: "未推送",
      },
      // 搜索框
      searchOptions: [
        {
          key: 'search_box',
          attrs: {
            placeholder: '标题名称',
            clearable: true,
          },
        },
      ],
      options:[],
       //搜索数据
      searchData: {
        category_id: [],
        search_box: '',
      },
      listData:[],
      selectData: [],
      pageNum: 1,
      listTotal: 0,
      value1: [],
      radio2: 1,
      listTotal: 0,
      inputValue: '',
      dialogTitle: '',
      dialogVisible: false,
      dialogVisible2: false,
      schoolData: [],
      content: '',
      applay: '',
      editorOption: {
        placeholder: '编辑公告内容',
      },
      ruleForm: {
        type: [],
        datatime:''
      },
      rules: {
        title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
        abstract: [
          { required: true, message: '请输入公告摘要', trigger: 'blur' },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个',
            trigger: 'change',
          },
        ],
      },
    }
  },
  components: {
    quillEditor,
  },
  created() {
    this.noticelist()
    this.getReceiverSelect()
    // this.noticeinfo()
  },
  methods: {
    //通知公告列表接口
    async noticelist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      }
      const res = await noticelist(data)
     console.log( res.data.list)
      this.listData = res.data.list
      this.listTotal = res.data.total
    },
    //添加公告接口
    async noticecreate() {
      const data = {
        title:this.ruleForm.title,
        content:this.ruleForm.content,
        digest:this.ruleForm.digest,
        send_sms:this.ruleForm.send_sms,
        send_wechat:this.ruleForm.send_wechat,
        receiver:this.ruleForm.receiver,  
      }
      const res = await noticecreate(data)
      console.log( res.data.list)
      if(res.code==0){
          console.log( res)
          this.$message.success(res.message)
          this.noticelist()
        }
    },
    //通知对象接口
    async getReceiverSelect() {
      const data = {
      }
      console.log(data)
      const res = await getReceiverSelect(data)
      console.log(res.data)
      if(res.code==0){
        this.options = res.data
        }
    },
    //编辑公告接口
    async noticeupdate() {
      const data = {
        id:this.ruleForm.id,
        title:this.ruleForm.title,
        content:this.ruleForm.content,
        digest:this.ruleForm.digest,
        send_sms:this.ruleForm.send_sms,
        send_wechat:this.ruleForm.send_wechat,
        receiver:this.ruleForm.receiver,  
      }
     const res = await noticeupdate(data)
     console.log( res.data.list)
      if(res.code==0){
          console.log( res)
          this.$message.success(res.message)
          this.noticelist()
          this.dialogVisible = false
        }
    },
    //删除公告接口
    async noticedelete(id) {
      const data = {
        id,
      }
      console.log(data)
      const res = await noticedelete(data)
       if(res.code==0){
          console.log( res)
          this.$message.success(res.message)
           this.noticelist()
          this.dialogVisible = false
        }
        this.noticelist()
    },
    //公告详情
    async noticeinfo() {
      const data = {
        id:this.ruleForm.id,
      }
      console.log(data)
      const res = await noticeinfo(data)
       if(res.code==0){
          console.log( res)
          this.$message.success(res.message)
          this.noticeinfo()
          this.dialogVisible = false
        }
        this.noticelist()
    },
    cloneData(data, newData) {
      data.forEach((item, index) => {
        newData[index] = {}
        newData[index].value = item.category_id
        newData[index].label = item.category_name
        if (item.son && item.son.length) {
          newData[index].children = []
          this.cloneData(item.son, newData[index].children)
        }
      })
    },
     //搜索功能
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = data;
      this.noticelist();
    },
    addClassiFion() {
        this.dialogTitle = '新建公告'
        this.ruleForm = {
        title:'',
        content:'',
        digest:'',
        send_sms: '',
        send_wechat: '',
        receiver:''
      }
      this.dialogVisible = true
    },
      editNotice(ab) {
      console.log(ab)
      this.dialogTitle = '编辑公告'
      this.ruleForm = ab
      this.dialogVisible = true
      this.id = ab.id
    },

    viewdetails(ab) {
      console.log(ab)
      this.dialogTitle = '公告详情'
      this.ruleForm = ab
      this.dialogVisible2 = true
      this.id = ab.id
    },
    submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if (this.ruleForm.id) {
            //修改
            this.noticeupdate()
          } else {
            //添加分类
            this.noticecreate()
            this.dialogVisible = false
          }
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     handleDelete(row) {
         this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.noticedelete(row.id)
                 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    doPageChange(page) {
      this.page = page
      this.$api.noticelist(this, 'schoolData', this.datas)
    },
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.noticelist();
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
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.el-dialog__header {
  background: #f1f1f1;
}
/deep/.el-form-item__content {
  width: 50%;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
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
.add-role {
  float: right;
  margin-bottom: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.abstract {
  width: 50%;
  float: left;
}
.table_bottom{
  text-align: right;
}
.wordcolor{
  color:rgb(0, 146, 44);
}
.details{
  display: none;
}
.detailtitle{
  font-size:30px;
  font-weight: normal;
  color: #333;
  text-align: center;
}
.notictitle{
  display: flex;
  justify-content: center;
  margin:30px 0; font-size: 16px;
}
.notictitle p{
    width:33%;
  }
.noticontent{
  border: 1px solid rgb(231, 230, 230);
  padding: 40px 30px;
}
</style>
