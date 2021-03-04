<template>
  <section class="main">
    <!--左边主体-->
    <div class="article">
      <!--头部导航-->
      <div
        :class="webType == 'webhead' ? 'webhead tag' : 'webhead'"
        @click="pitchOn('webhead')"
      >
        <div class="webhead_fl">
          <div class="webhead_logo" v-if="!allData.home_page_logo.img">
            <span>网站logo</span>
          </div>
          <div v-if="allData.home_page_logo.img">
            <img
              :src="allData.home_page_logo.img"
              style="width:140px;height:40px;margin-left:20px"
              alt=""
            />
          </div>

          <ul class="web_nav">
            <li>首页</li>
            <li>课程</li>
            <li>题库</li>
            <li>公开课</li>
          </ul>
        </div>
        <div class="webhead_fr">
          <div class="search_box">
            <input type="text" placeholder="请输入课程/老师" />
          </div>
          <div class="login_box">
            <div class="home_login">登陆</div>
            <div class="home_null"></div>
            <div class="home_register">注册</div>
          </div>
        </div>
      </div>
      <!--轮播图-->
      <div
        :class="webType == 'swiper' ? 'swiper tag' : 'swiper'"
        @click="pitchOn('swiper')"
      >
        <!--课程类型-->
        <div class="swiper_courseType">
          <ul>
            <li v-for="item in cateCourse" :key="item.category_id">
              <!-- <img :src="item.icon" alt="" /> -->
              {{ item.category_name }}
            </li>
          </ul>
        </div>
        <!--走马灯-->
        <el-carousel height="350px" style="background:#ccc">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
            <!-- <img :src="item.img" alt="" class="imageauto" /> -->
          </el-carousel-item>
        </el-carousel>
        <!--登入面板-->
        <div class="swiper_login">
          <img src="@/assets/images/swiper_portrait.png" alt="" />
          <h4>
            欢迎来到东培学堂
          </h4>
          <div class="swi_login">
            登录账号
          </div>
          <div class="swi_goodcourse">
            发现好课
          </div>
        </div>
      </div>
      <!--课程广告位-->
      <div
        :class="
          webType == 'courseAdvert' ? 'home_courseimg tag' : 'home_courseimg'
        "
        @click="pitchOn('courseAdvert')"
      >
        <ol>
          <li v-for="item in 5" :key="item">
            <!-- <img :src="item.img" alt="" class="imageauto" /> -->
          </li>
        </ol>
      </div>
      <!--课程展示区域-->
      <div class="courseShow">
        <div>
          <h1>课程展示区域</h1>
          <h3>不可编辑</h3>
        </div>
      </div>
      <!--课程横幅广告位-->
      <div
        :class="webType == 'courseBanner' ? 'courseBanner tag' : 'courseBanner'"
        @click="pitchOn('courseBanner')"
      >
        <img
          :src="allData.home_page_advert.img"
          style="width:auto;height:auto;"
          alt=""
        />
      </div>
      <!--品牌推荐-->
      <div
        class="achievement"
        :class="webType == 'achievement' ? 'achievement tag' : 'achievement'"
        @click="pitchOn('achievement')"
      >
        <ul>
          <li>
            <div style="width:287px">
              <img
                src="@/assets/images/brandachie.png"
                style="width:40px;height:40px"
                alt=""
              />
              <h4>十年教育品牌</h4>
              <h5>让天下没有难考的证书</h5>
            </div>
            <div class="achie_boder"></div>
          </li>
          <li>
            <div style="width:287px">
              <img
                src="@/assets/images/brandachie.png"
                style="width:40px;height:40px"
                alt=""
              />
              <h4>六大专业类型</h4>
              <h5>包含职称、财经、安监类</h5>
            </div>
            <div class="achie_boder"></div>
          </li>
          <li>
            <div style="width:287px">
              <img
                src="@/assets/images/brandachie.png"
                style="width:40px;height:40px"
                alt=""
              />
              <h4>数十门独家课程</h4>
              <h5>累计时长32,000分钟</h5>
            </div>
            <div class="achie_boder"></div>
          </li>
          <li>
            <div style="width:287px">
              <img
                src="@/assets/images/brandachie.png"
                style="width:40px;height:40px"
                alt=""
              />
              <h4>数十位顶级老师</h4>
              <h5>助力培训行业教育提升</h5>
            </div>
            <div class="achie_boder"></div>
          </li>
          <li>
            <div style="width:287px">
              <img
                src="@/assets/images/brandachie.png"
                style="width:40px;height:40px"
                alt=""
              />
              <h4>数万名注册学生</h4>
              <h5>累计学习456,000小时</h5>
            </div>
            <div class="achie_boder"></div>
          </li>
        </ul>
      </div>
      <!--尾部--->
      <div
        :class="webType == 'webfoot' ? ' tag' : ''"
        @click="pitchOn('webfoot')"
      >
        <div class="web_foot">
          <div class="foot_box">
            <div class="foot_log">
              网站LOGO
            </div>
            <ul>
              <li>
                <div class="imgagetest"></div>
                <p>小程序</p>
              </li>
              <li>
                <div class="publiclog"></div>
                <p>公众号</p>
              </li>
              <li>
                <div class="microblog"></div>
                <p style="padding-left:5px">微 博</p>
              </li>

              <li>
                <div class="tiktoklog"></div>
                <p style="padding-left:5px">抖 音</p>
              </li>
            </ul>
          </div>
          <div class="foot_menu" v-for="item in 4" :key="item">
            <div class="all">
              <h3>全部课程</h3>
              <ol>
                <li>推荐课程</li>
                <li>最新课程</li>
                <li>免费课程</li>
                <li>推荐课程</li>
              </ol>
            </div>
          </div>
        </div>
        <!--copy-->
        <div class="web_copy">©2010-2020 版权所有</div>
      </div>
    </div>
    <!--右边菜单-->
    <div class="silde">
      <!--网站logo-->
      <div class="websiteLogo" v-if="webType == 'webhead'">
        <h3>网站logo</h3>
        <p>建议尺寸140x40px，支持 jpg/png/gif等格式</p>
        <div class="addHeadImage" @click="addIcon('head')" v-show="!headLog">
          添加图片
        </div>
        <div class="addHeadImage2" @click="addIcon('head')" v-show="headLog">
          <i class="addHeadImage2_mask">更改图片</i>
          <img
            class="imageauto"
            style="border-radius:3px"
            :src="headUrl"
            alt=""
          />
        </div>
        <div class="websiteBtn">
          <div class="website_cancel" @click="headCancle">取消</div>
          <div class="website_save" @click="headSave">保存</div>
        </div>
      </div>
      <!--轮播图设置-->
      <div class="swiperSet" v-if="webType == 'swiper'">
        <h3>轮播图</h3>
        <p>建议尺寸1440x350px，支持 jpg/png/gif 等格式，最多可添加5张轮播图</p>
        <ul>
          <li v-for="item in 2" :key="item">
            <h4>图片1</h4>
            <div class="swiper_box">
              <div class="swiper_img"></div>
              <div class="swiper_link">
                <span
                  style="padding-right:10px;font-weight: 400;
    font-style: normal;
    color: #606266;"
                  >跳转链接</span
                >
                <el-dropdown @command="courseLink">
                  <span class="el-dropdown-link">
                    选择跳转页面<i
                      class="el-icon-arrow-down el-icon--right"
                    ></i>
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
            </div>
          </li>
        </ul>
        <div class="addimage">
          添加图片
        </div>
      </div>
      <!--课程广告位设置-->
      <div class="courseAdvertSet" v-if="webType == 'courseAdvert'">
        <h3>课程广告位设置</h3>
        <p>建议尺寸272x153px，支持 jpg/png/gif 格式,最多可添加5个广告位</p>
      </div>
      <!--横幅广告位-->
      <div class="silderBanner" v-if="webType == 'courseBanner'">
        <h3>横幅广告位设置</h3>
        <p>建议尺寸1440x150px，支持 jpg/png/gif等格式</p>
        <div
          class="addBannerImage"
          @click="addIcon('banner')"
          v-show="!banerLog"
        >
          添加图片
        </div>
        <div v-show="banerLog">
          <div class="addBannerImage2" @click="addIcon('banner')">
            <i class="addBannerImage2_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="home_page_advert.img"
              alt=""
            />
          </div>
          <div class="swiper_link">
            <span
              style="padding-right:10px;font-weight: 400;
                  font-style: normal;
                  color: #606266;"
              >跳转链接</span
            >
            <el-input size="small" style="width:128px"></el-input>
            <el-dropdown @command="bannerLink">
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
          <div class="bannerLinkway">
            <span>链接跳转方式</span>
            <el-radio-group v-model="home_page_advert.target">
              <el-radio label="_Self">本窗口</el-radio>
              <el-radio label="_Blank">新窗口</el-radio>
            </el-radio-group>
          </div>
          <div class="websiteBtn">
            <div class="website_cancel" @click="bannerCancel">取消</div>
            <div class="website_save" @click="bannerSave">保存</div>
          </div>
        </div>
      </div>
      <!--
底部链接区域设置-->
      <div class="footLinkSet" v-if="webType == 'webfoot'">
        <h3>底部链接区域设置</h3>
        <div style="padding-bottom:10px">
          <h4>小程序二维码</h4>
          <p>建议尺寸100x100px，支持 jpg/png/gif 格式</p>
          <div
            class="addFootImage"
            @click="addIcon('applets')"
            v-show="!appletLog"
          >
            添加图片
          </div>
          <div
            class="addFootImage2"
            @click="addIcon('applets')"
            v-show="appletLog"
          >
            <i class="addFootImage2_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="wechat_applet.img"
              alt=""
            />
          </div>
        </div>
        <div style="padding-bottom:10px">
          <h4>公众号二维码</h4>
          <p>建议尺寸100x100px，支持 jpg/png/gif 格式</p>
          <div
            class="addFootImage"
            @click="addIcon('public')"
            v-show="!publictLog"
          >
            添加图片
          </div>
          <div
            class="addFootImage2"
            @click="addIcon('public')"
            v-show="publictLog"
          >
            <i class="addFootImage2_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="wechat_account.img"
              alt=""
            />
          </div>
        </div>
        <div class="weBlog">
          <h3>微博地址</h3>
          <el-input type="small" placeholder="http://"></el-input>
        </div>
        <div style="padding-bottom:10px">
          <h4>抖音二维码</h4>
          <p>建议尺寸100x100px，支持 jpg/png/gif 格式</p>
          <div
            class="addFootImage"
            @click="addIcon('tiktok')"
            v-show="!tiktoktLog"
          >
            添加图片
          </div>
          <div
            class="addFootImage2"
            @click="addIcon('tiktok')"
            v-show="tiktoktLog"
          >
            <i class="addFootImage2_mask">更改图片</i>
            <img
              class="imageauto"
              style="border-radius:3px"
              :src="tiktok.img"
              alt=""
            />
          </div>
        </div>
        <div class="weBlog">
          <h3>网站备案</h3>
          <el-input type="small" placeholder="http://"></el-input>
        </div>
        <h3
          style="color: #333333;
          font-family: PingFang SC;
          padding-top:30px
          font-weight: medium;
          font-size: 16px;
          line-height: 16px; "
        >
          友情链接内容
          <span
            style="color: #999999;
            font-family: PingFang SC;
            font-weight: medium;
            font-size: 16px;
            line-height: 16px;"
            >（最多四个链接）</span
          >
        </h3>
        <div
          class="friendLink"
          v-for="(item, index) in friends.data"
          :key="index"
        >
          <div style="margin-bottom:10px">
            <span>链接文本</span>
            <el-input
              placeholder="请输入链接文本"
              style="width:248px"
              v-model="friends.data[index].text"
            ></el-input>
          </div>
          <div>
            <span>跳转链接</span>
            <el-input
              placeholder="请输入链接文本"
              style="width:248px"
            ></el-input>
          </div>
          <i class="el-icon-circle-close" @click="del"></i>
        </div>
        <div class="addLinkContent" @click="addFriendLink()">
          添加链接内容
        </div>
        <div class="bannerLinkway" style="padding-top:30px">
          <span
            style="color: #333333;
              font-family: PingFang SC;
              font-weight: medium;
              font-size: 16px;
              line-height: 16px;
              padding-right:20px
              "
            >链接跳转方式</span
          >
          <el-radio-group v-model="home_page_advert.target">
            <el-radio label="_Self">本窗口</el-radio>
            <el-radio label="_Blank">新窗口</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </section>
</template>

<script>
export default {
  pageDesign: 'main',
  data() {
    return {
      pictureVisible: false,
      webType: 'webfoot',
      type: '',
      headUrl: '',
      // banerUrl: '',
      headLog: false,
      banerLog: false,
      appletLog: false,
      publictLog: false,
      tiktoktLog: false,
      bannerRadio: '',
      allData: {
        home_page_logo: {
          img: '',
        },
        home_page_advert: {
          img: '',
          option: '',
          target: '',
          url: '',
        },
      },

      home_page_logo: {
        img: '',
      },
      home_page_advert: {
        img: '',
        option: '',
        target: '',
        url: 'www.baidu.com',
      },
      wechat_applet: {
        img: '',
        target: '',
      },
      wechat_account: {
        img: '',
        target: '',
      },
      tiktok: {
        img: '',
        target: '',
      },
      friends: {
        data: [{ text: '', url: '' }],
      },
      cateCourse: [
        { category_id: 1, category_name: '职称类' },
        { category_id: 2, category_name: '财经类' },
        { category_id: 3, category_name: '资格类' },
        { category_id: 4, category_name: '安监类' },
        { category_id: 5, category_name: '学历类' },
        { category_id: 6, category_name: '设计类' },
      ],
    }
  },
  mounted() {
    this.$api.getConfigDetail(this, 'allData')
  },
  methods: {
    del() {},
    addFriendLink() {
      let friend = {
        text: '',
        url: '',
      }
      this.friends.data.push(friend)
    },
    bannerCancel() {},
    bannerSave() {
      console.log(this.home_page_advert)
      this.keyword = 'home_page_advert'
      this.$api.updateConfig(this, this.home_page_advert)
    },
    bannerLink(ab) {
      this.home_page_advert.option = ab
    },
    headCancle() {
      this.headUrl = ''
      this.headLog = false
    },
    headSave() {
      if (this.headUrl != '' && this.headUrl != undefined) {
        this.home_page_logo.img = this.headUrl
        this.keyword = 'home_page_logo'
        this.$api.updateConfig(this, this.home_page_logo)
      }
    },
    addIcon(ab) {
      this.type = ab
      this.pictureVisible = true
    },
    clearUrl() {
      this.pictureVisible = false
    },
    closeImg(url) {
      this.pictureVisible = false
      if (url != undefined) {
        switch (this.type) {
          case 'head':
            this.headLog = true
            this.headUrl = url
            break
          case 'banner':
            this.banerLog = true
            this.home_page_advert.img = url
            break
          case 'applets':
            this.appletLog = true
            this.wechat_applet.img = url
            break
          case 'public':
            this.publictLog = true
            this.wechat_account.img = url
            break
          case 'tiktok':
            this.tiktoktLog = true
            this.tiktok.img = url
            break
        }
      } else {
        switch (this.type) {
          case 'head':
            this.headUrl = ''
            this.headLog = false
            break
          case 'banner':
            this.home_page_advert.img = ''
            this.banerLog = false
            break
          case 'applets':
            this.appletLog = false
            this.wechat_applet.img = ''
            break
          case 'public':
            this.publictLog = false
            this.wechat_account.img = url
            break
          case 'tiktok':
            this.tiktoktLog = false
            this.tiktok.img = url
            break
        }
      }
    },
    pitchOn(ab) {
      switch (ab) {
        case 'webhead':
          this.webType = 'webhead'
          break
        case 'swiper':
          this.webType = 'swiper'
          break
        case 'courseAdvert':
          this.webType = 'courseAdvert'
          break
        case 'courseBanner':
          this.webType = 'courseBanner'
          break
        case 'achievement':
          this.webType = 'achievement'
          break
        case 'webfoot':
          this.webType = 'webfoot'
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.tag {
  border: 2px dashed #199fff;
  box-sizing: border-box;
}
.main {
  display: flex;
  .article {
    margin: 20px;
    flex: 1;
    min-width: 1206px;
  }
  .silde {
    background: #fff;
    width: 380px;
    border-left: 6px solid #ccc;
  }
}
.webhead {
  height: 60px;
  width: 100%;
  min-width: 1260px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .webhead_fl {
    display: flex;
    .webhead_logo {
      margin: 10px 0 10px 20px;
      width: 140px;
      height: 40px;
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999999;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0px;
      text-align: center;
    }
    ul.web_nav {
      display: flex;
      margin-left: 40px;
      color: #333333;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 16px;
      line-height: 16px;

      li {
        width: 80px;

        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      li:hover {
        border-top: 5px solid #199fff;
      }
    }
  }
  .webhead_fr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
  }
}
.webhead:hover {
  // transform: translateY(-0.5px);
  box-shadow: rgba(146, 157, 154, 0.24) 0px 4px 14px 0px;
  transition: all 0.1s ease-in-out 0s;
}
.search_box {
  width: 240px;
  height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
  padding-left: 40px;
  border-radius: 34px;
  border: 1px solid #cccccc;
  background: url('../../../assets/images/searchHome.png') no-repeat 16px center;
  input {
    border: none;
    outline: none;
    font-size: 14px;
    width: 180px;
    height: 28px;
  }
}
.login_box {
  color: #666666;
  font-family: PingFang SC;
  font-weight: medium;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  display: flex;
  width: 100px;
  padding-left: 20px;
  .home_login {
    cursor: pointer;
    padding-right: 10px;
  }
  .home_login:hover {
    color: #199fff;
  }
  .home_null {
    height: 12px;
    border-left: 1px solid #ccc;
  }
  .home_register {
    cursor: pointer;
    padding-left: 10px;
    img {
      width: 36px;
      height: 36px;
    }
  }
  .home_register:hover {
    color: #199fff;
  }
}
.swiper {
  width: 100%;
  margin: 20px 0;
  position: relative;
}
.swiper:hover {
  // transform: translateY(-0.5px);
  box-shadow: rgba(146, 157, 154, 0.24) 0px 4px 14px 0px;
  transition: all 0.1s ease-in-out 0s;
}
.swiper_courseType {
  position: absolute;
  left: 0;
  width: 140px;
  height: 350px;
  opacity: 0.30000001192092896;
  z-index: 10;
  background: #333333;
  ul {
    padding-top: 30px;
    li {
      width: 140px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 10px;
      img {
        width: 22px;
        height: 22px;
        margin-right: 4px;
      }
      color: #ffffff;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 16px;
      line-height: 16px;
    }
    li:hover {
      width: 140px;
      height: 40px;
      color: #199fff;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0px;
      text-align: center;
      background: #ccc;
    }
  }
}
.swiper_login {
  position: absolute;
  right: 20px;
  top: 45px;
  width: 200px;
  height: 260px;
  z-index: 10;
  background: #fff;
  img {
    padding: 25px 0 0 65px;
  }
  h4 {
    padding: 16px 0 0 44px;
    color: #333333;
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
  }
  .swi_login {
    cursor: pointer;
    border-radius: 30px;
    background: #ffffff;
    width: 130px;
    height: 30px;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    margin: 30px 0 0 35px;
  }
  .swi_goodcourse {
    margin: 14px 0 0 35px;
    cursor: pointer;
    border-radius: 30px;
    background: #199fff;
    width: 130px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
  }
}
.home_courseimg {
  ol {
    // display: flex;
    // justify-content: space-between;

    display: grid;
    grid-template-columns: repeat(5, 18.88%);
    // grid-row-gap: 20px;
    grid-column-gap: 20px;
    li {
      list-style: none;
      cursor: pointer;
      border-radius: 4px;
      // min-width: 236px;
      // max-width: 270px;

      height: 153px;
      background: #ccc;
      img {
        border-radius: 4px;
      }
    }
    li:hover {
      border-radius: 4px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      box-sizing: border-box;
      color: #303133;
      transform: translateY(-3px);
      box-shadow: rgba(146, 157, 154, 0.24) 0px 4px 14px 0px;
      transition: all 0.2s ease-in-out 0s;
    }
  }
}
.courseShow {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  padding: 146px 482px;
  border-radius: 4px;
  background: #dddddd;
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 50px;
    line-height: 50px;
    letter-spacing: 0px;
    text-align: center;
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 30px;
    line-height: 50px;
  }
}
.courseBanner {
  height: 132px;
  border-radius: 4px;
  margin: 20px 0;
  background: #ddd;
}
.achievement {
  margin-bottom: 20px;
  ul {
    background: #fff;
    display: grid;
    min-width: 1440px;
    grid-template-columns: repeat(5, 20%);
    // grid-row-gap: 20px;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    li {
      width: 288px;
      display: flex;
      justify-content: space-between;
      img {
        // padding: 28px 0 10px 124px;
        margin: 28px 0 0 125px;
      }
      h4 {
        color: #666666;
        font-family: PingFang SC;
        font-weight: medium;
        font-size: 20px;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: center;
        display: flex;
        justify-content: center;
      }
      h5 {
        display: flex;
        justify-content: center;
        color: #999999;
        font-family: PingFang SC;
        font-weight: medium;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0px;
        text-align: center;
        padding: 10px 0 28px;
      }
      .achie_boder {
        height: 100px;
        margin-top: 28px;
        border-left: 1px solid #ccc;
      }
    }
    // li:hover {
    //   box-shadow: rgba(24, 25, 25, 0.2) 0px 3px 20px 0px;
    // }
    li:nth-child(5) {
      .achie_boder {
        border-left: 0px solid #ccc;
      }
    }
  }
}
.web_foot {
  display: flex;
  justify-content: space-between;
  background: #2e2e2e;
  box-shadow: inset 0px -1px 0px 0px #000000;
  padding: 26px 0 26px 30px;
  .foot_box {
    padding-right: 100px;
    border-right: 1px solid #ccc;
    .foot_log {
      width: 170px;
      height: 50px;
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ul {
      padding-top: 25px;
      color: #999999;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 14px;
      line-height: 14px;
      display: flex;
      width: 324px;
      justify-content: space-between;
      li {
        cursor: pointer;
        list-style: none;
      }
    }
  }
  .foot_menu {
    padding-left: 100px;
    display: flex;
    width: 100%;
    max-width: 576px;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
    justify-content: space-between;
    h3 {
      color: #ffffff;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 16px;
      line-height: 14px;
      letter-spacing: 0px;
      text-align: left;
    }
    ol {
      li {
        padding-top: 15px;
        list-style: none;
      }
    }
  }
}
.imgagetest {
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0 0 6px 6px;
  background: url('../../../assets/images/footerLog/Appletlog.png') no-repeat;
}
.imgagetest:hover {
  background: url('../../../assets/images/footerLog/Appletlog2.png') no-repeat;
  // width: 30px;
  // height: 30px;
  // overflow: hidden;
  // transform: translateY(-50px);
  // filter: drop-shadow(#66ccff 0 50px);
  //颜色、x轴偏移量、y轴偏移量
}
.microblog {
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0 0 6px 6px;
  background: url('../../../assets/images/footerLog/microblog.png') no-repeat;
}
.microblog:hover {
  background: url('../../../assets/images/footerLog/microblog2.png') no-repeat;
}
.publiclog {
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0 0 6px 6px;
  background: url('../../../assets/images/footerLog/publiclog.png') no-repeat;
}
.publiclog:hover {
  background: url('../../../assets/images/footerLog/publiclog2.png') no-repeat;
}
.tiktoklog {
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0 0 6px 6px;
  background: url('../../../assets/images/footerLog/tiktoklog.png') no-repeat;
}
.tiktoklog:hover {
  background: url('../../../assets/images/footerLog/tiktoklog2.png') no-repeat;
}
.web_copy {
  color: #666666;
  font-family: PingFang SC;
  font-weight: medium;
  font-size: 14px;
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e2e2e;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
}
.websiteLogo {
  margin: 40px 20px 0 20px;
  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 20px;
    line-height: 20px;
  }
  p {
    padding: 20px 0;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
  }
  .addHeadImage {
    cursor: pointer;
    border: 1px solid #199fff;
    height: 40px;
    width: 100%;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .addHeadImage2 {
    cursor: pointer;
    border: 1px solid #199fff;
    width: 200px;
    height: 58px;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .addHeadImage2_mask {
      display: none;
      position: absolute;
      width: 200px;
      height: 58px;
      line-height: 63px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.78);
      opacity: 0.5;
    }
  }
  .addHeadImage2:hover i {
    display: block;
    font-size: 16px;
    font-weight: medium;
    color: #fff;
    font-style: normal;
  }
}
.websiteBtn {
  cursor: pointer;
  display: flex;
  padding-top: 50px;
  .website_cancel {
    margin: 0 40px 0 57px;
    border-radius: 2px;
    border: 1px solid #cccccc;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 16px;
    line-height: 16px;
    width: 90px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .website_save {
    cursor: pointer;
    width: 90px;
    height: 36px;
    border-radius: 2px;
    background: #199fff;
    color: #ffffff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 16px;
    line-height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.swiperSet {
  padding: 40px 20px 0 20px;
  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 20px;
    line-height: 20px;
  }
  p {
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 22px;
    padding: 20px 0;
  }
  ul {
    li {
      list-style: none;
      padding-bottom: 20px;
      h4 {
        color: #999999;
        font-family: PingFang SC;
        font-weight: medium;
        font-size: 14px;
        line-height: 22px;
        padding-bottom: 10px;
      }
      .swiper_box {
        padding: 10px;
        border: 1px solid #ccc;
        .swiper_img {
          width: 314px;
          height: 74px;
          background: #ccc;
          margin-bottom: 10px;
        }
        .swiper_link {
          display: flex;
        }
      }
    }
  }
  .addimage {
    border: 1px solid #199fff;
    height: 40px;
    width: 100%;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.silderBanner {
  margin: 40px 20px 0 20px;
  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 20px;
    line-height: 20px;
  }
  p {
    padding: 20px 0;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
  }
  .addBannerImage {
    cursor: pointer;
    border: 1px solid #199fff;
    height: 40px;
    width: 100%;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .addBannerImage2 {
    cursor: pointer;
    border: 1px solid #199fff;
    width: 100%;
    height: 58px;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .addBannerImage2_mask {
      display: none;
      position: absolute;
      width: 100%;
      height: 58px;
      line-height: 63px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.78);
      opacity: 0.5;
    }
  }
  .swiper_link {
    margin: 10px 0;
  }
  .bannerLinkway {
    margin: 30px 0 50px 0;
    span {
      padding-right: 20px;
      color: #333333;
      font-family: PingFang SC;
      font-weight: medium;
      font-size: 16px;
      line-height: 16px;
    }
  }
  .bannerlinkbtn {
  }
  .addBannerImage2:hover i {
    display: block;
    font-size: 16px;
    font-weight: medium;
    color: #fff;
    font-style: normal;
  }
}
.courseAdvertSet {
  margin: 40px 20px 0 20px;

  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 20px;
    line-height: 20px;
  }
  p {
    padding: 20px 0;
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
  }
}
.footLinkSet {
  margin: 40px 20px 0 20px;
  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 20px;
    line-height: 20px;
  }
  h4 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 16px;
    line-height: 16px;
    padding: 20px 0 10px 0;
  }
  p {
    color: #999999;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    padding-bottom: 10px;
    text-align: left;
  }
  .addFootImage {
    cursor: pointer;
    border: 1px solid #199fff;
    height: 40px;
    width: 100%;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .addFootImage2 {
    cursor: pointer;
    border: 1px solid #199fff;
    width: 100px;
    height: 100px;
    color: #199fff;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .addFootImage2_mask {
      display: none;
      position: absolute;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.78);
      opacity: 0.5;
    }
  }
  .addFootImage2:hover i {
    display: block;
    font-size: 16px;
    font-weight: medium;
    color: #fff;
    font-style: normal;
  }
}
.weBlog {
  padding: 20px 0 10px 0;
  h3 {
    color: #333333;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
    padding-bottom: 10px;
  }
}
.friendLink {
  padding: 10px;
  border: 1px solid #199fff;
  margin: 20px 0;
  position: relative;
  span {
    color: #666666;
    font-family: PingFang SC;
    font-weight: medium;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
    padding-right: 8px;
  }
  i {
    font-size: 18px;
    color: #199fff;
    cursor: pointer;
    position: absolute;
    top: -8px;
    right: -8px;
    background: #fff;
  }
}
.addLinkContent {
  cursor: pointer;
  border: 1px solid #199fff;
  height: 40px;
  width: 100%;
  color: #199fff;
  font-family: PingFang SC;
  font-weight: medium;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
