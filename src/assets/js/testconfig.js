import { axiosHttp, v, url } from '@/assets/js/apiCommon'
let testconfig = {
  getExamConfigList(self, name, data = {}) {
    let category_name = ''
    let category_id = ''
    if (data.name != '' && data.name != undefined) {
      category_name = data.name
    }
    if (data.id != '' && data.id != undefined) {
      category_id = data.id
    }
    let config = {
      page: 1,
      course_name: category_name,
      category_id: category_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getExamConfigList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  insertExamConfig(self, name) {
    console.log(self[name])
    let config = {
      category_id: self.keytype,
      problem_course_id: self[name].problem_course_id,
      problem_num: parseInt(self[name].problem_num),
      problem_score: self[name].problem_score,
      pass_score: self[name].pass_score,
      duration: self[name].duration,
    }
    console.log(config)
    axiosHttp({
      url: url.insertExamConfig,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功！',
          })
          self.$router.go(-1)
        }
      },
    })
  },
  deleteExamConfig(self, id) {
    let config = {
      exam_config_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteExamConfig,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功！',
          })
          self.$api.getExamConfigList(self, 'schoolData')
        }
      },
    })
  },
  getExamConfigInfo(self, id) {
    let config = {
      exam_config_id: self.$route.query.id,
    }
    console.log(config)
    axiosHttp({
      url: url.getExamConfigInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          self.keytype = res.data.data.info.category_id
          if (self.keytype) {
            self.$api.getProblemCourseLists(self, 'courseList')
          }
          self.brand.problem_course_id = res.data.data.info.problem_course_id
          self.brand.problem_num = res.data.data.info.problem_num
          self.brand.problem_score = res.data.data.info.problem_score
          self.brand.pass_score = res.data.data.info.pass_score
          self.brand.duration = res.data.data.info.duration
        }
        console.log(self.brand)
      },
    })
  },
  updateExamConfig(self, name) {
    console.log(self[name])
    let config = {
      category_id: self.keytype,
      exam_config_id: self.$route.query.id,
      problem_course_id: self[name].problem_course_id,
      problem_num: parseInt(self[name].problem_num),
      problem_score: self[name].problem_score,
      pass_score: self[name].pass_score,
      duration: self[name].duration,
    }
    console.log(config)
    axiosHttp({
      url: url.updateExamConfig,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '更新成功！',
          })
          self.$router.go(-1)
        }
      },
    })
  },
  getExamExtendsInfo(self, data) {
    let config = {
      exam_config_id: self.$route.query.exam_config_id,
      exam_type: self.$route.query.exam_type,
    }
    console.log(config)
    axiosHttp({
      url: url.getExamExtendsInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          //针对模拟考试

          //针对模拟考试结束
          if (data) {
            self.option = res.data.data.list[0].info
            self.id = res.data.data.list[0].id
            return
          }
          self.option = res.data.data.list
          self.id = res.data.data.list[0].id
        }
      },
    })
  },
  getExamVirtualExtendsInfo(self, data) {
    let config = {
      exam_config_id: self.$route.query.exam_config_id,
      exam_type: self.$route.query.exam_type,
    }
    console.log(config)
    axiosHttp({
      url: url.getExamExtendsInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          // if(data){
          //     self.option = res.data.data.list[1].info
          //     self.id = res.data.data.list[1].id
          //     return
          // }
          self.option = res.data.data.list[1]
          self.id = res.data.data.list[1].id
          self.appointOption = res.data.data.list[0]
          console.log(res.data.data.list[0].info.chapter_config)
        }
      },
    })
  },
  updateExamExtends(self, name, data) {
    console.log(self[name])
    let update = []
    update.push(self[name])
    let exam_extend_config = update
    // let exam_extend_config = [{
    //         "id": self.id,
    //         "exam_config_id": self.$route.query.exam_config_id,
    //         "on_state": 1,
    //         "exam_type": self.$route.query.exam_type ,
    //         "is_delete": 0,
    //         "config_type": 1,
    //         "create_time": "1595577995",
    //         "update_time": "1595577995",
    //         "info": {
    //             "single": {
    //                 "topics_num": self[name][0].info.single.topics_num,
    //                 "topics_score": self[name][0].info.single.topics_score
    //             },
    //             "multiple": {
    //                 "topics_num": self[name][0].info.multiple.topics_num,
    //                 "topics_score":self[name][0].info.multiple.topics_score
    //             },
    //             "judge": {
    //                 "topics_num": self[name][0].info.judge.topics_num,
    //                 "topics_score": self[name][0].info.judge.topics_score
    //             },
    //             "fill_vacancy": {
    //                 "topics_num": self[name][0].info.fill_vacancy.topics_num,
    //                 "topics_score": self[name][0].info.fill_vacancy.topics_score
    //             },
    //             "brief": {
    //                 "topics_num": self[name][0].info.brief.topics_num,
    //                 "topics_score": self[name][0].info.brief.topics_score
    //             },
    //             "scene": {
    //                 "topics_num":self[name][0].info.scene.topics_num,
    //                 "topics_score": self[name][0].info.scene.topics_score
    //             },
    //             "multiple_choice_scenario": {
    //                 "state": self[name][0].info.multiple_choice_scenario.state,
    //                 "deduct_points": self[name][0].info.multiple_choice_scenario.deduct_points
    //             }
    //     }
    // }]
    console.log(exam_extend_config)
    let con = JSON.stringify(exam_extend_config)
    let configs = self.Base64.encode(con)
    let configing = {
      exam_extend_config: configs,
      check_value: self.appointOption.check_value,
    }
    axiosHttp({
      url: url.updateExamExtends,
      data: configing,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  updateExamExtended(self, name, data) {
    console.log(self[name])
    let exam_extend_config = [
      {
        id: self.id,
        exam_config_id: self.$route.query.exam_config_id,
        on_state: 1,
        exam_type: self.$route.query.exam_type,
        is_delete: 0,
        config_type: 1,
        create_time: '1595577995',
        update_time: '1595577995',
        info: {
          single: {
            topics_score: self[name].single.topics_score,
          },
          multiple: {
            topics_score: self[name].multiple.topics_score,
          },
          judge: {
            topics_score: self[name].judge.topics_score,
          },
          fill_vacancy: {
            topics_score: self[name].fill_vacancy.topics_score,
          },
          brief: {
            topics_score: self[name].brief.topics_score,
          },
          scene: {
            topics_score: self[name].scene.topics_score,
          },
          multiple_choice_scenario: {
            state: self[name].multiple_choice_scenario.state,
            deduct_points: self[name].multiple_choice_scenario.deduct_points,
          },
        },
      },
    ]
    console.log(exam_extend_config)
    let con = JSON.stringify(exam_extend_config)
    let configs = self.Base64.encode(con)
    let configing = {
      exam_extend_config: configs,
    }
    axiosHttp({
      url: url.updateExamExtends,
      data: configing,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
}
export default testconfig
