<template>
  <!--添加客户弹框--->
  <section>
    <el-dialog
      title="添加客户"
      :visible.sync="openStatus"
      width="65%"
      :close-on-click-modal="false"
      @close="doClose"
      @open="handleOpen"
    >
      <el-form
        label-width="110px"
        class="info-form"
        :show-message="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="客户姓名" prop="surname">
          <el-input class="input-width" v-model="ruleForm.surname"></el-input>
        </el-form-item>

        <el-form-item label="手机号码" prop="mobile">
          <el-input class="input-width" v-model="ruleForm.mobile"></el-input>
        </el-form-item>

        <el-form-item label="备用号码" prop="second_mobile">
          <el-input
            class="input-width"
            v-model="ruleForm.second_mobile"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="id_card_number">
          <el-input
            class="input-width"
            v-model="ruleForm.id_card_number"
          ></el-input>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            format="yyyy-MM-dd "
            value-format="yyyy-MM-dd "
            style="width:240px"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="微信">
          <el-input class="input-width" v-model="ruleForm.wechat"></el-input>
        </el-form-item>

        <el-form-item label="QQ" prop="qq">
          <el-input class="input-width" v-model="ruleForm.qq"></el-input>
        </el-form-item>

        <el-form-item label="邮箱地址" prop="email">
          <el-input class="input-width" v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="文化程度" prop="culture">
          <!-- <el-input
                   class="input-width"
                    v-model="ruleForm.culture"
                  ></el-input> -->
          <el-select
            v-model="ruleForm.culture"
            placeholder="请选择文化程度"
            class="input-width"
          >
            <el-option
              v-for="item in cultures"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="籍贯" prop="province">
          <el-cascader
            size="large"
            class="input-width"
            :options="provinceAndCityData"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="常住地" prop="city">
          <el-cascader
            size="large"
            class="input-width"
            :options="provinceAndCityData"
            v-model="selectedOptionsLocal"
            @change="handleLocal"
          >
          </el-cascader>
          <!-- <el-input
                class="input-width"
                v-model="ruleForm.location"
              ></el-input> -->
        </el-form-item>

        <el-form-item label="推荐机构" prop="from_organization_id">
          <el-cascader
            class="input-width"
            v-model="ruleForm.from_organization_id"
            :options="institutionOption"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="渠道来源" prop="sources">
          <el-select
            v-model="ruleForm.sources"
            placeholder="请选择"
            class="input-width"
          >
            <el-option
              v-for="item in field_content"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注信息" prop="tips" style="width:100%">
          <el-input v-model="ruleForm.tips" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="doClose">取 消</el-button>
        <el-button type="primary" @click="preserve('ruleForm', 2)"
          >保 存</el-button
        >
        <el-button type="primary" @click="preserve('ruleForm')"
          >保存并报名</el-button
        >
      </span>
    </el-dialog>
    <customeRegist
      :addVisible="addVisible"
      :userInfo="userInfo"
      v-on:addDialog="getaddStatus($event)"
    />
  </section>
</template>

<script>
import {
  regionDataPlus,
  CodeToText,
  regionData,
  provinceAndCityData,
  TextToCode,
} from 'element-china-area-data'
import { getInstitutionSelectData } from '@/api/sou'
import { cloneOptions } from '@/utils/index'
import { getfieldinfo } from '@/api/etm'
import customeRegist from './customeRegist'
import { getBirth, getSex } from '@/utils/index'
export default {
  components: {
    customeRegist,
  },
  props: {
    innerVisible: {
      type: Boolean,
      default: false,
    },
    seaUserInfo: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
      userInfo: {},
      regionData: regionData,
      provinceAndCityData: provinceAndCityData,
      selectedOptions: [],
      institutionOption: [],
      selectedOptionsLocal: [],
      field_content: [],
      organData: {},
      ruleForm: {
        wechat: '',
        second_mobile: '',
        location: '',
        surname: '',
        mobile: '',
        id_card_number: '',
        sex: 0,
        birthday: '',
        marry: 0,
        qq: '',
        email: '',
        culture: '',
        province: '',
        city: '',
        from_organization_id: '',
        sources: '',
        tips: '',
        uid: '',
      },
      addVisible: false,
      openStatus: this.innerVisible,
      cultures: [
        {
          value: 1,
          label: '文化',
        },
        {
          value: 2,
          label: '小学',
        },
        {
          value: 3,
          label: '初中',
        },
        {
          value: 4,
          label: '高中',
        },
        {
          value: 5,
          label: '专科',
        },
        {
          value: 6,
          label: '本科',
        },
      ],
      rules: {
        surname: [
          { required: true, message: '请填写学生姓名', trigger: 'blur' },
        ],
        // mail: [{ validator: validMail, trigger: 'blur', required: true }],
        // mobile: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   {
        //     validator: function(rule, value, callback) {
        //       if (/^1\d\d{9}$/.test(value) == false) {
        //         callback(new Error('请输入正确的手机号'))
        //       } else {
        //         callback()
        //       }
        //     },
        //     trigger: 'blur',
        //   },
        // ],
        id_card_number: [
          { required: true, message: '请输入身份证ID', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error('你的身份证格式不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        // sources: [
        //   { required: true, message: '请填写渠道来源', trigger: 'change' },
        // ],
      },
    }
  },
  watch: {
    innerVisible(val) {
      this.openStatus = val
    },
    seaUserInfo(val) {
      console.log(this.seaUserInfo)
      this.ruleForm.uid = this.seaUserInfo.uid
      this.ruleForm.mobile = this.seaUserInfo.mobile
      this.ruleForm.surname = this.seaUserInfo.realname
    },
  },
  created() {},
  methods: {
    // 获取渠道来源
    async getfieldinfo() {
      const data = {
        field_text: '渠道来源',
      }
      const res = await getfieldinfo(data)
      if (res.code === 0) {
        this.field_content = res.data.field_content.map((i, index) => {
          var obj = {}
          obj.value = index + 1
          obj.label = i
          return obj
        })
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true }
      const res = await getInstitutionSelectData(data)
      if (res.code === 0) {
        this.institutionOption = cloneOptions(
          res.data,
          'institution_name',
          'institution_id',
          'children'
        )
      }
    },
    handleOpen() {
      this.getInstitutionSelectData()
      this.getfieldinfo()
    },
    handleChange(value) {
      console.log(this.selectedOptions)
      console.log(value) // ["110000", "110100", "110101"]
      //CodeToText是个大对象，属性是区域码，属性值是汉字 用法例如：CodeToText['110000']输出北京市
      // console.log(
      //   CodeToText[value[0]],
      //   CodeToText[value[1]],
      //   CodeToText[value[2]]
      // ) //北京市 市辖区 东城区
      this.ruleForm.province = value[0]
      this.ruleForm.city = value[1]
    },
    handleLocal(value) {
      console.log(value)
      this.ruleForm.location = CodeToText[value[0]] + CodeToText[value[1]]
    },
    getaddStatus(status) {
      this.addVisible = status
    },
    preserve(formName, num) {
      console.log(this.ruleForm)
      // this.addVisible = true //客户报名弹框显示
      //没有自动填充生日
      if (this.ruleForm.birthday == '') {
        this.ruleForm.birthday = getBirth(this.ruleForm.id_card_number)
      }
      //没有自动填充性别
      if (this.ruleForm.sex == '') {
        this.ruleForm.sex = getSex(this.ruleForm.id_card_number)
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.addCustomers(this, this.ruleForm, num)
          // alert('submit!');
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    doClose() {
      for (var item in this.ruleForm) {
        this.ruleForm[item] = ''
      }
      this.$emit('innerDialog', false)
    },
  },
}
</script>

<style lang="scss" socped>
.input-width {
  width: 240px;
}
.info-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    width: 400px;
  }
}
</style>
