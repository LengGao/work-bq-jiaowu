import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
let statiSys = {
  //统计课程列表
  getCourseList(self, name, data = {}) {
    let course_names = ''
    let type = ''
    let category_id = ''
    if (data.name != '' || data.name != undefined) {
      course_names = data.name
    }
    if (data.id != '' || data.id != undefined) {
      category_id = data.id
    }
    console.log(data.type != undefined && data.type != '')
    if (data.type != undefined && data.type != '') {
      type = data.type
    } else {
      type = self.type
    }
    // console.log(data.type)
    // console.log(type)
    let config = {
      type: type,
      page: self.page,
      course_name: course_names,
      category_id: category_id,
    }
    // console.log(config)
    axiosHttp({
      url: url.getCourseList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //每日打卡列表
  getPunchList(self, name, data = {}) {
    let start_time = ''
    let end_time = ''
    if (data.start_time != '' && data.start_time != '') {
      start_time = data.start_time
      end_time = data.end_time
    }
    let config = {
      page: self.page,
      start_time: start_time,
      end_time: end_time,
      problem_course_id: self.$route.query.problem_course_id,
    }

    axiosHttp({
      url: url.getPunchList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          // item.create_time = self.$moment
          //   .unix(item.create_time)
          //   .format('YYYY-MM-DD')
          if (item.accuracy) {
            item.accuracy = item.accuracy + '%'
          }
        }
        self[name] = res.data.data
      },
    })
  },
  //每日打卡特定一天详情
  getPunchInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    console.log(data.ruleForm)
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      date_time: self.$route.query.date_time,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }

    axiosHttp({
      url: url.getPunchInfo,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
          if (item.accuracy) {
            item.accuracy = item.accuracy + '%'
          }
        }
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //章节练习列表
  getPracticeList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      chapter_name: chapter_name,
    }
    console.log(config)

    axiosHttp({
      url: url.getPracticeList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          // item.create_time = self.$moment
          //   .unix(item.create_time)
          //   .format('YYYY-MM-DD')
          if (item.accuracy) {
            item.accuracy = item.accuracy + '%'
          }
        }
        self[name] = res.data.data
      },
    })
  },
  //章节练习详情统计
  getPracticeInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }

    let config = {
      page: self.page,
      problem_chapter_id: self.$route.query.problem_chapter_id,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }

    axiosHttp({
      url: url.getPracticeInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
          // if (item.accuracy) {
          item.accuracy = item.accuracy + '%'
          // }
        }
        self[name] = res.data.data
      },
    })
  },
  //历年真题列表
  getRealTopicLogList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      chapter_name: chapter_name,
    }
    console.log(config)

    axiosHttp({
      url: url.getRealTopicLogList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },

  //历年真题详情
  getRealTopicLogInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    let operation_type = ''
    let problem_chapter_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    if (data.operation_type != undefined) {
      operation_type = data.operation_type
    }
    if (data.problem_chapter_id != undefined) {
      problem_chapter_id = data.problem_chapter_id
    }
    console.log(data.problem_chapter_id)

    let config = {
      page: self.page,
      operation_type: operation_type,
      problem_chapter_id: problem_chapter_id,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
      operation_type: self.$route.query.operation_type,
      problem_chapter_id: self.$route.query.problem_chapter_id,
    }
    console.log(config)

    axiosHttp({
      url: url.getRealTopicLogInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
          item.err_problem =
            item.total_problem - item.right_problem - item.unanswered
          item.accuracy = item.accuracy + '%'
        }
        self[name] = res.data.data
      },
    })
  },
  //刷题挑战列表
  getChallengeList(self, name, data = {}) {
    let start_time = ''
    let end_time = ''
    if (data.start_time != '' && data.start_time != '') {
      start_time = data.start_time
      end_time = data.end_time
    }
    let config = {
      page: self.page,
      start_time: start_time,
      end_time: end_time,
      problem_course_id: self.$route.query.problem_course_id,
    }

    axiosHttp({
      url: url.getChallengeList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          item.accuracy = item.accuracy + '%'
        }
        self[name] = res.data.data
      },
    })
  },
  //刷题挑战详情
  getChallengeInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      date_time: self.$route.query.date_time,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }

    axiosHttp({
      url: url.getChallengeInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
          item.accuracy = item.accuracy + '%'
        }
        self[name] = res.data.data
      },
    })
  },
  //模拟考试列表
  getExamTestList(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getExamTestList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //模拟考试详情
  getExamTestInfo(self, name) {
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      uid: self.$route.query.uid,
    }

    axiosHttp({
      url: url.getExamTestInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
          item.accuracy = item.accuracy + '%'
        }
        self[name] = res.data.data
      },
    })
  },
  //自主出题列表
  getSelfDeterminationList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      chapter_name: chapter_name,
    }
    console.log(config)

    axiosHttp({
      url: url.getSelfDeterminationList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //自主出题详情
  getSelfDeterminationInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    let config = {
      page: self.page,
      problem_chapter_id: self.$route.query.problem_chapter_id,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }
    axiosHttp({
      url: url.getSelfDeterminationInfo,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.update_time = self.$moment
            .unix(item.update_time)
            .format('YYYY-MM-DD')
          item.accuracy = item.accuracy + '%'
        }
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //面授约课列表
  getSubscribeList(self, name, data = {}) {
    let chapter_name = ''
    if (data.name != '' || data.name != undefined) {
      chapter_name = data.name
    }
    let config = {
      page: self.page,
      problem_course_id: self.$route.query.problem_course_id,
      name: chapter_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getSubscribeList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //约课详情
  getSubscribeInfo(self, name, data = {}) {
    let realname = ''
    let institution_id = ''
    let campus_id = ''
    let classroom_id = ''
    if (data.name != '' || data.name != undefined) {
      realname = data.name
    }
    if (data.organization_id != '' || data.organization_id != undefined) {
      institution_id = data.organization_id
    }
    if (data.institution_id != '' || data.institution_id != undefined) {
      campus_id = data.institution_id
    }
    if (data.classroom_id != '' || data.classroom_id != undefined) {
      classroom_id = data.classroom_id
    }
    let config = {
      page: self.page,
      subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
      institution_id: institution_id,
      campus_id: campus_id,
      realname: realname,
      classroom_id: classroom_id,
    }
    axiosHttp({
      url: url.getSubscribeInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //推荐机构列统计
  getRecommendList(self, name, data = {}) {
    let institution_name = ''
    if (data.name != '' || data.name != undefined) {
      institution_name = data.name
    }
    let config = {
      page: self.page,
      institution_name: institution_name,
    }
    console.log(config)
    axiosHttp({
      url: url.getRecommendList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //推荐机构列统计
  getCourseCensus(self, name, data = {}) {
    let institution_name = ''
    if (data.name != '' || data.name != undefined) {
      institution_name = data.name
    }
    let config = {
      page: self.page,
      institution_id: self.$route.query.institution_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getCourseCensus,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  //学员统计
  getStaffCensus(self, name, data = {}) {
    let institution_name = ''
    if (data.name != '' || data.name != undefined) {
      institution_name = data.name
    }
    let config = {
      page: self.page,
      institution_id: self.$route.query.institution_id,
      course_id: self.$route.query.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getStaffCensus,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
}
export default statiSys
