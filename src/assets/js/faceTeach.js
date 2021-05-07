import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
const faceTeach = {
    //添加约课课室
    addSubscribeClassroom(self, ruleForm) {
        let config = {
            subscribe_classroom_name: ruleForm.subscribe_classroom_name,
            teacher_id: ruleForm.teacher_id,
            teacher_name: ruleForm.teacher_name,
            start_time: ruleForm.start_time,
            end_time: ruleForm.end_time,
            course_id: self.$route.query.problem_course_id,
            chapter_ids: ruleForm.chapter_ids.toString(),
            classroom_ids: ruleForm.classroom_ids.toString(),
            address: ruleForm.address,
            max_num: ruleForm.max_num,
            show_time: ruleForm.show_time,
            close_time: ruleForm.close_time,
        }
        console.log(config)
        axiosHttp({
            url: url.addSubscribeClassroom,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    // self.$api.getRecommender(self, 'schoolData')
                    // for (let key in self.ruleForm) {
                    //   self.ruleForm[key] = ''
                    // }
                    // self.dialogVisible = false
                    self.$router.go(-1)
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //可加入黑名单学生
    getBlackStudentsList(self, name, data = {}) {
        let institution_id = ''
        let nickname = ''
        if (data.organization_id != '' || data.organization_id != undefined) {
            institution_id = data.organization_id
        }
        if (data.name != '' || data.name != undefined) {
            nickname = data.name
        }
        let config = {
            problem_course_id: self.$route.query.problem_course_id,
            institution_id: institution_id,
            page: self.page,
            nickname: nickname,
            // realname: realname,
        }
        console.log(config)
        axiosHttp({
            url: url.getBlackStudentsList,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)
                self[name] = res.data.data
            },
        })
    },
    //添加黑名单
    insertBlacklist(self, uid) {
        let config = {
            problem_course_id: self.problem_course_id,
            uid: uid,
        }
        console.log(config)
        axiosHttp({
            url: url.insertBlacklist,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    self.$router.go(-1)
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //额外学生列表
    getAdditionalStudentList(self, name, data = {}) {
        let realname = ''
        if (data.name != '' || data.name != undefined) {
            realname = data.name
        }
        let config = {
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            course_id: self.$route.query.course_id,
            realname: realname,
            page: self.page,
        }
        console.log(config)
        axiosHttp({
            url: url.getAdditionalStudentList,
            data: config,
            method: 'GET',
            then(res) {
                self[name] = res.data.data
            },
        })
    },
    //添加面授约课学生
    insertStudent(self, zx) {
        let config = {
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            uid: zx.uid,
            mobile: zx.mobile,
            realname: zx.realname,
            problem_course_id: self.$route.query.problem_course_id,
        }
        console.log(config)
        axiosHttp({
            url: url.insertStudent,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    self.$router.go(-1)
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //获取该课程下的所有班级（不带分页）
    getCourseAllclass(self, name) {
        let config = {
            course_id: self.$route.query.course_id,
        }
        axiosHttp({
            url: url.getcourseallclass,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)
                self[name] = res.data.data
            },
        })
    },
    //面授课室详情
    getSubscribeClassroomInfo(self) {
        let config = {
            subscribe_classroom_id: parseInt(
                self.$route.query.subscribe_classroom_id
            ),
        }
        console.log(config)
        axiosHttp({
            url: url.getSubscribeClassroomInfo,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)

                let info = res.data.data.info
                self.ruleForm.subscribe_classroom_name = info.subscribe_classroom_name
                self.ruleForm.teacher_id = info.teacher_id
                self.ruleForm.teacher_name = info.teacher_name
                self.ruleForm.address = info.address
                self.ruleForm.max_num = info.max_num
                self.ruleForm.show_time = self.$moment
                    .unix(info.show_time)
                    .format('YYYY-MM-DD HH:mm:ss')
                self.ruleForm.close_time = self.$moment
                    .unix(info.close_time)
                    .format('YYYY-MM-DD HH:mm:ss')
                let start_time = self.$moment.unix(info.start_time).format('HH:mm:ss')
                self.ruleForm.start_time = self.$moment
                    .unix(info.start_time)
                    .format('YYYY-MM-DD HH:mm:ss')
                let end_time = self.$moment.unix(info.end_time).format('HH:mm:ss')
                self.ruleForm.end_time = self.$moment
                    .unix(info.end_time)
                    .format('YYYY-MM-DD HH:mm:ss')
                self.allTime = []
                self.allTime.push(start_time)
                self.allTime.push(end_time)
                self.alldate = self.$moment.unix(info.end_time).format('YYYY-MM-DD')
                let chapter_idStr = '[' + info.chapter_ids + ']'
                let chapter_idArr = eval('(' + chapter_idStr + ')')
                self.ruleForm.chapter_ids = chapter_idArr
                let classroom_idStr = '[' + info.classroom_ids + ']'
                let classroom_idArr = eval('(' + classroom_idStr + ')')
                self.ruleForm.classroom_ids = classroom_idArr
                console.log(self.ruleForm.classroom_ids)
            },
        })
    },
    //修改约课课室
    saveSubscribeClassroom(self, ruleForm) {
        let config = {
            subscribe_classroom_name: ruleForm.subscribe_classroom_name,
            teacher_id: ruleForm.teacher_id,
            teacher_name: ruleForm.teacher_name,
            start_time: ruleForm.start_time,
            end_time: ruleForm.end_time,
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            chapter_ids: ruleForm.chapter_ids.toString(),
            classroom_ids: ruleForm.classroom_ids.toString(),
            address: ruleForm.address,
            max_num: ruleForm.max_num,
            show_time: ruleForm.show_time,
            close_time: ruleForm.close_time,
        }
        console.log(config)
        axiosHttp({
            url: url.saveSubscribeClassroom,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    // self.$api.getRecommender(self, 'schoolData')
                    // for (let key in self.ruleForm) {
                    //   self.ruleForm[key] = ''
                    // }
                    // self.dialogVisible = false
                    self.$router.go(-1)
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //黑名单列表
    getBlacklist(self, name, data = {}) {
        let institution_id = ''
        let realname = ''
        if (data.organization_id != '' || data.organization_id != undefined) {
            institution_id = data.organization_id || ''
        }
        if (data.name != '' || data.name != undefined) {
            realname = data.name
        }

        let config = {
            problem_course_id: self.$route.query.problem_course_id,
            institution_id: institution_id,
            page: self.page,
            realname: realname,
        }
        console.log(config)
        axiosHttp({
            url: url.getBlacklist,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)
                self[name] = res.data.data
            },
        })
    },
    //移除黑名单
    removeBlacklist(self, blacklist_id) {
        let config = {
            blacklist_id: blacklist_id,
        }
        console.log(config)
        axiosHttp({
            url: url.removeBlacklist,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    self.$api.getBlacklist(self, 'schoolData')
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //面授课室列表
    getSubscribeClassroomList(self, name, data = {}) {
        let subscribe_classroom_name = ''
        if (data.name != '' || data.name != undefined) {
            subscribe_classroom_name = data.name
        }

        let config = {
            problem_course_id: self.$route.query.problem_course_id,
            subscribe_classroom_name: subscribe_classroom_name,
            page: self.page,
        }
        console.log(config)
        axiosHttp({
            url: url.getSubscribeClassroomList,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)
                self[name] = res.data.data
            },
        })
    },
    //面授约课短信详情和记录列表
    getSubMessageInfo(self, name, data = {}) {
        let realname = ''
        if (data.name != '' || data.name != undefined) {
            realname = data.name
        }
        let config = {
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            course_category_id: self.$route.query.course_category_id,
            course_id: self.$route.query.course_id,
            realname: realname,
            page: self.page,
        }
        console.log(config)
        axiosHttp({
            url: url.getSubMessageInfo,
            data: config,
            method: 'POST',
            then(res) {
                console.log(res.data)
                self[name] = res.data.data.list
                self.ruleForm = res.data.data.detail
            },
        })
    },
    //面授约课群发短信(新)
    sendSubMessage(self, name) {
        let config = {
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            address: self.address,
            remarks: self.remarks,
        }
        console.log(config)
        axiosHttp({
            url: url.sendSubMessage,
            data: config,
            method: 'POST',
            then(res) {
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                        ; (self.address = ''),
                            (self.remarks = ''),
                            self.$api.getSubMessageInfo(self, 'schoolData')
                }
            },
        })
    },
    //生产签到二维码
    getQrCode(self, ruleForm) {
        let config = {
            subscribe_classroom_id: parseInt(
                self.$route.query.subscribe_classroom_id
            ),
            pages: 'index/index',
        }
        console.log(config)
        axiosHttp({
            url: url.getQrCode,
            data: config,
            method: 'GET',
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    self.img_url = res.data.data.info.img_url
                    // self.$api.getStudentList(self, 'schoolData')
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
    //预约学生列表
    getStudentList(self, name, data = {}) {
        let realname = ''
        if (data.name != '' || data.name != undefined) {
            realname = data.name
        }
        let config = {
            subscribe_classroom_id: self.$route.query.subscribe_classroom_id,
            page: self.page,
            realname: realname,
            status: self.status,
        }
        console.log(config)
        axiosHttp({
            url: url.getStudentList,
            data: config,
            method: 'GET',
            then(res) {
                for (let item of res.data.data.list) {
                    if (item.create_time == '0' || item.create_time == null) {
                        item.create_time = '---'
                    } else {
                        item.create_time = self.$moment
                            .unix(item.create_time)
                            .format('YYYY-MM-DD HH:mm:ss')
                    }
                    switch (item.from) {
                        case 1:
                            item.from = '后台添加'
                            break
                        case 2:
                            item.from = '小程序'
                            break
                        case 3:
                            item.from = 'PC端'
                            break
                        case 4:
                            item.from = '移动端'
                            break
                        default:
                            item.from = '未知'
                    }
                }
                let data = res.data.data.list
                console.log(data)
                if (self.isTagactive == 5) {
                    let missedList = []
                    missedList = data.map((i) => {
                        if (i.missed == 1) {
                            return i
                        }
                    })
                    console.log(missedList[0])
                    if (missedList[0] == undefined) {
                        self[name] = []
                    } else {
                        self[name] = missedList
                    }
                } else {
                    self[name] = data
                }
            },
        })
    },
    //更新学生状态
    updateStudentStatus(self, status) {
        let config = {
            student_id: parseInt(self.student_id),
            status: status,
        }
        console.log(config)
        axiosHttp({
            url: url.updateStudentStatus,
            data: config,
            then(res) {
                console.log(res.data.data)
                if (res.data.code == 0) {
                    self.$message({
                        type: 'success',
                        message: res.data.message,
                    })
                    self.$api.getStudentList(self, 'schoolData')
                } else {
                    self.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
            },
        })
    },
}
export default faceTeach