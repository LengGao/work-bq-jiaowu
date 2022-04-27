import { axiosHttp, v, url } from '@/assets/js/apiCommon'
import Vue from 'vue'
let imgSpace = {
  getBucketList(self, name) {
    axiosHttp({
      url: url.getBucketList,
      method: 'GET',
      then(res) {
        console.log(res.data.data)
        self[name] = res.data.data
        console.log(self['spaceList'])
        self['list'] = res.data.data.total
      },
    })
  },
  getImagesList(self, name, id) {
    let config = {
      page: self.page,
      bucket_id:
        typeof self.bucket_id == 'undefined' ? 0 : parseInt(self.bucket_id),
      name: self.name,
    }
    console.log(config)
    axiosHttp({
      url: url.getImagesList,
      data: config,
      method: 'GET',
      then(res) {
        for (let item of res.data.data.list) {
          item.create_time = self.$moment
            .unix(item.create_time)
            .format('YYYY-MM-DD')
        }
        console.log(res.data.data.list)
        self[name] = res.data.data.list
        self['total'] = res.data.data.total
      },
    })
  },
  deleteImages(self, name) {
    let config = {
      image_id: self[name],
    }
    console.log(config)
    axiosHttp({
      url: url.deleteImages,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '删除成功!',
          })
          self.$api.getImagesList(self, 'imgData')
          self.$api.getBucketList(self, 'spaceList')
        }
      },
    })
  },
  insertBucket(self, name) {
    let config = {
      name: self[name].name,
      sort: 0,
    }
    console.log(config)
    axiosHttp({
      url: url.insertBucket,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '添加成功!',
          })
          self['dialogVisible'] = false

          self.$api.getBucketList(self, 'spaceList')
        }
      },
    })
  },
  updateBucket(self, name) {
    let config = {
      name: self[name].name,
      bucket_id: self[name].bucket_id,
    }
    console.log(config)
    axiosHttp({
      url: url.updateBucket,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self['dialogSpace'] = false
          self.$api.getBucketList(self, 'spaceList')
        }
      },
    })
  },
  downloadImages(self, name, arr) {
    console.log('哈哈哈')
    let image_id_arr
    if (arr) {
      image_id_arr = arr
    } else {
      image_id_arr = self[name]
    }
    var a = document.createElement('a')
    a.download = name || 'pic'
    // 设置图片地址
    a.href =
      Vue.prototype.downLoad +
      url.downloadImages +
      '?image_id_arr=' +
      image_id_arr
    a.click()
    window.onunload = function() {
      alert('页面加载完成！')
    }
  },
  deleteBucket(self, bucket_id) {
    let config = {
      bucket_id: bucket_id,
    }
    console.log(config)
    axiosHttp({
      url: url.deleteBucket,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self['dialogSpace'] = false
          self.$api.getBucketList(self, 'spaceList')
        }
      },
    })
  },
  mvImages(self, name) {
    let config = {
      image_id: self[name],
      bucket_id: self['value'],
    }
    console.log(config.image_id)
    axiosHttp({
      url: url.mvImages,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self['mutiSelectTrans'] = 0
          self['dialogTransform'] = false
          self.$api.getBucketList(self, 'spaceList')
          self.$api.getImagesList(self, 'imgData')
        }
      },
    })
  },
  updateImage(self, name) {
    let config = {
      image_id: self['imgSingleId'],
      image_name: self['imgName'],
    }
    console.log(config)
    axiosHttp({
      url: url.updateImage,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '修改成功!',
          })
          self['dialogEditor'] = false
          self.$api.getBucketList(self, 'spaceList')
          self.$api.getImagesList(self, 'imgData')
        }
      },
    })
  },
  uploadImage(self, name) {
    let config = {
      bucket_id: self['ruleForm'].bucket_id,
      image: self['cutImg'],
    }
    console.log(config)
    axiosHttp({
      url: url.uploadImage,
      data: config,

      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '提交成功!',
          })
          self['dialogEditor'] = false
          self.$api.getBucketList(self, 'spaceList')
          self.$api.getImagesList(self, 'imgData')
        }
      },
    })
  },
  appendFile(self, name) {
    let config = {
      course_id: self['ruleForm'].course_id,
      file_name: self['ruleForm'].file_name,
      sort: self['ruleForm'].sort,
    }
    console.log(config)
    axiosHttp({
      url: url.appendFile,
      data: config,
      then(res) {
        console.log(res)
        if (res.status == 200) {
          self.$message({
            type: 'success',
            message: '提交成功!',
          })
          self['dialogEditor'] = false
          // self.$api.getBucketList(self, 'spaceList')
          // self.$api.getImagesList(self, 'imgData')
        }
      },
    })
  },
}
export default imgSpace
