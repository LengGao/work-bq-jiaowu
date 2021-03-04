<template>
  <div class="home">
    <section>
      <div class="wrapper-img">
        <img :src="water" alt />
        <img
          :src="waterImg"
          class="wrapper-water"
          alt
          v-if="radio3 == 1"
          style="top:10px;left:10px"
        />
        <img
          :src="waterImg"
          class="wrapper-water"
          alt
          v-if="radio3 == 2"
          style="top:10px;right:10px"
        />
        <img
          :src="waterImg"
          class="wrapper-water"
          alt
          v-if="radio3 == 3"
          style="bottom:10px;left:10px"
        />
        <img
          :src="waterImg"
          class="wrapper-water"
          alt
          v-if="radio3 == 4"
          style="bottom:10px;right:10px;opacity:"
        />
      </div>
    </section>
    <section>
      <div class="wrapper-function">
        <!-- <img :src="water" alt />
        <img :src="waterImg" class="wrapper-water" alt="">-->
        <ul class="wrapper-alldata">
          <li>
            <span style="margin-right:31px">水印图片</span>
            <el-button type="primary" @click="addIcon()">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
            <span style="color: #AAAAAA;font-size: 14px;margin-left:20px"
              >推荐尺寸100*30px或者10:3</span
            >
            <img :src="img" alt />
          </li>
          <li>
            <span style="margin-right:31px">缩放比例</span>
            <el-input
              max="100"
              min="10"
              size="mini"
              step="1"
              v-model="bilis"
              type="number"
            ></el-input>
          </li>
          <li>
            <span style="margin-right:43px">透明度</span>
            <el-input
              type="number"
              max="100"
              min="10"
              size="mini"
              v-model="bili"
              placeholder="输入10-100之间的数字"
              @change="changeOpa()"
            ></el-input>
          </li>
          <li>
            <span style="margin-right:31px;float:left">水印位置</span>
            <div style>
              <el-radio-group v-model="radio3" size="small">
                <el-radio label="1" border>左上</el-radio>
                <el-radio label="2" border>右上</el-radio>
                <br />
                <div style="height:20px"></div>
                <el-radio label="3" border>左下</el-radio>
                <el-radio label="4" border>右下</el-radio>
              </el-radio-group>
            </div>
          </li>
          <li>
            <el-button type="info" plain>取消</el-button>
            <el-button type="primary">保存</el-button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import water from '@/assets/images/u12884.png'
import waterImg from '@/assets/images/u12885.png'
export default {
  name: 'Home',
  data() {
    return {
      water,
      waterImg,
      radio3: '4',
      bili: '',
      img: '',
      bilis: '',
    }
  },
  mounted() {},
  methods: {
    limit(value) {
      console.log(value)
      if (value > 100) {
        value = 100
      } else if (value < 10) {
        value = 10
      }
    },
    addIcon() {
      this.$router.push({
        path: '/eda/addNewClassify',
        query: { id: '' },
      })
    },
    changeOpa(data) {
      console.log(this.bili)
      $('.wrapper-water').css({ opacity: this.bili / 100 })
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  background: #ffffff;
  // margin: 23px 0px 0px 23px;
  // padding: 23px 0px 23px 23px;
  padding: 30px;
  font-size: 14px;
  .wrapper-img {
    width: 367px;
    height: 204px;
    position: relative;
    .wrapper-water {
      position: absolute;
      width: 104px;
      height: 30px;
      right: 10px;
      bottom: 10px;
    }
  }
}
.wrapper-alldata {
  margin-left: 61px;
  li {
    margin-bottom: 42px;
    list-style: none;
    span {
      color: #606266;
    }
  }
}
.el-input--mini {
  width: 170px;
}
</style>
