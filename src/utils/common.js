import Vue from 'vue'
let v = new Vue()
let common = {
  // 询问提示
  confirm(text, fn, select) {
    v.$confirm(text, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      fn && fn(select)
    })
  },
  // 成功提示
  success(txt) {
    v.$message({
      type: 'success',
      message: txt,
    })
  },
  // alert提示
  alert(text, fn) {
    v.$alert(text, '提示', {
      confirmButtonText: '确定',
      callback: () => {
        fn && fn()
      },
    })
  },
}
export default common
