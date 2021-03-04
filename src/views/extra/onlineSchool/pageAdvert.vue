<template>
  <section class="mainwrap">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-form label-position="top">
      <!--课程页面广告位-->
      <el-form-item label="课程广告位">
        <span class="advert_advise"
          >建议尺寸1440x150px，支持 jpg/png/gif 格式</span
        >
        <div class="advert_btn" @click="addIcon(1)" v-show="!haschoose">
          添加图片
        </div>
        <div v-show="haschoose">
          <div class="advert_btn2" @click="addIcon(1)">
            <i class="advert_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="url"
              alt=""
            />
          </div>
          <span
            style="padding-right:10px;font-weight: 400;
    font-style: normal;
    color: #606266;"
            >跳转链接</span
          >
          <el-dropdown @command="courseLink">
            <span class="el-dropdown-link">
              选择跳转页面<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">课程</el-dropdown-item>
              <el-dropdown-item command="2">题库</el-dropdown-item>
              <el-dropdown-item command="3">公开课</el-dropdown-item>
              <el-dropdown-item command="4" @click.native="courseLinkDrop"
                >自定义链接</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>
      <!--公开课页面广告位-->
      <el-form-item label="公开课页面广告位">
        <span class="advert_advise"
          >建议尺寸1440x150px，支持 jpg/png/gif 格式</span
        >
        <div class="advert_btn" @click="addIcon(2)" v-show="!haschoose2">
          添加图片
        </div>
        <div v-show="haschoose2">
          <div class="advert_btn2" @click="addIcon(2)">
            <i class="advert_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="publicUrl"
              alt=""
            />
          </div>
          <span
            style="padding-right:10px;font-weight: 400;
    font-style: normal;
    color: #606266;"
            >跳转链接</span
          >
          <el-dropdown @command="publicLink">
            <span class="el-dropdown-link">
              选择跳转页面<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">课程</el-dropdown-item>
              <el-dropdown-item command="2">题库</el-dropdown-item>
              <el-dropdown-item command="3">公开课</el-dropdown-item>
              <el-dropdown-item command="4">自定义链接</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>

      <el-form-item>
        <span
          style="padding-right:20px;font-weight: 400;
    font-style: normal;
    color: #606266;"
          >链接跳转方式</span
        >
        <el-radio-group>
          <el-radio label="本窗口"></el-radio>
          <el-radio label="新窗口"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button><el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
export default {
  name: 'pageAdvert',
  data() {
    return {
      pictureVisible: false,
      course_page_advert: {},
      open_class_page_advert: {},
      teacher_page_advert: {},
      search_page_advert: {},
      haschoose: false,
      haschoose2: false,
      url: '',
      publicUrl: '',
      type: '',
      schoolData: {},
      dialogVisible: false,
    }
  },
  mounted() {
    this.$api.getConfigDetail(this, 'schoolData')
  },
  methods: {
    courseLinkDrop() {},
    courseLink(ab) {
      this.course_page_advert.option = parseInt(ab)
    },
    publicLink(ab) {
      this.course_page_advert.option = parseInt(ab)
    },
    addIcon(zx) {
      this.type = zx
      this.pictureVisible = true
    },
    clearUrl() {
      this.pictureVisible = false
    },
    closeImg(radioUrl) {
      this.pictureVisible = false
      if (radioUrl != undefined) {
        switch (this.type) {
          case 1:
            this.haschoose = true
            this.url = radioUrl
            break
          case 2:
            this.haschoose2 = true
            this.publicUrl = radioUrl
            break
        }
      } else {
        this.url = ''
        this.haschoose = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.advert_advise {
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #aaaaaa;
}
.advert_btn {
  width: 600px;
  height: 40px;
  border: 1px solid #199fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #199fff;
  position: relative;
}
.advert_btn2 {
  width: 600px;
  height: 63px;
  border: 1px solid #199fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #199fff;
  position: relative;
}
.advert_btn2:hover i {
  display: block;
  font-size: 14px;
  color: #fff;
  font-style: normal;
}
.advert_btn:hover {
  border: 1px solid #aaaaaa;
}
.advert_mask {
  display: none;
  position: absolute;
  width: 600px;
  height: 63px;
  line-height: 63px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.78);
  opacity: 0.5;
}
</style>
