<template>
  <div>
    <div class="head_remind">
      *本模块主要是招生老师用来进行日常招生数据的跟进管理，包括学员意向录入、课程缴费报名等操作。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <search2
          :courseTypeShow="true"
          :contentShow="true"
          typeTx="punch"
          api="getHomeclassifiList"
          inputText="教材名称"
          @getTable="getTableList"
        ></search2>
        <div>
          <el-button @click="warehousing">入库</el-button>
          <el-button @click="addClassiFion">出库</el-button>
          <el-button @click="addClassiFion">报损</el-button>
          <el-button type="primary" @click="addClassiFion">添加教材</el-button>
        </div>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="schoolData"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="book_id"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="book_name"
            label="教材名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="chief_editor"
            label="主编"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="book_price"
            label="价格"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="book_isbn"
            label="教材条码ISBN"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="number"
            label="库存数量"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="mobile"
            label="关联业务模板"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="status"
            label="是否启用"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-switch
                active-color="#13ce66"
                v-model="scope.row.account_status"
                :active-value="1"
                :inactive-value="2"
                @change="changeSwitch(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="addClassiFion(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="toTextbookRecord(scope.row)"
                  >查看记录</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div> -->
      </div>
      <!--入库弹框-->
      <el-dialog title="入库" :visible.sync="warehouseVisible" width="50%">
        <span style="margin-right:20px">入库日期</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
        </el-date-picker>
        <span style="margin:0 20px">
          入库备注
        </span>
        <el-input class="input-width"></el-input>
        <el-button style="margin-left:20px" @click="teachingMaterialDialog"
          >选择添加教材</el-button
        >
        <div>
          <el-table
            ref="multipleTable"
            :data="schoolData"
            tooltip-effect="light"
            stripe
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:20px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            class="min_table"
          >
            <!-- <el-table-column
              prop="course_id"
              label="序号"
              show-overflow-tooltip
              min-width="90"
            ></el-table-column> -->
            <el-table-column
              prop="course_name"
              label="教材名称"
              min-width="200"
              column-key="course_id"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="category_name"
              label="所属分类"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="class_type_name"
              label="价格"
              min-width="100"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="course_price"
              label="库存"
              min-width="80"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="course_price"
              label="入库数量"
              min-width="80"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="course_price"
              label="操作"
              min-width="80"
              show-overflow-tooltip
            >
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-table-column>
          </el-table>
          <div
            style="display:flex;justify-content:space-between;aligin-item:center"
          >
            <el-button type="text">+ 继续添加</el-button>
            <div style="padding-top:10px">合计: 710</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="warehouseVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!--添加教材弹框-->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
        <el-form label-width="100px">
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="教材名称">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="所属分类">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="主编姓名">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="价格">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="教材条码">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="出版社">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="12" :sm="12" :xs="12" :md="12">
              <el-form-item label="初始数量">
                <el-input
                  placeholder="请输入分类名称"
                  v-model="addClassify.index_category_name"
                  class="input-width"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12" :sm="12" :xs="12" :md="12"> </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolData: [{ index_category_name: 1, course_name: 'dfd' }],
      index_category_id: '',
      dialogTitle: '',
      addClassify: {
        index_category_name: '',
        sort: '',
      },
      datas: {},
      url: '',
      pictureVisible: false,
      haschoose: false,
      page: 1,
      dialogVisible: false,
      warehouseVisible: false,
    }
  },

  created() {
    this.$api.getTeachBooksList(this, 'schoolData')
  },

  methods: {
    teachingMaterialDialog() {},
    warehousing() {
      this.warehouseVisible = true
    },
    toTextbookRecord() {
      this.$router.push({
        path: '/sou/textbookRecord',
        query: {},
      })
    },
    // doPageChange(page) {
    //   this.page = page
    //   this.$api.getHomeclassifiList(this, 'schoolData', this.datas)
    // },
    // 获取数据
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    topayment(zx) {
      //   this.dialogTitle = '编辑首页分类'
      //   console.log(zx)
      //   this.dialogVisible = true
      //   this.haschoose = true
      //   this.index_category_id = zx.index_category_id
      //   this.$api.getHomeclassifiDetail(this, this.index_category_id)
    },
    scopes(index_category_id, sorts) {
      //   var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      //   var re = new RegExp(regu)
      //   if (!re.test(sorts)) {
      //     this.$message.error('请输入正确的排序！')
      //     return false
      //   } else {
      //     this.$api.updateHomeClassifiSort(index_category_id, sorts, this)
      //   }
    },

    addClassiFion() {
      this.dialogTitle = '添加分类'
      //   for (let key in this.addClassify) {
      //     this.addClassify[key] = ''
      //   }
      //   this.url = ''
      //   this.haschoose = false
      this.dialogVisible = true
    },
    handleConfirm() {
      //   console.log(this.index_category_id == '')
      //   if (this.index_category_id == '' || this.index_category_id == undefined) {
      //     this.$api.addHomeCategory(this, 'addClassify')
      //   } else {
      //     this.$api.modifyHomeCategory(this, this.index_category_id)
      //   }
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
.input-width {
  width: 240px;
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
.imgBox_warn {
  line-height: 30px;
  padding-top: 10px;
  color: #aaa;
}
.headPortrait {
  width: 87px;
  height: 87px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #3333;
  border: 1px solid rgba(220, 223, 230, 1);
  border-radius: 5px;
}
.headPortrait:hover {
  border: 1px solid rgba(240, 240, 240, 1);
  cursor: pointer;
}
.imageBox {
  width: 87px;
  height: 87px;
  position: relative;
}

.iconjia {
  font-size: 40px;
  color: #fff;
  display: none;
  position: absolute;
  width: 87px;
  height: 87px;
  line-height: 87px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}

.imageBox:hover i {
  display: block;
}
</style>
