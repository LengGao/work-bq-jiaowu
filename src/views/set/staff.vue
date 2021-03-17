<template>
    <div>
     <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    </div>

</template>

<script>
export default {
    name: 'staff',

    data() {
    return {

    }
  },
 
    methods: {

  },

}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
/deep/.el-form-item{
  margin-bottom:10px;
}

.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}

</style>

