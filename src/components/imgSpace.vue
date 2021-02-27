<template>
  <div class="home">
    <section>
      <ul class="left-container">
        <li style="color:#909399">图片分组</li>
        <li style=" cursor: pointer;" @click="imgSplit()">全部图片({{list}})</li>
        <li
          v-for="(item,index) of spaceList.list"
          :key="index"
          style=" cursor: pointer;"
          @click="imgSplit(item.bucket_id)"
        >{{ item.name }}--({{ item.imageTotal }})</li>
      </ul>
    </section>
    <section class="right-container">
      <header>
        <div class="left-zoom">
          <search
            :hideTime="true"
            :hideOtherOption="true"
            :searchType="info"
            api="getImagesList"
            data="imgData"
            @getTable="getTableList"
            :bucket_id="bucket_id"
          ></search>
          <div>
            <el-button type="primary" style="margin-left:20px" @click="SingleUpload">上传图片</el-button>
          </div>
        </div>
        <div class="userTable" style="margin-top:20px">
          <el-table
            ref="multipleTable"
            :data="imgData"
            style="width: 100%"
            class="min_table"
            @clearSelection="clearSelect"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column
              prop="images_name"
              label="图片名称"
              show-overflow-tooltip
              min-width="70"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="width_height"
              label="尺寸"
              min-width="210"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="size"
              label="大小"
              min-width="150"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="上传时间"
              min-width="150"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="图片预览" min-width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <div style="width:50px ;height:50px">
                  <img :src="scope.row.url" alt class="school_class_box" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </header>
      <div class="table_bottom">
        <div>
          <el-button type="primary" @click="cancle">取消</el-button>
          <el-button type="warning" @click="confirm">确定</el-button>
        </div>
        <page :data="total" :pageSize="10" :curpage="page" @pageChange="doPageChange" />
      </div>
      <el-dialog title="上传图片" :visible.sync="dialogUpload" width="30%">
        <el-form ref="reasonForm" label-width="150px">
          <el-form-item label="图片分组：">
            <el-select v-model="ruleForm.bucket_id" clearable>
              <el-option
                v-for="(item,index) in spaceList.list"
                :key="index"
                :label="item.name"
                :value="item.bucket_id"
              ></el-option>
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
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const defaultAddPicture = {
  name: null
};
export default {
  name: "imgSpace",
  data() {
    return {
      ruleForm: {
        bucket_id: ""
      },
      info: "info",
      dialogVisible: false,
      dialogEditor: false,
      dialogTransform: false,
      dialogUpload: false,
      addPicture: Object.assign({}, defaultAddPicture),
      selectList: [
        {
          value: "职称类",
          val: 1
        }
      ],
      imgId: [],
      total: 12,
      bucket_id: "",
      page: 1,
      list: "",
      imgData: [],
      spaceList: {
        list: [
          {
            name: "姓名",
            bucket_id: 1
          },
          {
            name: "手机号码",
            bucket_id: 2
          }
        ]
      },
      keytype: 1,
      dialogSpace: false,
      imgArr: "",
      value: "",
      mutiSelectTrans: 0,
      imgName: "",
      imgSingleId: "",
      url:''
    };
  },
  created() {
    this.$api.getBucketList(this, "spaceList"); //左侧列表
    this.$api.getImagesList(this, "imgData"); //右侧列表
  },
  mounted() {
    console.log(this.spaceList);
  },
  methods: {
    clearSelect(){
       this.$refs.multipleTable.clearSelection();
    },
    cancle() {
      this.$router.go(-1);
    },
    confirm() {
        this.$router.push(
        {
          path: "/eda/lessonClassifi",
          query: {  url: JSON.stringify(this.url) }
        }
      );
    },
    imgSuccess() {
      this.dialogUpload = false;
      this.$api.getBucketList(this, "spaceList"); //左侧列表
      this.$api.getImagesList(this, "imgData"); //右侧列表
    },
    // 获取数据
    getTableList(state, val) {
      console.log(state, val);
      if (state == "page") {
        this.page = val;
      } else if (state == "data") {
        this.imgData = val;
      }
    },
    SingleUpload() {
      this.dialogUpload = true;
    },
    doPageChange(page) {
      this.page = page;
      this.$api.getImagesList(this, "imgData");
    },
    handleSelectionChange(val) {
      if(val.length > 1){
        this.$message({
          type:'warning',
          message:'图片最多只能选一张'
        })
        this.url = ''
        this.clearSelect()
      }else{
         this.url = val[0].url
      }
     
    },
    uploadConfirm() {
      this.$refs.mychild.submitUpload("嘿嘿嘿");
    },
    imgSplit(id) {
      this.bucket_id = "";
      this.bucket_id = id;
      this.$api.getImagesList(this, "imgData");
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  background: #ffffff;
  margin: 23px 0px 0px 23px;
  padding: 23px 0px 23px 23px;
  font-size: 14px;
}
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

.left-container {
  width: 287px;
  height: 100%;
  min-height: 500px;
  border: 1px solid rgba(215, 215, 215, 1);
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