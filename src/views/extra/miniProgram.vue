<template>
  <div class="home">
    <header>
      <ul>
        <li
          v-for="(item, index) of topfun"
          :key="index"
          :class="{ active: item.id == current }"
          @click="doActive(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </header>
    <!--首页分类-->
    <section class="main" v-show="current == -1">
      <div class="client_head">
        <search2
          :contentShow="true"
          api="getHomeclassifiList"
          inputText="分类名称"
          @getTable="getTableListHome"
        ></search2>
        <el-button type="primary" @click="addClassiFionHome"
          >添加分类</el-button
        >
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="homeData.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="分类排序"
            show-overflow-tooltip
            min-width="90"
            prop="index_category_id"
          >
          </el-table-column>
          <el-table-column
            prop="index_category_name"
            label="分类名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
          prop="mobile"
          label="分类描述"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
          <el-table-column
            prop="index_category_icon"
            label="分类图标"
            min-width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div style="margin:0 auto;width:50px ;height:50px;">
                <img
                  :src="scope.row.index_category_icon"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="排序" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-col :span="12">
                <el-input
                  v-model="scope.row.sort"
                  placeholder
                  size="small"
                  @input="scopesHome(scope.row, scope.row.sort)"
                ></el-input>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="topaymentHome(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  style="padding-left:40px"
                  @click="delbtnHome(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page
              :data="homeData.total"
              :curpage="page"
              @pageChange="doPageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <!--轮播图-->
    <section class="main" v-show="current == 0">
      <div class="client_head">
        <search
          :hideTime="true"
          :hideOtherOption="true"
          api="bannerList"
          @getTable="getTableListIMg"
        ></search>
        <el-button type="primary" @click="addClassifion">添加轮播图</el-button>
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="classfi.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="index"
            label="分类排序"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="banner_name"
            label="轮播图名称"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="缩略图" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img :src="scope.row.url" alt class="school_class_box" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="course_name"
            label="关联课程"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="排序" show-overflow-tooltip min-width="90">
            <template slot-scope="scope">
              <el-col :span="12">
                <el-input
                  v-model="scope.row.sort"
                  placeholder
                  size="small"
                  @input="scopes(scope.row, scope.row.sort)"
                ></el-input>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="editPicVisible(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  style="padding-left:40px"
                  @click="delbtn(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <pageConfig
              :data="classfi.total"
              :curpage="page"
              api="bannerList"
              dataName="classfi"
              @pageChange="doPageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="main" v-show="current == 1">
      <div class="client_head">
        <search
          :hideTime="true"
          :hideOtherOption="true"
          api="studentData"
          @getTable="getTableList"
        ></search>
        <!-- <el-button type="primary" @click="addClassifion">批量下载</el-button> -->
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="studentMultipleTable"
          :data="studentData.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            label="微信昵称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="real_name"
            label="学员姓名"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="phone_number"
            label="手机号码"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="身份证正面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.cardPositiveImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="身份证背面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.cardSideImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="免冠正面照" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.headStickerImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="毕业证" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.diplomaImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="社保卡正面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.socialSecurityCardImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="社保卡背面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.socialSecurityCardSideImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="居住证正面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.livePermitImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="居住证背面" show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="width:50px ;height:50px">
                <img
                  :src="scope.row.livePermitSideImg.url"
                  alt
                  class="school_class_box"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="checkout(scope.row)"
                  >查看</el-button
                >
                <el-button
                  type="text"
                  style="padding-left:40px"
                  @click="dowload(scope.row)"
                  >下载</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page
              :data="studentData.total"
              :curpage="page"
              @pageChange="doPageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <!--提醒设置-->
    <section class="main" v-show="current == 2">
      <el-button type="primary" @click="addWarn">添加提醒</el-button>
      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="NoticeConfig"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="index"
            label="序号"
            show-overflow-tooltip
            min-width="90"
          >
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="notice_name"
            label="通知名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="content"
            label="通知内容"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="specific_time"
            label="提醒时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="status"
            label="是否开启"
            min-width="100"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="switchStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="cozy_remind"
            label="温馨提醒"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column> -->
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="remindOPtion(scope.row)"
                  >编辑</el-button
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
    </section>
    <!--模板消息记录-->
    <section class="main" v-show="current == 3">
      <!-- <el-button type="primary" @click="addWarn">添加提醒</el-button> -->
      <!--表格-->
      <search2
        :hideTime="true"
        api="getAppletMessageRecordList"
        @getTable="getTableListBoard"
      ></search2>
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="boardData.list"
          style="width: 100%"
          class="min_table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            prop="id"
            label="序号"
            show-overflow-tooltip
            min-width="90"
          >
            <!-- <template slot-scope="scope">{{ scope.$index + 1 }}</template> -->
          </el-table-column>
          <el-table-column
            prop="notice_name"
            label="通知名称"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="send_type_name"
            label="发送类型"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="today_date"
            label="发送日期"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="total"
            label="总条数"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="success"
            label="成功条数"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="fail"
            label="失败条数"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="发送时间"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="200">
            <template slot-scope="scope">
              <div style="display:flex;justify-content:center">
                <el-button type="text" @click="boardDetail(scope.row)"
                  >详情</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <div class="table_bottom">
            <page
              :data="boardData.total"
              :curpage="page"
              @pageChange="doPageChangeBoard"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- <el-dialog
      title="编辑图片"
      :visible.sync="editPicdialogVisible"
      width="30%"
      v-if="editPic"
    >
      <el-form :model="editPic" ref="reasonForm" label-width="150px">
        <el-form-item label="轮播图名称:">
          <el-input
            v-model="editPic.banner_name"
            class="input-width"
          ></el-input>
         
        </el-form-item>
        <el-form-item label="上传图片:" style>
          <p v-show="!haschoose">
            <i
              class="el-icon-folder-opened"
              @click="addIcon"
              style="float:left;line-height:56px"
            ></i>
            <span style="display:block;height:50px;line-height:30px">
              1. 支持jpeg、png、bmp等格式;
              <br />2、推荐尺寸64*64px或者1:1
            </span>
          </p>
          <div v-show="haschoose" style="width:80px;height:80px">
            <img :src="url" alt />
          </div>
        </el-form-item>
        <el-form-item label="关联类型:">
          <el-select v-model="editPic.category_id" filterable>
            <el-option
              :label="item.category_name"
              :value="item.category_id"
              v-for="(item, index) in selectData.list"
              :key="index"
              @click.native="selectOne(item.category_id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联课程:">
          <el-select v-model="editPicCourse.course_id" filterable>
            <el-option
              :label="item.course_name"
              :value="item.course_id"
              v-for="(item, index) in editPicCourse.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPicdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edithandleConfirm">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog :title="swiperTitle" :visible.sync="swiperVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="轮播图名称：">
          <el-input
            v-model="swiperForm.banner_name"
            style="width:220px"
            class="input-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片：" style>
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon(2)"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon(2)"></i>
            <img
              style="width:100%;height:100%;border-radius:3px;"
              :src="url"
              alt=""
            />
          </div>
        </el-form-item>
        <el-form-item label="关联类型:">
          <el-select v-model="swiperForm.category_id" filterable>
            <el-option
              :label="item.category_name"
              :value="item.category_id"
              v-for="(item, index) in selectData.list"
              :key="index"
              @click.native="selectOne(item.category_id)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联课程:">
          <el-select v-model="swiperForm.course_id" filterable>
            <el-option
              :label="item.course_name"
              :value="item.course_id"
              v-for="(item, index) in editPicCourse.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="swiperVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="预览图片" :visible.sync="checkDialogVisible" width="30%">
      <viewer
        :images="photo"
        style="height: 450px;"
        ref="viewer"
        @inited="inited"
      >
        <!-- photo 一定要一个数组，否则报错 -->
        <div>
          <img
            :src="item"
            v-for="item in photo"
            :key="item"
            style="width:100px;max-width:100px;overflow:hidden;height:10vw"
          />
        </div>
      </viewer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkhandleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="warnTitle"
      :visible.sync="remindDialogVisible"
      width="40%"
    >
      <el-form label-width="100px">
        <el-form-item label="通知名称：">
          <el-select
            v-model="remindDetail.notice_id"
            placeholder="请选择通知名称："
          >
            <el-option
              v-for="item in noticeList"
              :key="item.id"
              :label="item.notice_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <!-- <el-input
            v-model="remindDetail.remind_name"
            class="input-width"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="通知内容：">
          <el-input
            v-model="remindDetail.content"
            class="input-width"
          ></el-input>
          <!-- <p style="color:#ccc">支持@@name@@通配符匹配用户名字</p> -->
        </el-form-item>

        <el-form-item label="提醒时间:">
          <!-- <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          > -->
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="remindDetail.week_arr">
            <el-checkbox
              v-for="days in weeks"
              :label="days.id"
              :key="days.id"
              >{{ days.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-time-picker
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            :picker-options="{
              selectableRange: '7:00:00 - 20:59:00',
            }"
            v-model="remindDetail.specific_time"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <!-- <el-form-item label="温馨提醒：">
          <el-input
            v-model="remindDetail.cozy_remind"
            class="input-width"
            type="textarea"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remindDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EdithandleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!--模板消息记录弹框-->
    <el-dialog title="" :visible.sync="boardVisible" width="30%">
      <div v-html="messDetail" class="boardDialog"></div>
      <!--
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
    <!--首页分类弹框-->
    <!--弹框-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisibleHome"
      width="576px"
    >
      <el-form label-width="100px">
        <el-form-item label="分类名称：">
          <el-input
            placeholder="请输入分类名称"
            v-model="addClassifyHome.index_category_name"
            class="input-width"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类描述：">
          <el-input v-model="addClassifyHome.describe"
                    class="input-width"></el-input>
        </el-form-item> -->
        <el-form-item label="分类图标：" style>
          <div v-show="!haschoose">
            <div class="headPortrait el-icon-plus" @click="addIcon(1)"></div>
            <div style="color:#aaa;ling-height:20px">
              <p><span> 1. 支持jpg、jpeg、png、gif、bmp格式；</span></p>
              <p><span> 2. 推荐尺寸200*200px或者1:1</span></p>
            </div>
          </div>
          <div v-show="haschoose" class=" imageBox ">
            <i class=" iconjia el-icon-plus" @click="addIcon(1)"></i>
            <img
              style="width:100%;height:100%;border-radius:3px;"
              :src="url"
              alt=""
            />
          </div>
        </el-form-item>
        <el-form-item label="分类图排序：">
          <el-input
            v-model="addClassifyHome.sort"
            class="input-width"
            type="number"
          ></el-input>
          <p style="color:#aaa;ling-height:20px">
            排序数字越大分类越靠前,最小值为1
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleHome = false">取 消</el-button>
        <el-button type="primary" @click="homeConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!--图片弹窗-->
    <imgDialog
      v-if="pictureVisible"
      @closeImg="closeImg"
      @clearUrl="clearUrl"
    ></imgDialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const defaultAddClassifyPicture = {
  name: null,
}
const editPic = {
  banner_name: '',
}
const editPicCourses = {
  course_id: '',
}
const weeks = [
  { name: '周一', id: 1 },
  { name: '周二', id: 2 },
  { name: '周三', id: 3 },
  { name: '周四', id: 4 },
  { name: '周五', id: 5 },
  { name: '周六', id: 6 },
  { name: '周日', id: 7 },
]
export default {
  name: 'Home',
  data() {
    return {
      swiperTitle: '添加图片',
      moduleTag: '', //图片弹框标记
      dialogTitle: '',
      image_id: '',
      boardVisible: false,
      messDetail: '', //模板消息详情
      schoolData: [],
      homeData: {},
      warnTitle: '添加提醒设置',
      photo: [],
      index_category_id: '',
      datas: {},
      boardData: [],
      noticeList: [],
      checkDialogVisible: false,
      studentData: Object.assign({}, {}),
      NoticeConfig: [],
      remindData: Object.assign({}, {}),
      page: 1,
      swiperVisible: false,
      dialogVisibleHome: false,
      addClassifyHome: {
        index_category_name: '',
        sort: '',
      },
      swiperForm: {
        banner_name: '',
        image_id: '',
        course_id: '',
      },
      haschoose: false,
      url: '',
      topfun: [
        { name: '首页分类', id: -1 },
        { name: '轮播图', id: 0 },
        { name: '学生资料', id: 1 },
        { name: '提醒设置', id: 2 },
        { name: '模板消息记录', id: 3 },
      ],
      current: '-1',
      classfi: Object.assign({}, {}),
      editPic: Object.assign({}, editPic),
      editPicdialogVisible: false,
      selectData: {
        list: {
          category_id: '',
        },
      },
      remindDetail: {
        id: '',
        notice_id: '',
        content: '',
        week_arr: [],
        specific_time: '',
      },
      editPicCourse: Object.assign({}, editPicCourses),
      pictureVisible: false,
      checkAll: false,
      checkeddays: [],
      weeks: weeks,
      isIndeterminate: true,
      remindDialogVisible: false,
    }
  },
  mounted() {
    this.$api.getHomeclassifiList(this, 'homeData') //首页分类
    this.$api.bannerList(this, 'classfi')
    this.$api.getNoticeList(this, 'noticeList')
    this.$api.getNoticeConfigList(this, 'NoticeConfig')
    this.$api.getAppletMessageRecordList(this, 'boardData') //模板消息发送记录接口
    // this.$api.studentData(this, 'studentData')
  },
  // activated: function() {
  //   console.log(this.$route.query.url != undefined)
  //   if (this.$route.query.url != undefined || this.$route.query.url != '') {
  //     this.url = JSON.parse(this.$route.query.url)
  //     this.haschoose = true
  //   }
  // },
  deactivated: function() {
    console.log(400)
  },
  methods: {
    homeConfirm() {
      // console.log(this.index_category_id == '')
      if (this.index_category_id == '' || this.index_category_id == undefined) {
        this.$api.addHomeCategory(this, 'addClassifyHome')
      } else {
        this.$api.modifyHomeCategory(this, this.index_category_id)
      }
    },
    addClassiFionHome() {
      this.dialogTitle = '添加首页分类'
      for (let key in this.addClassifyHome) {
        this.addClassifyHome[key] = ''
      }
      this.url = ''
      this.haschoose = false
      this.dialogVisibleHome = true
    },
    getTableListHome(state, val, datas) {
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.homeData = val
      }
    },
    topaymentHome(zx) {
      this.dialogTitle = '编辑首页分类'
      console.log(zx)
      this.dialogVisibleHome = true
      this.haschoose = true
      this.index_category_id = zx.index_category_id
      this.$api.getHomeclassifiDetail(this, this.index_category_id)
    },
    delbtnHome(id) {
      this.$confirm('确定要删除当前分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteHomeclassifi(id, this)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    scopesHome(ab, sorts) {
      let sortzx = ab.sort
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        console.log(sortzx, sorts)

        this.$api.updateHomeClassifiSort(ab.index_category_id, sorts, this)
      }
    },
    boardDetail(ab) {
      this.messDetail = ab.detail
      this.boardVisible = true
    },
    switchStatus(data) {
      // this.editVideo.length = 0
      // this.editVideo = scop.row
      this.$api.updateNoticeConfigStatus(this, data)
    },
    //添加消息弹框提醒
    addWarn() {
      this.remindDetail = {
        id: '',
        notice_id: '',
        content: '',
        week_arr: [],
        specific_time: '',
      }
      this.remindDialogVisible = true
      this.warnTitle = '添加提醒设置'
    },
    addIcon(num) {
      //num 2为轮播图 1为首页分类
      this.moduleTag = num
      this.pictureVisible = true
    },
    clearUrl() {
      this.pictureVisible = false
    },
    closeImg(radioUrl, image_id) {
      console.log(radioUrl, image_id)
      this.pictureVisible = false
      if (image_id != undefined && this.moduleTag == 2) {
        this.haschoose = true
        this.url = radioUrl
        this.swiperForm.image_id = image_id
      } else if (radioUrl != undefined && this.moduleTag == 1) {
        this.haschoose = true
        this.url = radioUrl
        this.swiperForm.image_id = image_id
      } else {
        this.url = ''
        this.haschoose = false
      }
      // if (radioUrl != undefined) {
      //   this.haschoose = true
      //   this.url = radioUrl
      // } else {
      //   this.url = ''
      //   this.haschoose = false
      // }
    },
    EdithandleConfirm() {
      console.log(this.remindDetail)

      if (this.remindDetail.id) {
        //remindDetail.id存在时编辑,不存在时为添加
        this.$api.updateNoticeConfig(this, this.remindDetail)
      } else {
        this.$api.createNoticeConfig(this, this.remindDetail)
      }

      // this.$api.modifyproblemRemind(this, 'remindDetail')
    },
    remindOPtion(ab) {
      console.log(ab)
      this.remindDetail = {
        id: '',
        notice_id: '',
        content: '',
        week_arr: [],
        specific_time: '',
      }
      this.remindDetail = ab
      // this.remindDetail.week = ab.week_arr
      console.log(this.remindDetail.week)
      this.warnTitle = '编辑提醒设置'
      this.remindDialogVisible = true

      // this.$api.remindInfo(this, 'remindDetail', data.problem_remind_id)
    },
    handleCheckAllChange(val) {
      console.log(val)
      let arr = []
      for (let item of this.weeks) {
        arr.push(item.id)
      }
      this.checkeddays = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
      this.remindDetail.week = value
      //全选
      // let checkedCount = value.length
      // console.log(value, this.weeks.length)
      // this.checkAll = checkedCount === this.weeks.length
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.weeks.length
    },
    checkhandleConfirm() {
      this.checkDialogVisible = false
    },
    inited(viewer) {
      this.currentViewer = viewer
    },
    selectOne(item) {
      console.log(item)
      this.$api.forBanner(this, item)
    },
    checkout(item) {
      let ids = []
      Object.keys(item).forEach((key) => {
        if (item[key].image_id) {
          ids.push(item[key].url)
        }
      })
      console.log(ids)
      this.photo = ids
      this.checkDialogVisible = true
    },
    dowload(item) {
      let ids = []

      Object.keys(item).forEach((key) => {
        if (item[key].image_id) {
          ids.push(item[key].image_id)
        }
      })
      console.log(ids)
      // this.imgArr = ''
      // this.imgArr += item.image_id
      this.$api.downloadImages(this, '', ids)
    },
    editPicVisible(data) {
      console.log(data)
      // this.editPicCourse = {}
      for (var item in this.swiperForm) {
        this.swiperForm[item] = ''
      }
      // this.editPic = {}
      this.haschoose = true
      // this.url = ''
      this.swiperVisible = true
      this.swiperTitle = '编辑图片'
      this.banner_id = data.banner_id
      this.$api.getCategoryList(this, 'selectData') // 课程分类
      this.$api.bannerInfo(this, data.banner_id)
      // this.editPicdialogVisible = true
    },
    doActive(index) {
      this.current = index
      if (index == 2) {
        //提醒设置
      }
    },
    // 获取数据
    getTableList(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.studentData = val
      }
    },
    //获取搜索模板消息数据
    getTableListBoard(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.boardData = val
      }
    },
    getTableListIMg(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.classfi = val
      }
    },
    // addIcon() {
    //   this.$router.push({
    //     path: '/eda/addNewClassify',
    //     query: { pathRoute: '/extra/miniProgram' },
    //   })
    // },
    scopes(ab, sorts) {
      var regu = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/
      var re = new RegExp(regu)
      if (!re.test(sorts)) {
        this.$message.error('请输入正确的排序！')
        return false
      } else {
        this.$api.bannerSort(ab.banner_id, sorts, this)
      }
    },
    topayment(data) {
      console.log(data)
      this.$router.push(
        // name: 'payMent'
        {
          path: '/eda/lessonDetail',
          query: { id: data.category_id, url: JSON.stringify(data.icon) },
        }
      )
    },
    toStudentDetail() {
      this.$router.push({
        name: 'studentDetail',
      })
    },
    delbtn(row) {
      console.log(row)
      this.$confirm('确定要删除当前轮播图吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.bannerDelete(this, row.banner_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page, api, dataname) {
      console.log(api)
      this.page = page
      this.$api[api](this, dataname)
    },
    doPageChangeBoard(page) {
      this.page = page
      this.$api.getAppletMessageRecordList(this, 'boardData', this.datas)
      // this.$api.getPunchList(this, 'schoolData', this.datas)
    },

    addClassifion() {
      this.haschoose = false
      for (var i in this.swiperForm) {
        this.swiperForm[i] = ''
      }
      this.banner_id = ''
      this.url = ''
      this.swiperTitle = '添加图片'
      this.addClassify = {}
      this.swiperVisible = true
      this.$api.getCategoryList(this, 'selectData') // 课程分类
      this.$api.bannerInfo(this, data.banner_id)
    },
    handleConfirm() {
      console.log(this.swiperForm)
      console.log(this.swiperForm.image_id)
      if (this.banner_id == '' || this.banner_id == undefined) {
        this.$api.bannerAdd(this, 'swiperForm')
      } else {
        this.$api.modifybanner(this)
      }
    },
    // edithandleConfirm() {
    //   this.$api.modifybanner(this)
    // },
  },
}
</script>
<style lang="scss" scoped>
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
.active {
  color: #ffffff;
  background: rgba(25, 159, 255, 1);
}
.home {
  background: #ffffff;
  // margin: 23px 0px 0px 23px;
  // padding: 23px 23px 23px 23px;
  padding: 30px;
  font-size: 14px;
}
header {
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  ul {
    display: flex;
    width: 413px;
    justify-content: space-between;
    // border-bottom: 2px solid #d7d7d7;
    li {
      list-style: none;
      width: 70px;
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #cecece;
      border-bottom: 0 solid #ffffff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      cursor: pointer;
    }
    li:last-child {
      width: 96px;
    }
  }
}
.el-icon-folder-opened {
  font-size: 50px;
  cursor: pointer;
}

/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  background: #ffffff;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
/deep/.el-table .cell {
  display: flex;
  justify-content: center;
}
.boardDialog {
  font-size: 16px;
  font-family: Arial Normal, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #999;
  text-align: left;
  line-height: 30px;
  padding-left: 40px;
}
</style>
