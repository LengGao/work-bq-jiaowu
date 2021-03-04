import { axiosHttp, v, url } from '@/assets/js/apiCommon'
let videoManger = {
  videocollectionlist(self, name, data) {
    console.log(data)
    let course_category_id = '',
      keyboard = ''

    // let ab = self.ruleForm.course_category_id
    // console.log(ab)
    // if (self.ruleForm.course_category_id != undefined) {
    //   course_category_id = self.ruleForm.course_category_id
    // }
    if (data != undefined && data != '') {
      console.log(data.id)
      course_category_id = data.id
      keyboard = data.name
    }
    console.log(self.ruleForm.course_category_id)
    let course_category = self.ruleForm.course_category_id
    if (course_category != '' && course_category != undefined) {
      course_category_id = course_category
    }
    let config = {
      course_category_id: course_category_id,
      keyboard: keyboard,
      page: self.page,
    }
    axiosHttp({
      url: url.videocollectionlist,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data // this
        console.log(self[name])
      },
    })
  },
  deletevideocollection(self, id) {
    let config = {
      video_collection_id: id,
    }
    axiosHttp({
      url: url.deletevideocollection,
      data: config,
      method: 'POST',
      then(res) {
        // console.log(res.data.data)
        // self[name]= res.data.data
        self.$message({
          type: 'success',
          message: '删除成功!',
        })
        self.$api.videocollectionlist(self, 'dataList')
      },
    })
  },
  addvideocollection(self, name) {
    let config = {
      category_id: self[name].class,
      video_collection_name: self[name].name,
      is_fast: '',
    }
    console.log(config)
    axiosHttp({
      url: url.addvideocollection,
      data: config,
      method: 'POST',
      then(res) {
        // console.log(res.data.data)
        // self[name]= res.data.data
        self.$message({
          type: 'success',
          message: '添加成功!',
        })
        self.$api.videocollectionlist(self, 'dataList')
        self.dialogVisible = false
      },
    })
  },
  editvideocollection(self, name) {
    let config = {
      course_category_id: self[name].course_category_id,
      video_collection_name: self[name].video_collection_name,
      video_collection_id: self[name].video_collection_id,
      is_fast: self[name].is_fast,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideocollection,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '编辑成功!',
          })
          self.$api.videocollectionlist(self, 'dataList')
          self.editdialogVisible = false
        }
      },
    })
  },
  getvideochapter(self, name) {
    let config = {
      video_collection_id: self.video_collection_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getvideochapter,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        // if(res.data.code==0){
        //     self.$message({
        //         type: "success",
        //         message: "编辑成功!"
        //     });
        //     self.$api.videocollectionlist(self, 'dataList')
        //     self.editdialogVisible = false
        // }
      },
    })
  },
  addvideochapter(self, name) {
    let config = {
      video_chapter_name: self[name].name,
      video_collection_id: self.video_collection_id,
      video_chapter_sort: self[name].sort,
    }
    console.log(config)
    axiosHttp({
      url: url.addvideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
          self.dialogVisible = false
        }
      },
    })
  },
  addvideochapterfree(self, data) {
    let config = {
      video_class_free: data.video_class_free,
      video_class_name: data.video_class_name,
      // video_collection_id: data.video_collection_id,
      video_class_id: data.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.addvideochapterfree,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: res.data.message,
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          // self.dialogVisible = false
        }
      },
    })
  },
  editvideochapter(self, name) {
    let config = {
      video_chapter_name: self[name].name,
      video_chapter_id: self[name].video_chapter_id,
      video_chapter_sort: self[name].sort,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
          self.dialogSpace = false
        }
      },
    })
  },
  deletevideochapter(self, id) {
    let config = {
      video_chapter_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideochapter,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self.$api.getvideochapter(self, 'spaceList')
        }
      },
    })
  },
  //批量排序视频章节
  videoChapterSort(sortAry, self) {
    let config = {
      sortAry: sortAry,
    }
    // console.log(config)
    axiosHttp({
      url: url.videoChapterSort,
      data: config,
      // method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self[name] = res.data.data
          self.$api.getvideoclass(self, 'videoData') //右侧列表
        }
      },
    })
  },
  getvideoclass(self, name, data) {
    console.log(data)
    let keyboard = ''
    if (data != undefined) {
      keyboard = data.name
    }
    let config = {
      video_collection_id: self.$route.query.video_collection_id,
      video_chapter_id: self.video_chapter_id,
      keyboard: keyboard,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getvideoclass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          let data = res.data.data
          for (let i of data.data) {
            i.video_class_duration =
              parseInt(i.video_class_duration / 60) +
              ':' +
              (i.video_class_duration % 60)
          }
          self[name] = data
        }
      },
    })
  },
  /**
   * 获取视频上传凭证和地址（阿里云）
   * @param {*} self
   * @param {*} name
   */
  createUploadVideo(self, uploadInfo, uploader, fn) {
    console.log('adasad')
    let arr = uploadInfo.file.name.split('.')
    let config = {
      title: arr[0],
      file_name: uploadInfo.file.name,
    }
    axiosHttp({
      url: url.updatecreate,
      data: config,
      method: 'POST',
      then(res) {
        let data = res.data.data
        console.log(data)
        if (fn) {
          fn(data)
          return
        }
        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
      },
    })
  },
  addvideo(self) {
    let form = self.courseTimeForm
    console.log(form)
    let config = {
      video_class_name: self.$parent.$parent.$parent.$parent.video_class_name, //视频课时名称
      media_id: form.mediaId,
      // video_class_coverurl: form.free,//	封面url
      video_class_duration: form.lbDuration, //	课时时长
      // video_class_status: self.$route.query.id,//状态
      // video_class_free: self.zChapter,//	是否免费课时
      // 录播
      // video_class_free_time: form.mediaId,//	免费时长（秒）
      video_chapter_id:
        self.$parent.$parent.$parent.$parent.ruleForm.video_chapter_id, //章节id
      video_collection_id: self.$route.query.video_collection_id, //	集合id
      // video_class_teacher_id: form.mediaSite,//	老师id
      // 直播
      // media_id: form.startTime,//阿里返回的video_id
      video_class_sort:
        self.$parent.$parent.$parent.$parent.video_class_sort < 1
          ? (self.$parent.$parent.$parent.$parent.video_class_sort = 1)
          : self.$parent.$parent.$parent.$parent.video_class_sort, //	排序数字越大越靠前
      // media_size: form.maxOnlineNum,//大小
      media_name: form.media_name, //媒体名称后缀
    }
    console.log(config)
    axiosHttp({
      url: url.addvideo,
      data: config,
      then(res) {
        console.log(res)
        self.reload()
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  /**
   * 刷新视频上传凭证
   * @param {*} self
   * @param {*} name
   */
  refreshUploadVideo(self, uploadInfo, uploader, fn) {
    let config = {
      videoId: uploadInfo.videoId,
    }

    axiosHttp({
      url: url.refreshUploadVideo,
      data: config,
      then(res) {
        let data = res.data.data
        if (fn) {
          fn(data)
          return
        }

        let uploadAuth = data.UploadAuth
        let uploadAddress = data.UploadAddress
        let videoId = data.VideoId
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        )
      },
    })
  },
  editvideoclass(self) {
    console.log()
    let config = {
      video_class_id: self.spaceData.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideoclass,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res)
        self.editvideo = res.data.data
        console.log(self.editvideo)
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  deletevideoclass(self) {
    console.log()
    let config = {
      video_class_id: self.singleImgId,
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        // self.reload()
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  multideleteVideo(self, name) {
    console.log()
    let config = {
      video_class_id: self[name],
    }
    console.log(config)
    axiosHttp({
      url: url.deletevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        // self.reload()
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  editVideoSuccess(self) {
    let form = self.courseTimeForm
    console.log(self.$parent.$parent.$parent.$parent.editvideo.video_class_name)
    let config = {
      video_class_name:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_name, //视频课时名称
      media_id: form.mediaId,
      // video_class_coverurl: form.free,//	封面url
      video_class_duration: form.lbDuration, //	课时时长
      // video_class_status: self.$route.query.id,//状态
      // video_class_free: self.zChapter,//	是否免费课时
      // 录播
      // video_class_free_time: form.mediaId,//	免费时长（秒）
      video_chapter_id:
        self.$parent.$parent.$parent.$parent.editvideo.video_chapter_id, //章节id
      video_collection_id: self.$route.query.video_collection_id, //	集合id
      // video_class_teacher_id: form.mediaSite,//	老师id
      // 直播
      // media_id: form.startTime,//阿里返回的video_id
      video_class_sort:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_sort < 1
          ? (self.$parent.$parent.$parent.$parent.editvideo.video_class_sort = 1)
          : self.$parent.$parent.$parent.$parent.editvideo.video_class_sort, //	排序数字越大越靠前
      // media_size: form.maxOnlineNum,//大小
      media_name: form.media_name, //媒体名称后缀
      video_class_id:
        self.$parent.$parent.$parent.$parent.editvideo.video_class_id,
    }
    console.log(config)
    axiosHttp({
      url: url.editvideoclass,
      data: config,
      then(res) {
        console.log(res)
        self.reload()
        // self.$common.success(res.data.msg);
        // self.closeDialogK();
        // self.$api.getCourseLesson(self, 1);
      },
    })
  },
  batchmovevideoclass(self) {
    let config = {
      video_class_id: self.transFormId,
      video_chapter_id: self.transvideo_chapter_id,
    }
    axiosHttp({
      url: url.batchmovevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '移动成功!',
          })
          self.dialogTransform = false
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  mutilbatchmovevideoclass(self) {
    let config = {
      video_class_id: self.multiTransformConfirm,
      video_chapter_id: self.transvideo_chapter_id,
    }
    console.log(config)
    axiosHttp({
      url: url.batchmovevideoclass,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '移动成功!',
          })
          self.dialogTransform = false
          self.$api.getvideoclass(self, 'videoData') //右侧列表
          self.$api.getvideochapter(self, 'spaceList') //左侧列表
        }
      },
    })
  },
  livecourselist(self, name, data) {
    let keyboard = ''
    if (data != undefined) {
      keyboard = data.name
    }
    let config = {
      keyboard: keyboard,
      course_category_id: '',
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.livecourselist,
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
  livelist(self, name, data) {
    let keyboard = ''
    if (data != undefined) {
      keyboard = data.name
    }
    let config = {
      keyboard: keyboard,
      course_id: self.$route.query.course_id,
      live_type: self.$route.query.biaoshi,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.livelist,
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
  livevideolist(self, name, data) {
    let keyboard = ''
    if (data != undefined) {
      keyboard = data.name
    }
    let config = {
      keyboard: keyboard,
      course_id: '',
      class_room_id: '',
      live_id: self.$route.query.live_id,
    }
    console.log(config)
    axiosHttp({
      url: url.livevideolist,
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
  closelive(self, id) {
    let config = {
      live_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.closelive,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '关闭成功!',
          })
        }
      },
    })
  },
  teacherArray(self, name) {
    let config = {
      name_mobile: '',
    }
    console.log(config)
    axiosHttp({
      url: url.teacherArray,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data.list
        }
      },
    })
  },
  classroom(self, name) {
    let config = {
      course_id: 10,
      keyboard: '',
    }
    console.log(config)
    axiosHttp({
      url: url.classroom,
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
  createlive(self, name) {
    console.log(self.addclass)
    let classId = []
    for (let i = 0; i < self.addclass.length; i++) {
      console.log(self.addclass[i])
      classId.push(self.addclass[i].ID)
    }
    let config = {
      live_name: self.livingName,
      class_id: classId,
      live_teacher_id: self.teachers.value,
      live_teacher_name: self.teachers.label,
      live_long: '',
      live_type: parseInt(self.$route.query.biaoshi),
      course_id: self.$route.query.course_id,
    }
    console.log(config)
    axiosHttp({
      url: url.createlive,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.addDialogVisible = false
          self.$api.livelist(self, 'videoData')
          self.$message({
            type: 'success',
            message: '添加成功！',
          })
        }
      },
    })
  },
  createLiveForopenLive(self, name) {
    console.log(self.reasonForm)

    let classId = []
    let config = {
      live_name: self.reasonForm.livingName,
      class_id: classId,
      live_teacher_id: self.reasonForm.teachers.value,
      live_teacher_name: self.reasonForm.teachers.label,
      live_long: '',
      live_type: 1,
      course_id: self.$route.query.course_id,
      live_steam_time: self.reasonForm.value1,
      live_start_time: self.reasonForm.value2[0],
      live_end_time: self.reasonForm.value2[1],
      live_class_icon: '',
      live_class_common: self.reasonForm.textarea,
      live_class_detail: self.reasonForm.introduction,
    }
    console.log(config)
    axiosHttp({
      url: url.createlive,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          // self.addDialogVisible = false
          // self.$api.livelist(self, 'videoData')
          self.$message({
            type: 'success',
            message: '添加成功！',
          })
          self.$router.go(-1)
        }
      },
    })
  },
  liveDetail(self, name) {
    let config = {
      live_id: self.$route.query.live_id,
    }
    console.log(config)
    axiosHttp({
      url: url.liveDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data.data
        }
      },
    })
  },
  //直播详情
  getLiveDetail(self, name) {
    let config = {
      live_id: self.$route.query.live_id,
    }
    console.log(config)
    axiosHttp({
      url: url.getLiveDetail,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self[name] = res.data.data
          self.push_detail = res.data.data.push_detail
          self.video_list = res.data.data.video_list
        }
      },
    })
  },
  deletelivevideo(self, id) {
    let config = {
      live_video_id: id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletelivevideo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.livevideolist(self, 'videoData')
          self.$message({
            type: 'success',
            message: '删除成功',
          })
        }
      },
    })
  },
  multiDeletelivevideo(self, id) {
    let live_video_id = []
    console.log(id)
    for (let item of id) {
      live_video_id.push(item.live_video_id)
    }
    let config = {
      live_video_id: live_video_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deletelivevideo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$api.livevideolist(self, 'videoData')
          self.$message({
            type: 'success',
            message: '删除成功',
          })
        }
      },
    })
  },
  editlivevideo(self, live_video_id) {
    let config = {
      live_video_name: '', //视频名称
      live_video_des: '', //视频简介
      live_video_id: live_video_id, //回顾视频id
      media_name: '', //媒体名称
      media_id: '', //媒体Id
    }
    console.log(config)
    axiosHttp({
      url: url.editlivevideo,
      data: config,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.editcreateVideo = res.data.data
        }
      },
    })
  },
  editlivevideoUpload(self) {
    let form = self.courseTimeForm
    let data = self.$parent.$parent.$parent.$parent.editcreateVideo
    let config = {
      live_video_name: data.live_video_name, //视频名称
      live_video_des: data.live_video_des, //视频简介
      live_video_id: data.live_video_id, //回顾视频id
      media_name: form.media_name, //媒体名称
      media_id: form.mediaId, //媒体Id
      description: form.lbDuration,
    }
    console.log(config)
    axiosHttp({
      url: url.editlivevideo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '修改成功！',
          })
          self.reload()
        }
      },
    })
  },
  addlivevideo(self) {
    let form = self.courseTimeForm
    let data = self.$parent.$parent.$parent.$parent.editcreateVideo
    let config = {
      video_id: form.mediaId, //上传返回的videoID
      description: form.lbDuration,
      course_id: self.$route.query.course_id, //课程ID
      live_id: self.$route.query.live_id, //直播ID
      class_room_id: self.$route.query.class_id, //班级ID
      live_video_name: data.live_video_name, //回顾视频名称
      media_name: form.media_name, //媒体名称
      live_video_des: data.live_video_des, //简介描述
      cover_url: '', //视频封面链接
    }
    console.log(data, form, config)
    axiosHttp({
      url: url.addlivevideo,
      data: config,
      method: 'POST',
      then(res) {
        console.log(res.data.data)
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '增加成功！',
          })
          self.reload()
        }
      },
    })
  },
  optionBack(self, name, data) {
    let opinion_type = '',
      search_box = ''
    if (data != undefined) {
      console.log(data)
      ;(opinion_type = data.id), (search_box = data.name)
    }
    let config = {
      opinion_type: opinion_type,
      search_box: search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getOpinionList,
      data: config,
      method: 'GET',
      then(res) {
        let newselect = []
        if (res.data.code == 0) {
          for (let item of res.data.data.list) {
            item.extend = JSON.parse(item.extend)
          }
          //改造opinionTypeArr适应下拉选择
          for (let item in res.data.data.groupArr) {
            let option = {
              category_id: item,
              category_name: res.data.data.groupArr[item],
            }
            newselect.push(option)
          }
          console.log(res.data.data, newselect)
          res.data.data.newselect = newselect
          self[name] = res.data.data
        }
      },
    })
  },
  changeOpinionStatus(self, status, id) {
    let config = {
      conversation_id: id,
      lock: status,
    }
    console.log(config)
    axiosHttp({
      url: url.changeOpinionStatus,
      data: config,
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
  getNoteList(self, name, data) {
    let search_box = ''
    let config = {
      search_box: search_box,
      page: self.page,
    }
    console.log(config)
    axiosHttp({
      url: url.getNoteList,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          self[name] = res.data.data
        }
      },
    })
  },
  publishNotes(self, ids, data) {
    let search_box = ''
    let config = {
      ids: ids,
    }
    console.log(config)
    axiosHttp({
      url: url.publishNotes,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$api.getNoteList(self, 'noteList')
          console.log(res)
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  deleteNotes(self, ids, data) {
    let search_box = ''
    let config = {
      ids: ids,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteNotes,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self.$api.getNoteList(self, 'noteList')
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
  payOrderNum(self, name) {
    let config = {}
    axiosHttp({
      url: url.payOrderNum,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  getVisitNumChart(self, name, id) {
    let types = 1
    if (id != undefined) {
      types = id.id
    }
    let config = {
      type: types,
    }
    axiosHttp({
      url: url.getVisitNumChart,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  MountQuota(self, name, type) {
    let types = 'day'
    if (type != undefined) {
      types = type.action
    }
    let config = {
      type: types,
    }
    axiosHttp({
      url: url.MountQuota,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  salesRanking(self, name, type) {
    let types = 'day'
    if (type != undefined) {
      types = type.action
    }
    let config = {
      type: types,
    }
    axiosHttp({
      url: url.salesRanking,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  getRegisterNum(self, name, type) {
    let config = {}
    axiosHttp({
      url: url.getRegisterNum,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  quotaCensus(self, name) {
    let config = {}
    axiosHttp({
      url: url.quotaCensus,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          let data = res.data.data
          data.todayAmount.Insert()
          self[name] = res.data.data
        }
      },
    })
  },
  getVisitNum(self, name) {
    let config = {}
    axiosHttp({
      url: url.getVisitNum,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res)
          self[name] = res.data.data
        }
      },
    })
  },
  // livecount(self,name){
  //   let config = {
  //     live_id:self.$route.query.live_id,
  //     page:self.page,
  //     live_class_id:self.$route.query.live_class_id,
  //     live_course_id:self.$route.query.course_id
  //   }
  //   axiosHttp({
  //     url: url.livecount,
  //     data: config,
  //     method: 'GET',
  //     then(res) {
  //       if (res.data.code == 0) {
  //        console.log(res.data.data)
  //        self[name] = res.data.data
  //       }
  //     },
  //   })
  // },
  getLiveStatisticForAdmin(self, name, data = {}) {
    let search_box = ''
    // let class_id = ''
    // if (data.classroom_id != undefined || data.classroom_id != '') {
    //   class_id = data.classroom_id
    // }
    if (data.name != undefined || data.name != '') {
      search_box = data.name
    }
    let config = {
      live_id: self.$route.query.live_id,
      //live_id: 1706,
      page: self.page,
      limit: 20,
      search_box: search_box ? search_box : '',
      // class_id: class_id ? class_id : '',
    }
    console.log(config)
    axiosHttp({
      url: url.getLiveStatisticForAdmin,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          self[name] = res.data.data
          self.classDate = res.data.data.classroom_list
          console.log(self.classDate)
        }
      },
    })
  },
  //直播概况(新)
  getLiveSummary(self, name) {
    console.log(self.$route.query.live_id)
    let config = {
      live_id: self.$route.query.live_id,
      // live_id: 1706,
    }
    axiosHttp({
      url: url.getLiveSummary,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          let data = res.data.data
          self.pc_count = data.pc_count
          self.total_count = data.total_count
          self.wechat_count = data.wechat_count
          self.chart = data.chart
          self[name] = res.data.data
        }
      },
    })
  },

  livevideocount(self, name) {
    let config = {
      live_id: self.$route.query.live_id,
      page: self.page,
      live_class_id: self.$route.query.live_class_id,
      live_course_id: self.$route.query.course_id,
    }
    axiosHttp({
      url: url.livevideocount,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          self[name] = res.data.data
        }
      },
    })
  },
  //polyv直播授权

  getVideoEmpower(self, name) {
    let config = {
      // live_id:self.$route.query.live_id,
      // page:self.page,
      // live_class_id:self.$route.query.live_class_id,
      // live_course_id:self.$route.query.course_id
    }
    axiosHttp({
      url: url.getVideoEmpower,
      data: config,
      method: 'GET',
      then(res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          self[name] = res.data.data
        }
      },
    })
  },
}
export default videoManger
