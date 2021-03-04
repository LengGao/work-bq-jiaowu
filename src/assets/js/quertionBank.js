import { axiosHttp, v, url } from '@/assets/js/apiCommon'

let quertionBank = {
  downloadZips(data) {
    console.log(data)
    var a = document.createElement('a')
    a.download = name || 'pic'
    // 设置图片地址
    a.href = data
    a.click()
  },
  getProblemCourseList(self, name, data = {}) {
    let course_names = ''
    if (data.name != '' || data.name != undefined) {
      course_names = data.name
    }
    let category_id = ''
    if (
      self.ruleForm.course_category_id != undefined &&
      self.ruleForm.course_category_id != ''
    ) {
      category_id = self.ruleForm.course_category_id
    }
    if (self.keytype) {
    }
    let config = {
      page: self.page,
      course_name: course_names,
      category_id: self.keytype || 0 || category_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemCourseList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  getProblemCourseLists(self, name, data = {}) {
    let course_names = ''
    if (data.name != '' || data.name != undefined) {
      course_names = data.name
    }
    if (self.keytype) {
    }
    let config = {
      page: self.page,
      course_name: course_names,
      category_id: self.keytype || 0,
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemCourseList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
      },
    })
  },
  openlive(self, row, name) {
    let config = {
      live_class_id: row.live_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.openlive,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        self.$api.livelist(self, 'videoData')
      },
    })
  },
  //发起直播（开始直播按钮）
  livestart(self, row, name) {
    let config = {
      live_class_id: row.live_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.livestart,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        self.channelId = res.data.data.data.channelId
        self.channelPasswd = res.data.data.data.channelPasswd
        self.WebpageUrl =
          'https://live.polyv.net/web-start/classroom?channelId=' +
          self.channelId
        self.clientUrl =
          'https://live.polyv.net/start-client.html?channelId=' + self.channelId
        console.log(self.channelId)
        self.channel_accout = res.data.data.data.channel_account
        // console.log(self.channel_accout)
        // self.account = res.data.data.data.channel_account[0].account
        // self.passwd = res.data.data.data.channel_account[0].passwd
        self.$api.livelist(self, 'videoData')
        console.log(self.account, self.passwd)
      },
    })
  },
  //新增保利威直播详情
  getLiveLink(self, row, name, num) {
    let live_class_id = ''
    let live_id = ''
    console.log(num)
    if (num == 1) {
      live_class_id = ''
      live_id = row.live_id
    } else {
      live_class_id = row.live_class_id
      live_id = ''
    }

    let config = {
      live_class_id: live_class_id,
      live_id: live_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getLiveLink,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        console.log(res.data.data)
        console.log(res.data.data.channelId)
        self.channelId = res.data.data.channelId
        self.channelPasswd = res.data.data.channelPasswd
        self.channel_accout = res.data.data.channel_accout
        // self.account = res.data.data.channel_accout[0].account
        // self.passwd = res.data.data.channel_accout[0].passwd
        console.log(self.channel_accout)
        self.WebpageUrl =
          'https://live.polyv.net/web-start/classroom?channelId=' +
          self.channelId
        self.clientUrl =
          'https://live.polyv.net/start-client.html?channelId=' + self.channelId

        // self.$api.livelist(self, 'videoData')
      },
    })
  },
  //删除直播班级
  LiveToDelete(self, row, List) {
    let config = {
      live_class_id: row.live_class_id,
    }
    axiosHttp({
      url: url.LiveToDelete,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.livelist(self, 'videoData', self.datas)
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
        } else {
          self.$message.error(res.data.message)
        }
      },
    })
  },
  //获取直播链接详情
  getLiveInfo(self, row, name) {
    let config = {
      live_class_id: row.live_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getLiveInfo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        self.channelId = res.data.data.channelId
        self.channelPasswd = res.data.data.channelPasswd
        self.WebpageUrl =
          'https://live.polyv.net/web-start/classroom?channelId=' +
          res.data.data.channelId
        self.clientUrl =
          'https://live.polyv.net/start-client.html?channelId=' +
          res.data.data.channelId
        console.log(self.WebpageUrl, self.clientUrl)
        // self.$api.livelist(self, 'videoData')
      },
    })
  },
  closeLive(self, id) {
    let config = {
      live_class_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.closelive,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '关闭成功!',
          })
          self.$api.livelist(self, 'videoData')
        }
      },
    })
  },
  //获取公开课资料列表
  getLiveDataList(self, id) {
    let config = {
      live_id: self.$route.query.live_id,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getLiveDataList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          // self.$message({
          //   type: 'success',
          //   message: '关闭成功!',
          // })
          // self.$api.livelist(self, 'videoData')
        }
      },
    })
  },
  livenumberlist(self, name, search) {
    let keyboard = ''
    if (search != undefined) {
      keyboard = search.name
    }
    let config = {
      page: self.page,
      keyboard: keyboard,
      live_class_id: self.$route.query.live_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.livenumberlist,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        for (let item of res.data.data.data) {
          if (item.start_push_time != 0) {
            item.start_push_time = self.$moment
              .unix(item.start_push_time)
              .format('YYYY-MM-DD HH:mm:ss')
          } else {
            item.start_push_time = '未确定时间'
          }
          if (item.end_push_time != 0) {
            item.end_push_time = self.$moment
              .unix(item.end_push_time)
              .format('YYYY-MM-DD HH:mm:ss')
          } else {
            item.end_push_time = '未确定时间'
          }
        }

        self[name] = res.data.data
      },
    })
  },
  deleteProblemCourse(self, name) {
    let config = {
      problem_course_id: name,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteProblemCourse,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getProblemList(self, 'chapterData')
          // self.$api.getProblemCourseList(self, 'questionBank')
        }
      },
    })
  },
  updateProblemCourse(self, name) {
    let config = {
      problem_course_id: parseInt(self[name].problem_course_id),
      category_id: parseInt(self[name].category_id),
      course_name: self[name].category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.updateProblemCourse,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self.$api.getProblemCourseList(self, 'questionBank')
        }
      },
    })
  },
  insertProblemCourse(self, name) {
    let config = {
      category_id: self[name].category_id,
      course_name: self[name].category_name,
    }
    console.log(config)
    axiosHttp({
      url: url.insertProblemCourse,
      data: config,
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self.$api.getProblemCourseList(self, 'questionBank')
        }
      },
    })
  },
  getProblemCourseInfo(self, name) {
    let config = {
      problem_course_id: parseInt(self['category_id']),
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemCourseInfo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  getChapterList(self, name) {
    let config = {
      page: 1,
      problem_course_id: parseInt(self.$route.query.problem_course_id),
      chapter_type: self.$route.query.chapter_type,
      chapter_name: '',
      limit: 9999,
    }
    console.log(config)
    axiosHttp({
      url: url.getChapterList,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data

          // 不默认存储 ID ，每次进入页面自动激活全部题目
          // self.problem_chapter_id = res.data.data.list[0].problem_chapter_id

          console.log(res.data.data, 'res.data.data')
        }
      },
    })
  },
  //修改章节分类排序
  updateChapterSort(problem_chapter_id, sort, self) {
    let config = {
      sort: sort,
      problem_chapter_id: problem_chapter_id,
    }
    // console.log(config)
    axiosHttp({
      url: url.updateChapterSort,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self[name] = res.data.data
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  //批量排序题库章节
  problemChapterSort(sortAry, self) {
    let config = {
      sortAry: sortAry,
    }
    // console.log(config)
    axiosHttp({
      url: url.problemChapterSort,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self[name] = res.data.data
          self.$api.getProblemList(self, 'chapterData')
          // self.$message({
          //   type: 'success',
          //   message: res.data.message,
          // })
        }
      },
    })
  },
  insertChapter(self, name) {
    let config = {
      chapter_name: self[name].category_name,
      problem_course_id: parseInt(self.$route.query.problem_course_id),
      chapter_type: self.$route.query.chapter_type,
      sort: parseInt(self[name].sort),
    }
    console.log(config)
    axiosHttp({
      url: url.insertChapter,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.getChapterList(self, 'testList')
        }
      },
    })
  },
  deleteChapter(self, id) {
    let config = {
      problem_chapter_id: parseInt(id),
    }
    console.log(config)
    axiosHttp({
      url: url.deleteChapter,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '已删除',
          })
          self.$api.getChapterList(self, 'testList')
        }
      },
    })
  },
  updateChapterInfo(self, name) {
    let config = {
      chapter_name: self[name].category_name,
      problem_chapter_id: parseInt(self[name].problem_chapter_id),
      sort: parseInt(self[name].sort),
    }
    console.log(config)
    axiosHttp({
      url: url.updateChapterInfo,
      data: config,
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功',
          })
          self.$api.getChapterList(self, 'testList')
        }
      },
    })
  },
  getProblemList(self, name, data = {}) {
    let problem_title = ''
    if (data.name != '' || data.name != undefined) {
      problem_title = data.name
    }
    console.log(self.problem_chapter_id, ' self.problem_chapter_id')
    let config = {
      problem_course_id: parseInt(self.$route.query.problem_course_id),
      problem_title: problem_title,
      problem_chapter_id: self.problem_chapter_id || 0,
      chapter_type: self.$route.query.chapter_type,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemList,
      data: config,
      method: 'GET',
      then(res) {
        console.log('res --->', res)
        if (res.data.code === 0) {
          self[name] = res.data.data
        }
      },
    })
  },
  deleteProblem(self, name) {
    let config = {
      problemIds: self[name],
    }
    console.log(config)
    axiosHttp({
      url: url.deleteProblem,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '已删除',
          })
          self[name].length = 0
          self.$api.getProblemList(self, 'chapterData')
          self.$api.getChapterList(self, 'testList')
        }
      },
    })
  },
  moveProblem(self, name) {
    let config = {
      problemIds: self[name],
      chapter_type: self.$route.query.chapter_type,
      problem_course_id: parseInt(self.$route.query.problem_course_id),
      problem_chapter_id: parseInt(self['chapter_id']),
    }
    console.log(config)
    axiosHttp({
      url: url.moveProblem,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$api.getProblemList(self, 'chapterData')
          self.$api.getChapterList(self, 'testList')
        }
      },
    })
  },
  insertProblemData(self, name) {
    console.log(self[name])
    let option = []
    if (self.$route.query.problem_type == 4) {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: '',
          problem_option_description: '',
        })
      })
    } else {
      console.log(self[name].problem_content)
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: String.fromCharCode(i + 65),
          problem_option_description: item.content,
        })
      })
    }
    //   self[name].problem_content = option
    //   self[name].problem_answer = res.data.data.info.problem_answer
    //   self.problem_id = res.data.data.info.problem_id
    // }
    let ignore_order = self.value1 ? 1 : 0
    console.log(
      self.$route.query.problem_chapter_id,
      self.parentData != undefined
    )
    let problem = []
    if (self.parentData != undefined) {
      for (let items of self.parentData.list) {
        console.log(items)
        let muitiOPtion = []
        if (items.problem_type == 4) {
          items.problem_content.forEach((item, i) => {
            muitiOPtion.push({
              problem_option: '',
              problem_option_description: '',
            })
          })
        } else {
          items.problem_content.forEach((item, i) => {
            muitiOPtion.push({
              problem_option: String.fromCharCode(i + 65),
              problem_option_description: item.content,
            })
          })
        }
        problem.push({
          problem_child_type: parseInt(items.problem_type),
          problem_title: items.problem_title,
          problem_description: items.problem_description,
          problem_analysis: items.problem_analysis,
          problem_answer: items.problem_answer,
          ignore_order: ignore_order,
          option: muitiOPtion,
        })
      }
    } else {
      problem.push({
        problem_child_type: self.$route.query.problem_type,
        problem_title: self[name].problem_title,
        problem_description: self[name].problem_description,
        problem_analysis: self[name].problem_analysis,
        problem_answer: self[name].problem_answer,
        ignore_order: ignore_order,
        option: option,
      })
    }
    let problem_type = self.$route.query.problem_type
    let config = {
      chapter_type: self.$route.query.chapter_type,
      problem_course_id: self.$route.query.problem_course_id,
      problem_chapter_id: self[name].problem_chapter_id,
      problem_type: self.$route.query.problem_type,
      problem_title:
        problem_type == 6
          ? self.parentData.problem_title
          : self[name].problem_title,
      problem_description:
        problem_type == 6
          ? self.parentData.problem_description
          : self[name].problem_analysis,
      problem: problem,
    }
    // for (let it of res.data.data.info.option) {
    //   self[name].problem_content.forEach((item, i) => {
    //     if (String.fromCharCode(i + 65) == it.problem_option) {
    //       item.content = it.problem_option_description
    //     }
    //   })
    // }
    console.log(config)
    axiosHttp({
      url: url.insertProblemData,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self.$router.go(-1)
        }
      },
    })
  },
  getProblemInfo(self, name) {
    let config = {
      problem_id: parseInt(self.$route.query.problem_id),
    }
    self['subjectData'] = {
      problem_title: '',
      problem_description: '',
      problem_chapter_id: '',
      problem_content: [],
      problem_answer: '',
      problem_analysis: '',
    }
    console.log(config)
    axiosHttp({
      url: url.getProblemInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          // console.log(res.data, Number(res.data.data.info.problem_chapter_id))
          let option = []
          self[name].problem_chapter_id = Number(
            res.data.data.info.problem_chapter_id
          )
          // console.log(typeof res.data.data.info.problem_chapter_id.toString())
          // self[name].problem_chapter_id = res.data.data.info.problem_chapter_id
          self[name].problem_title = res.data.data.info.problem_title
          self[name].problem_description =
            res.data.data.info.problem_description
          self[name].problem_analysis = res.data.data.info.problem_analysis
          self.defaultbutton = res.data.data.info.problem_answer
          for (let it of res.data.data.info.option) {
            option.push({
              content: '',
            })
          }
          self[name].problem_content = option
          self[name].problem_answer = res.data.data.info.problem_answer
          self.problem_id = res.data.data.info.problem_id
        }
        if (res.data.data.info.problem_type == 4) {
          self[name].problem_content.forEach((item, i) => {
            item.content =
              res.data.data.info.option[i].problem_option_description
          })
          return
        }
        for (let it of res.data.data.info.option) {
          self[name].problem_content.forEach((item, i) => {
            if (String.fromCharCode(i + 65) == it.problem_option) {
              item.content = it.problem_option_description
            }
          })
        }
      },
    })
  },

  updateProblem(self, name) {
    let option = []
    if (self.$route.query.problem_type == 4) {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: '',
          problem_option_description: '',
        })
      })
    } else {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: String.fromCharCode(i + 65),
          problem_option_description: item.content,
        })
      })
    }
    let ignore_order = self.value1 ? 1 : 0
    let config = {
      parent_problem: {
        problem_chapter_id: self[name].problem_chapter_id,
        problem_id: self.problem_id,
        problem_title: self[name].problem_title,
        problem_description: self[name].problem_description,
        problem_analysis: self[name].problem_analysis,
        problem_answer: self[name].problem_answer,
        ignore_order: ignore_order,
        option: option,
      },
      delete_child_problem: [],
      insert_new_child_problem: [],
      update_child_problem: [],
    }
    console.log(config)
    axiosHttp({
      url: url.updateProblem,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
        }
      },
    })
  },
  insertAnalyseProblemData(self, name) {
    console.log(self[name], self['subjectData'])
    let option = []
    let ignore_order = self.value1 ? 1 : 0
    if (self.$route.query.problem_type == 4) {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: '',
          problem_option_description: '',
        })
      })
    } else {
      self['subjectData'].problem_content.forEach((item, i) => {
        option.push({
          problem_option: String.fromCharCode(i + 65),
          problem_option_description: item.content,
        })
      })
    }
    let problem = []
    if (self.parentData.list != undefined) {
      for (let items of self.parentData.list) {
        console.log(items)
        let muitiOPtion = []
        items.problem_content.forEach((item, i) => {
          muitiOPtion.push({
            problem_option: String.fromCharCode(i + 65),
            problem_option_description: item.content,
          })
        })
        problem.push({
          problem_child_type: parseInt(items.problem_type),
          problem_title: items.problem_title,
          problem_description: items.problem_title,
          problem_analysis: items.problem_analysis,
          problem_answer: items.problem_answer,
          ignore_order: ignore_order,
          option: muitiOPtion,
        })
      }
    }
    console.log(problem)
    let config = {
      chapter_type: self.$route.query.chapter_type,
      problem_course_id: self.$route.query.problem_course_id,
      problem_chapter_id: self[name].problem_chapter_id,
      problem_type: self.$route.query.problem_type,
      problem_title: self[name].problem_title,
      problem_description: self[name].problem_description,
      problem: problem,
    }
    console.log(config)
    axiosHttp({
      url: url.insertProblemData,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
        }
      },
    })
  },
  getAnalyseProblemInfo(self, name, parentData, number = 0) {
    let config = {
      problem_id: parseInt(self.$route.query.problem_id),
    }
    console.log(config, parentData)
    axiosHttp({
      url: url.getProblemInfo,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data, res.data.data.info.child[0].option)
          let option = []
          //父节点反显
          self[parentData].problem_chapter_id = Number(
            res.data.data.info.problem_chapter_id
          )
          self[parentData].problem_title = res.data.data.info.problem_title
          self[parentData].problem_description =
            res.data.data.info.problem_description
          self.problem_type = res.data.data.info.chapter_type.toString()
          self[parentData].list = res.data.data.info.child
          self.problem_id = res.data.data.info.problem_id //父节点ID
          console.log(
            Number(res.data.data.info.child[number].problem_child_type)
          )
          //子节点反显
          self.colorIndex = number //默认展示第一条
          self.value = res.data.data.info.child[
            number
          ].problem_child_type.toString()
          self[name].problem_type = Number(
            res.data.data.info.child[number].problem_child_type
          )
          self[name].problem_chapter_id = Number(
            res.data.data.info.child[number].problem_chapter_id
          )
          self[name].problem_title =
            res.data.data.info.child[number].problem_title
          self[name].ignore_order =
            res.data.data.info.child[number].ignore_order
          self[name].problem_description =
            res.data.data.info.child[number].problem_description
          self[name].problem_analysis =
            res.data.data.info.child[number].problem_analysis
          self[name].problem_id = res.data.data.info.child[number].problem_id //子节点ID
          self.defaultbutton = res.data.data.info.child[number].problem_answer
          for (let it of res.data.data.info.child[number].option) {
            option.push({
              content: '',
            })
          }
          self[name].problem_content = option
          self[name].problem_answer =
            res.data.data.info.child[number].problem_answer
        }
        if (Number(res.data.data.info.child[number].problem_child_type) == 4) {
          console.log(self[name].problem_content)
          self[name].problem_content.forEach((item, i) => {
            console.log(
              res.data.data.info.child[number].option[i]
                .problem_option_description
            )
            item.content =
              res.data.data.info.child[number].option[
                i
              ].problem_option_description
          })
          return
        }
        for (let it of res.data.data.info.child[number].option) {
          self[name].problem_content.forEach((item, i) => {
            if (String.fromCharCode(i + 65) == it.problem_option) {
              item.content = it.problem_option_description
            }
          })
        }
        console.log(self.defaultbutton)
      },
    })
  },
  updatetAnalyseProblem(self, name, index, action) {
    //单条更新多条插入
    let option = []
    let ignore_order = self.value1 ? 1 : 0
    console.log(self[name])
    if (self.$route.query.problem_type == 4) {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: '',
          problem_option_description: '',
        })
      })
    } else {
      self[name].problem_content.forEach((item, i) => {
        option.push({
          problem_option: String.fromCharCode(i + 65),
          problem_option_description: item.content,
        })
      })
    }
    let insert_new_child_problem = []
    let update_child_problem = []
    if (action == 'update') {
      update_child_problem.push({
        problem_id: self[name].problem_id, // 子题目ID
        problem_title: self[name].problem_title,
        problem_description: self[name].problem_description,
        problem_analysis: self[name].problem_analysis,
        problem_answer: self[name].problem_answer,
        ignore_order: self[name].ignore_order,
        option: option,
      })
    }
    if (self['parentData'].Addlist.length != 0) {
      for (let items of self.parentData.Addlist) {
        console.log(items)
        let muitiOPtion = []
        if (items.problem_type == 4) {
          items.problem_content.forEach((item, i) => {
            muitiOPtion.push({
              problem_option: '',
              problem_option_description: '',
            })
          })
        } else {
          items.problem_content.forEach((item, i) => {
            muitiOPtion.push({
              problem_option: String.fromCharCode(i + 65),
              problem_option_description: item.content,
            })
          })
        }
        insert_new_child_problem.push({
          problem_child_type: parseInt(items.problem_type),
          problem_title: items.problem_title,
          problem_description: items.problem_title,
          problem_analysis: items.problem_analysis,
          problem_answer: items.problem_answer,
          ignore_order: ignore_order,
          option: muitiOPtion,
        })
      }
      console.log(self['parentData'].Addlist)
    }
    let config = {
      parent_problem: {
        problem_chapter_id: self['parentData'].problem_chapter_id,
        problem_id: self.problem_id,
        problem_title: self['parentData'].problem_title,
        problem_description: self['parentData'].problem_description,
        // problem_analysis: self[name].problem_analysis,
        // problem_answer:self[name].problem_answer,
        ignore_order: ignore_order,
        // option: option
      },
      delete_child_problem: self.delete_child_problem,
      insert_new_child_problem: insert_new_child_problem,
      update_child_problem: update_child_problem,
    }
    console.log(config)
    axiosHttp({
      url: url.updateProblem,
      data: config,
      then(res) {
        console.log(res.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self.colorIndex = index
          //修改成功后要初始化参数
          self['parentData'].Addlist.length = 0 //添加内容清空
          self.delete_child_problem == 0 //删除内容清空
          self.$api.getAnalyseProblemInfo(
            self,
            'subjectData',
            'parentData',
            index
          )
        }
      },
    })
  },
}
export default quertionBank
