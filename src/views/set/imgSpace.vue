<template>
  <div class="home">
    <section>
      <ul class="left-container">
        <li style="color:#909399">
          图片分组
          <i class="el-icon-circle-plus-outline" @click="addVideo"></i>
        </li>
        <li style=" cursor: pointer;" @click="imgSplit()">
          全部图片({{ list }})
        </li>
        <li v-for="(item, index) of spaceList.list" :key="index" style=" cursor: pointer;" @click="imgSplit(item.bucket_id, index)" :class="{ activeColor: colorIndex === index }">
          {{ item.name }}--({{ item.imageTotal }})
          <i class="el-icon-delete" @click.stop.prevent="sapceDelete(item)"></i>
          <i class="el-icon-edit" @click.stop.prevent="sapceEditor(item)"></i>
        </li>
      </ul>
    </section>
    <section class="right-container">
      <header>
        <div class="left-zoom">
          <search :hideTime="true" :hideOtherOption="true" :searchType="info" api="getImagesList" data="imgData" @getTable="getTableList" :bucket_id="bucket_id"></search>
          <div>
            <el-button type="primary" style="margin-left:20px" @click="SingleUpload">上传图片</el-button>
          </div>
        </div>
        <div class="userTable" style="margin-top:20px">
          <el-table ref="multipleTable" :data="imgData" style="width: 100%" class="min_table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="images_name" label="图片名称" show-overflow-tooltip min-width="70" align="center"></el-table-column>
            <el-table-column prop="width_height" label="尺寸" min-width="210" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="size" label="大小" min-width="150" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="create_time" label="上传时间" min-width="150" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="图片预览" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <div style="width:50px ;height:50px">
                  <img :src="scope.row.url" alt class="school_class_box" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="180" align="center">
              <template slot-scope="scope">
                <div style="display:flex;justify-content:space-around">
                  <el-button type="text" @click="editor(scope.row)">编辑</el-button>
                  <el-button type="text" @click="transform(scope.row)">移动</el-button>
                  <el-button type="text" @click="download(scope.row)">下载</el-button>
                  <el-button type="text" @click="delbtn(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </header>
      <div class="table_bottom">
        <div>
          <el-button type="warning" @click="multiTransforms">批量移动</el-button>
          <el-button type="danger" @click="multiDel">批量删除</el-button>
          <el-button type="primary" @click="multiDownLoad" :loading="downStatus">批量下载</el-button>
        </div>
        <page :data="total" :pageSize="10" :curpage="page" @pageChange="doPageChange" />
      </div>
      <main></main>
      <el-dialog title="添加图片分组" :visible.sync="dialogVisible" width="30%">
        <el-form :model="addPicture" ref="reasonForm" label-width="150px">
          <el-form-item label="分组名称：">
            <el-input v-model="addPicture.name" class="input-width"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑图片" :visible.sync="dialogEditor" width="30%">
        <el-form label-width="150px">
          <el-form-item label="图片名称：">
            <el-input v-model="imgName" class="input-width"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditor = false">取 消</el-button>
          <el-button type="primary" @click="EditorConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="移动图片" :visible.sync="dialogTransform" width="30%">
        <el-form>
          <el-form-item label="图片分组：">
            <el-select v-model="value" clearable filterable>
              <el-option v-for="(item, index) in spaceList.list" :key="index" :label="item.name" :value="item.bucket_id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTransform = false">取 消</el-button>
          <el-button type="primary" @click="transformConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="上传图片" :visible.sync="dialogUpload" width="30%">
        <el-form :model="createVideo" ref="reasonForm" label-width="150px">
          <el-form-item label="图片分组：">
            <el-select v-model="ruleForm.bucket_id" clearable filterable>
              <el-option v-for="(item, index) in spaceList.list" :key="index" :label="item.name" :value="item.bucket_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片上传：">
            <SingleUpload ref="mychild" :ruleForm="ruleForm" @imgSuccess="imgSuccess" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpload = false">取 消</el-button>
          <el-button type="primary" @click="uploadConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑空间" :visible.sync="dialogSpace" width="30%">
        <el-form :model="sapceEditors" ref="reasonForm" label-width="150px">
          <el-form-item label="空间名称：">
            <el-input v-model="sapceEditors.name" class="input-width"></el-input>
          </el-form-item>
          <!-- <el-form-item label="空间排序：">
            <el-select v-model="keytype" slot="prepend">
              <el-option
                :label="item.name"
                :value="item.val"
                v-for="(item,index) in selectList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSpace = false">取 消</el-button>
          <el-button type="primary" @click="spaceConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>
<script>
const defaultcreateVideo = {
  name: null,
  sort: 0,
  class: 'haha',
}
const defaultAddPicture = {
  name: null,
}
export default {
  name: 'imgSpace',
  data() {
    return {
      ruleForm: {
        bucket_id: '',
      },
      info: 'info',
      dialogVisible: false,
      dialogEditor: false,
      dialogTransform: false,
      dialogUpload: false,
      addPicture: Object.assign({}, defaultAddPicture),
      selectList: [
        {
          value: '职称类',
          val: 1,
        },
      ],
      sapceEditors: {
        name: '',
        bucket_id: '',
      },
      imgId: [],
      total: 12,
      bucket_id: '',
      page: 1,
      imgData: [],
      createVideo: Object.assign({}, defaultcreateVideo),
      multipleSelection: [],
      list: '23',
      spaceList: {
        list: [
          { name: '姓名', bucket_id: 1 },
          { name: '手机号码', bucket_id: 2 },
        ],
      },
      keytype: 1,
      dialogSpace: false,
      imgArr: '',
      value: '',
      multiTransform: [],
      multiDels: [],
      multiTransformConfirm: [],
      mutiSelectTrans: 0,
      imgName: '',
      imgSingleId: '',
      colorIndex: -1,
      downStatus: false,
    }
  },
  created() {
    this.$api.getBucketList(this, 'spaceList') //左侧列表
    this.$api.getImagesList(this, 'imgData') //右侧列表
  },
  mounted() {
    console.log(this.spaceList)
  },
  methods: {
    imgSuccess() {
      this.dialogUpload = false
      this.$api.getBucketList(this, 'spaceList') //左侧列表
      this.$api.getImagesList(this, 'imgData') //右侧列表
    },
    currOperatorChange(val) {
      this.$forceUpdate()
      //  console.log('操作发生变化：',val)
      //  if (val) {
      //   let obj = this.spaceList.list.findIndex(item => {
      //     //这里的operateOption就是上面遍历的数据源
      //     return item.bucket_id === val //筛选出匹配数据
      //   })
      //   let data = this.spaceList.list.find(item => {
      //     //这里的operateOption就是上面遍历的数据源
      //     return item.bucket_id === val //筛选出匹配数据
      //   })
      //   console.log(obj,data.name)
      //   this.name = data.name
      //   this.$set(this.spaceList.list[obj], 2 , data.name)
      // }
    },
    // 获取数据
    getTableList(state, val) {
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.imgData = val
      }
    },
    sapceDelete(data) {
      console.log(data)
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteBucket(this, data.bucket_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    sapceEditor(item) {
      console.log(item)
      this.sapceEditors.name = ''
      this.sapceEditors.bucket_id = ''
      this.sapceEditors.name = item.name
      this.sapceEditors.bucket_id = item.bucket_id
      this.dialogSpace = true
    },
    download(item) {
      console.log(item)

      this.imgArr = ''
      this.imgArr += item.image_id
      this.$api.downloadImages(this, 'imgArr')
    },
    transformConfirm() {
      console.log(this.mutiSelectTrans)
      if (this.mutiSelectTrans == 1) {
        for (let item of this.multiTransform) {
          this.multiTransformConfirm.push(item.image_id)
        }
        this.$api.mvImages(this, 'multiTransformConfirm')
      } else {
        console.log(this.imgId)
        this.$api.mvImages(this, 'imgId')
      }
    },
    editor(data) {
      console.log(data)
      this.imgName = data.images_name
      this.imgSingleId = data.image_id
      this.dialogEditor = true
    },
    SingleUpload() {
      this.dialogUpload = true
    },
    EditorConfirm() {
      if (this.imgName == '') {
        self.$message({
          type: 'error',
          message: '名称不可为空!',
        })
        return
      }
      this.$api.updateImage(this)
    },
    multiDownLoad() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      let imgId = ''
      for (let item of this.multipleSelection) {
        imgId += item.image_id + ','
      }
      // this.downStatus = true
      this.imgId = imgId
      this.$api.downloadImages(this, 'imgId')
    },
    addVideo() {
      this.dialogVisible = true
    },
    handleConfirm() {
      this.$api.insertBucket(this, 'addPicture')
    },
    doPageChange(page) {
      this.page = page
      this.$api.getImagesList(this, 'imgData')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multiTransform = val
      this.multiDels = val
      console.log(this.multipleSelection)
    },
    transform(data) {
      this.imgId.length = 0
      this.imgId.push(data.image_id)
      this.dialogTransform = true
    },
    multiDel() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.$confirm('确定要删除所选分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.imgId.length = 0
          for (let item of this.multiDels) {
            this.imgId.push(item.image_id)
          }
          this.$api.deleteImages(this, 'imgId')
        })
        .catch(() => {})
    },
    multiTransforms() {
      if (this.multiTransform.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.dialogTransform = true
      this.mutiSelectTrans = 1
    },
    delbtn(data) {
      console.log(data)
      this.$confirm('确定要删除当前图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          ;(this.imgId.length = 0), this.imgId.push(data.image_id)
          this.$api.deleteImages(this, 'imgId')
        })
        .catch(() => {})
    },
    uploadConfirm() {
      this.$refs.mychild.submitUpload('嘿嘿嘿')
    },
    imgSplit(id, index) {
      this.colorIndex = index
      this.bucket_id = ''
      this.bucket_id = id
      this.$api.getImagesList(this, 'imgData')
    },
    spaceConfirm(id) {
      console.log(this.sapceEditors)
      this.$api.updateBucket(this, 'sapceEditors')
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select .el-select--medium .el-input__inner {
  width: 200px;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.el-icon-delete {
  font-size: 16px;
  float: right;
  line-height: 48px;
  color: #b9bbbd;
  margin-right: 20px;
  margin-left: 10px;
}
.el-icon-edit {
  font-size: 16px;
  float: right;
  color: #bdbebe;
  line-height: 48px;
}
.el-icon-circle-plus-outline {
  font-size: 20px;
  float: right;
  line-height: 48px;
  color: #199fff;
  padding-right: 20px;
  cursor: pointer;
}
.el-select .el-input__inner:nth-child(1) {
  color: #fff;
  //  background: #199FFF;
  width: 110px;
}
.home {
  display: flex;
  background: #ffffff;
  padding: 30px;
  font-size: 14px;
}
.left-container {
  width: 287px;
  height: 100%;
  min-height: 500px;
  border: 1px solid rgba(215, 215, 215, 1);
  .activeColor {
    background-color: #f6fbff;
    color: #298adb;
  }
  li {
    list-style: none;
    height: 48px;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    line-height: 48px;
    padding-left: 20px;
    color: #7f7f7f;
  }
}

.right-container {
  display: flex;
  flex-direction: column;
  margin-left: 23px;
  flex: 1;
  margin-right: 35px;
  overflow: hidden;
}
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  .left-zoom {
    display: flex;
    justify-content: space-between;
  }
}
.table_bottom {
  display: flex;
  justify-content: space-between;
}
</style>
