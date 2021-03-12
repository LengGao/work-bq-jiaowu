<template>
  <section class="mainwrap">
    <el-form
      style="max-width:1400px"
      ref="ruleForm"
      label-width="100px"
      label-position="right"
    >
      <el-row>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="所属分类" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所属分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="班级名称" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择班级名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="默认老师" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择默认老师">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="默认老师" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择默认老师">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="默认教室" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择默认教室">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="上课日期" prop="region">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-form-item label="默认上课时间" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择默认上课时间"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="8" :xs="8">
          <el-button
            plain
            type="primary"
            style="margin-left:50px"
            @click="createCourse"
          >
            生成预排课
          </el-button>
        </el-col>
      </el-row>
    </el-form>
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
          label="上课日期"
          show-overflow-tooltip
          min-width="200"
          prop="project_id"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.value1"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="星期"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="上课时间"
          min-width="250"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-time-picker
              style="width:200px"
              is-range
              v-model="scope.value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_price"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="lowest_price"
          label="授课方式"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </template
        ></el-table-column>

        <el-table-column
          prop="buy_number"
          label="上课教室"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </template
        ></el-table-column>
        <el-table-column
          prop="buy_number"
          label="跟班人员"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </template
        ></el-table-column>
        <el-table-column
          prop="buy_number"
          label="备注信息"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope"> <el-input></el-input> </template
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" @click="handleEdit(scope.row)"
                >保存</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >取消</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <footer>
        <el-checkbox v-model="checked">检查上课冲突</el-checkbox>
        <div><el-button>取消</el-button> <el-button>删除</el-button></div>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      schoolData: [{ buy_number: 1 }],
    }
  },
  methods: {
    createCourse() {
      let obj = { buy_number: 1 }
      this.schoolData.push(obj)
    },
  },
}
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
</style>
