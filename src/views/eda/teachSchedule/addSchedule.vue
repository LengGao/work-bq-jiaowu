<template>
  <section class="mainwrap">
    <el-form ref="ruleForm" label-width="100px" label-position="right">
      <el-row>
        <el-col :lg="6" :md="6">
          <el-form-item label="所属分类" prop="region">
            <el-cascader
              class="com-width"
              v-model="ruleForm.category_id"
              placeholder="请选择所属分类"
              :options="typeOptions"
              @change="handleTypeChange"
            >
            </el-cascader>
            <!-- <el-select
          class="com-width"
          v-model="ruleForm.category_id"
          placeholder="请选择所属分类"
          @change="categoryChange"
        >
          <el-option
            v-for="item in cateData.list"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id"
          ></el-option>
        </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <el-form-item
            label="班级名称"
            prop="region"
            v-if="ruleForm.category_id"
          >
            <el-select
              class="com-width"
              multiple
              v-model="ruleForm.classroom_id_arr"
              placeholder="请选择班级名称"
            >
              <el-option
                v-for="item in classRoomData"
                :key="item.classroom_id"
                :label="item.classroom_name"
                :value="item.classroom_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="6" :md="6">
          <el-form-item label="上课日期" prop="date">
            <el-date-picker
              class="com-width"
              ref="datesRef"
              :editable="false"
              v-model="dateArr"
              type="dates"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择一个或多个日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <el-form-item label="默认上课时间" prop="classTime">
            <el-time-picker
              @change="choseTime"
              is-range
              style="width:240px"
              v-model="classTimeArr"
              format="HH:mm"
              value-format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <el-form-item label="默认老师" prop="teacher_id">
            <el-select
              v-model="ruleForm.teacher_id"
              placeholder="请选择默认老师"
              class="com-width"
            >
              <el-option
                v-for="item in teacherData"
                :key="item.teacher_id"
                :label="item.teacher_name"
                :value="item.teacher_id"
              ></el-option>
              <!-- <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="6"> </el-col> -->
      </el-row>
      <el-row>
        <el-col :lg="6" :md="6">
          <el-form-item label="默认方式" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择默认方式"
              class="com-width"
            >
              <el-option
                v-for="item in regionData"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <el-form-item label="默认教室" prop="schoolroom_id">
            <el-select
              class="com-width"
              v-model="ruleForm.schoolroom_id"
              placeholder="请选择默认教室"
            >
              <el-option
                v-for="item in roomData"
                :key="item.id"
                :label="item.room_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <el-form-item label="默认跟班人员" prop="schoolroom_id">
            <el-select
              v-model="ruleForm.staff_id"
              placeholder="请选择"
              multiple
              class="com-width"
            >
              <el-option
                v-for="item in staffData"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="6">
          <div style="display:flex;justify-content:flex-end">
            <el-button
              plain
              type="primary"
              style="margin-left:50px"
              @click="createCourse"
            >
              生成预排课
            </el-button>
          </div>
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
          min-width="160"
          prop="project_id"
        >
          <template slot-scope="scope">
            <el-date-picker
              style="width:160px"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="scope.row.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="星期"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="上课时间" min-width="260" show-overflow-tooltip>
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.timeArr"
              :key="index"
              style="margin-bottom:10px"
            >
              <!-- {{ item }} -->
              <el-time-picker
                style="width:250px"
                format="HH:mm"
                value-format="HH:mm"
                is-range
                v-model="scope.row.timeArr[index]"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
              <span
                class="el-icon-plus"
                style="padding-left:10px"
                @click="addTime(scope.row.timeArr, scope.$index)"
              ></span>
              <span
                class="el-icon-minus"
                style="padding-left:5px"
                @click="delTime(scope.row.timeArr, index)"
              >
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_price"
          label="上课老师"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.teacher_id"
              placeholder="请选择"
              class="common-width"
            >
              <el-option
                v-for="item in teacherData"
                :key="item.teacher_id"
                :label="item.teacher_name"
                :value="item.teacher_id"
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
            <el-select
              v-model="scope.row.teaching_type"
              placeholder="请选择 "
              class="common-width"
            >
              <el-option
                v-for="item in regionData"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select> </template
        ></el-table-column>

        <el-table-column
          prop="buy_number"
          label="上课教室"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.schoolroom_id"
              placeholder="请选择"
              class="common-width"
            >
              <el-option
                v-for="item in roomData"
                :key="item.id"
                :label="item.room_name"
                :value="item.id"
              ></el-option>
            </el-select> </template
        ></el-table-column>
        <el-table-column
          prop="buy_number"
          label="跟班人员"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.staff_id"
              placeholder="请选择"
              multiple
              class="common-width"
            >
              <el-option
                v-for="item in staffData"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
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
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input> </template
        ></el-table-column>
        <!-- <el-table-column label="操作" fixed="right" min-width="200">
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
        </el-table-column> -->
      </el-table>
      <el-button type="text" @click="addOneClass">添加单个上课信息</el-button>
      <footer>
        <!-- <el-checkbox v-model="checked">检查上课冲突</el-checkbox> -->
        <div>
          <el-button>取 消</el-button>
          <el-button type="primary" @click="handleSave">保 存</el-button>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import { getCateList } from '@/api/sou'
import { cloneOptions } from '@/utils/index'
export default {
  data() {
    return {
      value1: [],
      roomData: [],
      staffData: [],
      cateData: [],
      regionData: [
        {
          value: 1,
          name: '面授',
        },
        {
          value: 2,
          name: '直播',
        },
      ],
      classTimeArr: '',
      dateArr: [],
      teacherData: {},
      ruleForm: {
        date: '',
        title: '',
        classroom_id_arr: '',
        category_id: '',
        teacher_id: '',
        teaching_type: '',
        schoolroom_id: '',
        start_time: '',
        end_time: '',
        stfaa_id: '',
        remark: '',
        class_hour: [],
      },
      schoolData: [],
      options: [],
      typeOptions: [],
      classRoomData: [],
    }
  },
  mounted() {
    this.getCateList()
    // this.$api.classroomList(this, 'classData') //班级列表

    this.$api.getTeacherSublist(this, 'teacherData') //老师列表
    this.$api.getStaffSelect(this, 'staffData') //跟班人员下拉列表
    this.$api.getRoomSelect(this, 'roomData') //教室列表

    //为了解决bug，所以默认值放在了这里
    this.$nextTick(function() {
      // this.dateArr = ['2018-08-03', '2018-08-06']
      // this.$refs.datesRef.showPicker()
      // this.$refs.datesRef.hidePicker()
    })
  },
  methods: {
    handleTypeChange(ids) {
      const id = ids ? [...ids].pop() : ''
      this.$api.getcourseallclass(this, id, 'classRoomData')
      // this.getproject(id)
    },
    async getCateList() {
      const data = { list: true }
      const res = await getCateList(data)
      if (res.code === 0) {
        console.log(res)
        this.typeOptions = cloneOptions(
          res.data,
          'category_name',
          'category_id',
          'son'
        )
        console.log(this.typeOptions)
      }
    },
    categoryChange(e) {
      console.log(e)
      if (this.schoolData.length != 0) {
        console.log(this.schoolData)
        this.schoolData.forEach((i) => {
          i.category_id = this.ruleForm.category_id
        })
      }
    },
    choseTime(e) {},
    addTime(ab, index) {
      let arr = ab[0]
      ab.push(arr)

      // console.log(this.schoolData[index])
    },
    delTime(ab, index) {
      if (ab.length > 1) {
        ab.splice(index, 1)
      }
    },
    handleSave() {
      //对上课时间进行处理
      var date = new Date()
      this.schoolData.forEach((i) => {
        if (i.timeArr.length > 1) {
          i.timeArr.forEach((v, index) => {
            console.log(v, index)
            //把每次的开始时间和结束时间推到列表
            var obj = {
              start_time: v[0],
              end_time: v[1],
            }
            i.class_hour.push(obj)
          })

          var min = date.setHours(
            i.class_hour[0].start_time.split(':')[0],
            i.class_hour[0].start_time.split(':')[1]
          )
          var max = date.setHours(
            i.class_hour[0].end_time.split(':')[0],
            i.class_hour[0].end_time.split(':')[1]
          )
          console.log(min, max)
          var minIndex = 0
          var maxIndex = 0
          //根据时间列表取最大和最小的下标
          i.class_hour.forEach((vit, it) => {
            var a = vit.start_time.split(':')
            var b = vit.end_time.split(':')
            // console.log(date.setHours(a[0], a[1]))
            if (min > date.setHours(a[0], a[1])) {
              min = date.setHours(a[0], a[1])
              minIndex = it
            }
            if (max < date.setHours(b[0], b[1])) {
              max = date.setHours(b[0], b[1])
              maxIndex = it
            }
          })

          i.start_time = i.class_hour[minIndex].start_time
          i.end_time = i.class_hour[maxIndex].end_time
        } else {
          var obj = {
            start_time: i.timeArr[0][0],
            end_time: i.timeArr[0][1],
          }
          i.start_time = i.timeArr[0][0]
          i.end_time = i.timeArr[0][1]
          i.class_hour.push(obj)
        }
      })
      console.log(this.schoolData)
      this.$api.addScheduling(this, this.schoolData)
    },
    addOneClass() {
      var obj = {
        date: '',
        title: new Date(),
        classroom_id_arr: this.ruleForm.classroom_id_arr,
        // classroom_id_arr: [55, 56, 57],
        category_id: this.ruleForm.category_id,
        teacher_id: this.ruleForm.teacher_id,
        teaching_type: this.ruleForm.region,
        schoolroom_id: this.ruleForm.schoolroom_id,
        timeArr: [['04:40', '09:40']],
        staff_id: this.ruleForm.staff_id,
        remark: this.ruleForm.teaching_type,
        class_hour: [],
      }
      this.schoolData.push(obj)
    },

    createCourse() {
      this.schoolData = []
      // console.log(this.ruleForm)
      // console.log(this.classTimeArr)
      let timeArr = []
      timeArr.push(JSON.parse(JSON.stringify(this.classTimeArr)))
      // timeArr.push(this.classTimeArr)

      console.log(timeArr)
      this.dateArr.forEach((i) => {
        var obj = {
          date: i,
          title: i,
          classroom_id_arr: this.ruleForm.classroom_id_arr,
          // classroom_id_arr: [],
          category_id: this.ruleForm.category_id,
          teacher_id: this.ruleForm.teacher_id,
          teaching_type: this.ruleForm.region,
          schoolroom_id: this.ruleForm.schoolroom_id,
          timeArr: [...timeArr],
          staff_id: this.ruleForm.staff_id,
          remark: this.ruleForm.teaching_type,
          class_hour: [],
        }
        // obj.timeArr.push(timeArr)
        // console.log(obj.timeArr)
        this.schoolData.push(obj)
        console.log(obj)
      })
      console.log(this.schoolData)
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
footer {
  width: 100%;
  bottom: 20px;
  margin: 120px 20px 0 0;
  display: flex;
  justify-content: flex-end;
}
.common-width {
  width: 90px;
}
.com-width {
  width: 240px;
}
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
