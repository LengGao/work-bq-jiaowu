import { axiosHttp, v, url, common } from '@/assets/js/apiCommon'
let loginApi = {
  /**
   * 一、获取课程分类列表
   */
  login(username, password) {
    console.log(username, password)
  },
  logout(self, name, page) {
    let config = {}
    axiosHttp({
      url: url.logout,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        self[name] = data
      },
    })
  },
  getInfo(self, name, page) {
    let config = {
      p: page,
    }
    axiosHttp({
      url: url.getClassification,
      data: config,
      method: 'GET',
      then(res) {
        let data = res.data.data
        self[name] = data
      },
    })
  },
  verifyCode(self) {
    let config = {}
    axiosHttp({
      url: url.verifyCode,
      data: config,
      method: 'GET',
      then(res) {
        console.log()
        self.verifyCode = res.data.data.src
      },
    })
  },
  sendEmail(self) {
    let config = {
      mailto: self.loginForm.mail,
      code: self.loginForm.code,
    }
    axiosHttp({
      url: url.sendEmail,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          self.$message({
            type: 'success',
            message: '发送成功，请注意查收',
          })
        }
      },
    })
  },
  resetPassword(self, form) {
    let config = {
      origin: form.origin,
      password: form.password,
      confirm: form.confirm,
    }
    axiosHttp({
      url: url.resetPassword,
      data: config,
      method: 'POST',
      then(res) {
        if (res.data.code == 0) {
          console.log(self.dialog)
          self.dialog = false
          self.$message({
            type: 'success',
            message: res.data.message,
          })
        }
      },
    })
  },
}
export default loginApi
