<template>
  <div class="home">
    <section>
      <ul class="left-container">
        <li style="color:#909399">
          章节名称
          <i class="el-icon-circle-plus-outline" @click="addVideo"></i>
        </li>
        <li style=" cursor: pointer;" @click="imgSplit()">
          全部课时({{ spaceList.all_class_number }})
        </li>
        <li style=" cursor: pointer;" @click="imgSplit(0, '')">
          未分类课时({{ spaceList.nochapter_class_number }})
        </li>
        <li
          v-for="(item, index) of spaceList.data"
          :key="index"
          style=" cursor: pointer;overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
          @click="imgSplit(item.video_chapter_id, index)"
          :class="{ activeColor: colorIndex === index }"
          :title="item.video_chapter_name"
        >
          <span
            style="width: 195px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; float: left; cursor: pointer;"
            >{{ item.video_chapter_name }}--({{
              item.video_class_number
            }})</span
          >
          <i class="el-icon-delete" @click.stop.prevent="sapceDelete(item)"></i>
          <i class="el-icon-edit" @click.stop.prevent="sapceEditor(item)"></i>
        </li>
      </ul>
    </section>
    <section class="right-container">
      <header>
        <div class="left-zoom">
          <search
            :hideTime="true"
            :hideOtherOption="true"
            :searchType="info"
            api="getvideoclass"
            @getTable="getTableList"
            :bucket_id="bucket_id"
          ></search>
          <div>
            <el-button
              type="primary"
              style="margin-left:20px"
              @click="SingleUpload"
              >添加课时</el-button
            >
          </div>
        </div>
        <div class="userTable" style="margin-top:20px">
          <el-table
            ref="multipleTable"
            :data="videoData.data"
            style="width: 100%"
            class="min_table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="60"
              align="center"
            ></el-table-column>
            <el-table-column
              type="index"
              label="课时序号"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="video_class_name"
              label="课时名称"
              show-overflow-tooltip
              min-width="150"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="video_class_coverurl"
              label="视频缩略图"
              min-width="100"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="video_class_duration"
              label="时长"
              min-width="90"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="排序" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-col :span="12">
                  <el-input
                    v-model="scope.row.video_chapter_sort"
                    placeholder
                    size="small"
                    @blur="scopes(scope.row, scope.row.video_chapter_sort)"
                  ></el-input>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column
              prop="video_class_free"
              label="是否免费"
              min-width="80"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.video_class_free"
                  :active-value="2"
                  :inactive-value="1"
                  @change="switchStatus(scope.row, scope)"
                ></el-switch>
              </template>
            </el-table-column>
            <!-- <el-table-column label="图片预览" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <div style="width:50px ;height:50px">
                  <img :src="scope.row.url" alt class="school_class_box" />
                </div>
              </template>
            </el-table-column>-->
            <el-table-column
              label="操作"
              fixed="right"
              min-width="180"
              align="center"
            >
              <template slot-scope="scope">
                <div style="display:flex;justify-content:space-around">
                  <el-button type="text" @click="editor(scope.row)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="transform(scope.row)"
                    >移动</el-button
                  >
                  <el-button type="text" @click="delbtn(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </header>
      <div class="table_bottom">
        <div>
          <el-button type="warning" @click="multiTransforms"
            >批量移动</el-button
          >
          <el-button type="danger" @click="multiDel">批量删除</el-button>
        </div>
        <page
          :data="videoData.total"
          :pageSize="videoData.limit"
          :curpage="page"
          @pageChange="doPageChange"
        />
      </div>
      <main></main>
      <el-dialog title="添加图片分组" :visible.sync="dialogVisible" width="30%">
        <el-form :model="addPicture" ref="reasonForm" label-width="150px">
          <el-form-item label="分组名称：">
            <el-input v-model="addPicture.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="章节排序：">
            <el-input
              v-model="addPicture.sort"
              class="input-width"
              placeholder="数值越大越靠前"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑课时" :visible.sync="dialogEditor" width="30%">
        <el-form :model="createVideo" ref="reasonForm" label-width="150px">
          <el-form-item label="章节名称：">
            <el-select
              v-model="editvideo.video_chapter_id"
              clearable
              filterable
            >
              <el-option
                v-for="(item, index) in spaceList.data"
                :key="index"
                :label="item.video_chapter_name"
                :value="item.video_chapter_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课时名称：">
            <el-input
              v-model="editvideo.video_class_name"
              class="input-width"
              placeholder="请输入课时名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="课时排序：">
            <el-input
              v-model="editvideo.video_class_sort"
              class="input-width"
              placeholder="排序数字越小课时越靠前最小值为1"
            ></el-input>
          </el-form-item>
          <el-form-item label="视频上传：">
            <videoUpload
              ref="mychild"
              :videoName="editvideo.media_name"
              editor="ediotr"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditor = false">取 消</el-button>
          <el-button type="primary" @click="EditorConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="移动课时到："
        :visible.sync="dialogTransform"
        width="30%"
      >
        <el-form>
          <el-form-item label="章节名称：">
            <el-select v-model="transvideo_chapter_id" clearable filterable>
              <el-option
                v-for="(item, index) in spaceList.data"
                :key="index"
                :label="item.video_chapter_name"
                :value="item.video_chapter_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTransform = false">取 消</el-button>
          <el-button type="primary" @click="transformConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加课时" :visible.sync="dialogUpload" width="30%">
        <el-form :model="createVideo" ref="reasonForm" label-width="150px">
          <el-form-item label="章节名称：">
            <el-select v-model="ruleForm.video_chapter_id" clearable filterable>
              <el-option
                v-for="(item, index) in spaceList.data"
                :key="index"
                :label="item.video_chapter_name"
                :value="item.video_chapter_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课时名称：">
            <el-input
              v-model="video_class_name"
              class="input-width"
              placeholder="请输入课时名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="课时排序：">
            <el-input
              v-model="video_class_sort"
              class="input-width"
              placeholder="排序数字越小课时越靠前最小值为1"
            ></el-input>
          </el-form-item>
          <el-form-item label="视频上传：">
            <videoUpload ref="mychild" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpload = false">取 消</el-button>
          <el-button type="primary" @click="uploadConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑名称" :visible.sync="dialogSpace" width="30%">
        <el-form :model="sapceEditors" ref="reasonForm" label-width="150px">
          <el-form-item label="空间名称：">
            <el-input
              v-model="sapceEditors.name"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="空间排序：">
            <el-input
              v-model="sapceEditors.sort"
              class="input-width"
            ></el-input>
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
  sort: '',
}
export default {
  name: 'imgSpace',
  inject: ['reload'],
  data() {
    return {
      ruleForm: {
        video_chapter_id: '',
      },
      video_chapter_id: '',
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
        video_chapter_id: '',
        sort: '',
      },
      imgId: [],
      total: 12,
      bucket_id: '',
      page: 1,
      videoData: [],
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
      video_collection_id: '',
      video_class_sort: '',
      video_class_name: '',
      spaceData: '',
      editvideo: [],
      singleImgId: '',
      video_class_id: '',
      transFormId: '',
      transvideo_chapter_id: '',
    }
  },
  created() {
    this.video_collection_id = this.$route.query.video_collection_id
    this.$api.getvideochapter(this, 'spaceList') //左侧列表
    this.$api.getvideoclass(this, 'videoData') //右侧列表
  },
  mounted() {
    console.log(this.spaceList)
  },
  methods: {
    switchStatus(ab) {
      console.log(ab)
      console.log(ab.video_class_free)
      console.log(ab.video_class_free == 1)
      // if (ab.video_class_free == 1) {
      //   this.video_class_free = 2
      // } else {
      //   this.video_class_free = 1
      // }
      // console.log(this.video_class_free)
      this.$api.addvideochapterfree(this, ab)
      // if (ab == 1) {
      //   this.ruleForm.video_class_free = ab
      //   this.$api.addvideochapter(this, 'addPicture')
      // }
    },
    //排序
    scopes(ab, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      var obj = {}
      var key = ab.video_chapter_id + ''
      var value = sorts - 0
      obj[key] = value
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        //对应接口
        this.$api.videoChapterSort(obj, this)
      }
    },
    imgSuccess() {
      this.dialogUpload = false
      this.$api.getvideochapter(this, 'spaceList') //左侧列表
      this.$api.getImagesList(this, 'videoData') //右侧列表
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
      console.log(val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        console.log(val)
        this.videoData = val
      }
    },
    sapceDelete(data) {
      console.log(data)
      this.$confirm('删除章节后章节包含的课时也会被删除，请谨慎操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deletevideochapter(this, data.video_chapter_id)
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
      this.sapceEditors.video_chapter_id = ''
      this.sapceEditor.sort = ''
      this.sapceEditors.name = item.video_chapter_name
      this.sapceEditors.sort = item.video_chapter_sort
      this.sapceEditors.video_chapter_id = item.video_chapter_id
      this.dialogSpace = true
    },
    transformConfirm() {
      console.log(this.mutiSelectTrans)
      this.multiTransformConfirm.length = 0
      if (this.mutiSelectTrans == 1) {
        for (let item of this.multiTransform) {
          this.multiTransformConfirm.push(item.video_class_id)
        }
        this.$api.mutilbatchmovevideoclass(this, 'multiTransformConfirm')
      } else {
        this.$api.batchmovevideoclass(this)
      }
    },
    editor(data) {
      console.log(data)
      this.imgName = data.images_name
      this.imgSingleId = data.image_id
      this.dialogEditor = true
      this.spaceData = data
      this.$api.editvideoclass(this)
    },
    SingleUpload() {
      this.dialogUpload = true
    },
    EditorConfirm() {
      // this.$api.editVideoSuccess(this);
      this.$refs.mychild.submitUpload('嘿嘿嘿')
    },
    addVideo() {
      this.dialogVisible = true
    },
    handleConfirm() {
      this.$api.addvideochapter(this, 'addPicture')
    },
    doPageChange(page) {
      this.page = page
      this.$api.getImagesList(this, 'videoData')
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      this.multiTransform = val
      this.multiDels = val
      console.log(this.multipleSelection)
    },
    transform(data) {
      console.log(data)
      this.transFormId = ''
      this.transFormId = data.video_class_id
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
            this.imgId.push(item.video_class_id)
          }
          this.$api.multideleteVideo(this, 'imgId')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    multiTransforms() {
      if (this.multiTransform.length == 0) {
        this.$message({
          message: '请先勾选操作选项！',
          type: 'warning',
        })
        return
      }
      this.transvideo_chapter_id = ''
      this.dialogTransform = true
      this.mutiSelectTrans = 1
    },
    delbtn(data) {
      console.log(data)
      this.$confirm('确定要删除当前课时吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // (this.imgId.length = 0), this.imgId.push(data.video_class_id);
          this.singleImgId = data.video_class_id
          this.$api.deletevideoclass(this)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    uploadConfirm() {
      this.$refs.mychild.submitUpload('嘿嘿嘿')
    },
    imgSplit(id, index) {
      console.log(id)
      this.colorIndex = index
      this.video_chapter_id = ''
      this.video_chapter_id = id
      this.$api.getvideoclass(this, 'videoData') //右侧列表
    },
    spaceConfirm(id) {
      console.log(this.sapceEditors)
      this.$api.editvideochapter(this, 'sapceEditors')
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
  // margin: 23px 0px 0px 23px;
  // padding: 23px 0px 23px 23px;

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
  margin-left: 23px;
  width: 100%;
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
