<template>
  <!--添加客户弹框--->

  <el-dialog
    title="添加客户"
    :visible.sync="curstomerVisible"
    width="70%"
    style="min-width:1070px"
  >
    <el-form
      label-width="110px"
      class="demo-ruleForm"
      :show-message="true"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :lg="8">
          <el-form-item label="客户姓名" prop="surname">
            <el-input class="input-width" v-model="ruleForm.surname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="手机号码" prop="mobile">
            <el-input class="input-width" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="备用号码" prop="name">
            <el-input class="input-width" v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8">
          <el-form-item label="身份证号" prop="id_card_number">
            <el-input
              class="input-width"
              v-model="ruleForm.id_card_number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="婚姻状况" prop="marry">
            <el-radio-group v-model="ruleForm.marry">
              <el-radio :label="2">未婚</el-radio>
              <el-radio :label="1">已婚</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              format="yyyy-MM-dd "
              value-format="yyyy-MM-dd "
              class="input-width"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="QQ" prop="qq">
            <el-input class="input-width" v-model="ruleForm.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="邮箱地址" prop="email">
            <el-input class="input-width" v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8">
          <el-form-item label="文化程度" prop="culture">
            <!-- <el-input
                   class="input-width"
                    v-model="ruleForm.culture"
                  ></el-input> -->
            <el-select
              v-model="ruleForm.value"
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
        </el-col>
        <el-col :lg="8">
          <el-form-item label="籍贯" prop="province">
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
            <!-- <el-input
                    class="input-width"
                    v-model="ruleForm.province"
                  ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="常住地" prop="city">
            <el-input class="input-width" v-model="ruleForm.city"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8">
          <el-form-item label="推荐机构" prop="from_organization_id">
            <el-input
              class="input-width"
              placeholder="请选择推荐机构"
              v-model="ruleForm.from_organization_id"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="8">
          <el-form-item label="渠道来源" prop="sources">
            <el-input
              class="input-width"
              placeholder="请选择渠道来源"
              v-model="ruleForm.sources"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="8">
                <el-form-item label="是否跨区报考" prop="name">
                  <el-input
                   class="input-width"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
              </el-col> -->
      </el-row>
      <el-row>
        <el-form-item label="备注信息" prop="tips">
          <el-input v-model="ruleForm.tips" type="textarea"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <span>这是一段信息</span> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="curstomerVisible = false">取 消</el-button>
      <el-button type="primary" @click="preserve('ruleForm')">保 存</el-button>
      <el-button type="primary" @click="preserve('ruleForm', 2)"
        >保存并报名</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    innerVisible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
