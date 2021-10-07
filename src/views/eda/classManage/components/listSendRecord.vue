<template>
    <section>
        <!-- 发送记录弹窗 -->
            <el-dialog title="发送记录" :visible.sync="visible" :close-on-click-modal="false" width="1000px" @open="handleOpen"   @closed="handleColse">
                <SearchList :options="searchOptions" :data="searchData" @on-search="handleSearch" />
                <el-table :data="gridData" :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }">
                <el-table-column prop="id" label="序号" width="120"></el-table-column>
                <el-table-column prop="nickname" label="用户姓名" width="200"></el-table-column>
                <el-table-column prop="institution_name" label="所属机构" width="220"></el-table-column>
                <el-table-column prop="send_status" label="阅读状态" width="160">
                    <template slot-scope="{ row }">
                        <el-tag size="small" type="text" :style="{ color: statusMap[row.send_status].color }">
                          {{ statusMap[row.send_status || 0].text }}
                        </el-tag>
                      </template>
                </el-table-column>
                <el-table-column prop="update_time" label="完成时间">
                    <template slot-scope="{ row }">
                        <div v-if="row.update_time">
                          {{ row.update_time }}
                        </div>
                        <span v-else>--</span>
                      </template>
                </el-table-column>
              </el-table>
              <div class="table_bottom">
                <page :data="listTotal" :curpage="pageNum" @pageChange="handlePageChange" style="margin-left: auto;" />
              </div>
              </el-dialog>
    </section>
</template>

<script>
    import { getNoticeRecordList } from "@/api/message";
    import { getInstitutionSelectData } from "@/api/sou";
    import { cloneOptions } from "@/utils/index";
    export default {
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            id: {
                type: [String, Number],
                default: "",
            },
        },
        data() {
            return {
            statusMap: {
            1: {
                color: "#FD6500",
                text: "未读",
                
            },
            2: {
                color: "#43D100",
                text: "已读",
                
            },
            3: {
                color: "#43D100",
                text: "已确认",
                
            },
            },
            visible: this.value,
            gridData: [],
            pageNum:1,
            listTotal:1,
            searchData: {
            from_organization_id: [],
            search_box: '',
            send_status:'',
            },
            searchOptions: [
            {
            key: "from_organization_id",
            type: "cascader",
            attrs: {
                placeholder: "所属机构",
                clearable: true,
                filterable: true,
                options: [],
            },
            },
            {
            key: "send_status",
            type: "select",
            width: 120,
            options: [
              {
                value: 1,
                label: "未读",
              },
              {
                value: 2,
                label: "已读",
              },
              {
                value: 3,
                label: "已确认",
              },
            ],
            attrs: {
              clearable: true,
              placeholder: "阅读状态",
            },
          },
            {
                key: "search_box",
                attrs: {
                placeholder: "学生姓名、手机号码",
                },
            },
            ],
            };
            },

        watch: {
            value(val) {
                this.visible = val;
            },
        },
        methods: {
            handleColse(){
               this.$emit('input',false)
            },
            handleOpen() {
               this.getInstitutionSelectData()
               this.getNoticeRecordList()
            },
        // 微信消息发送记录列表
        async getNoticeRecordList() {
        const data = {
          page: this.pageNum,
          limit: 10,
          ...this.searchData,
         
        id: this.id,

        };
        console.log(this.id)
        this.listLoading = true;
        const res = await getNoticeRecordList(data);
        this.listLoading = false;
        this.gridData = res.data.list;
        this.listTotal = res.data.total;
      },
      handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        from_organization_id: data.from_organization_id.pop(),
        };
        this.getNoticeRecordList();
      },
        handlePageChange(val) {
        this.pageNum = val;
        this.getNoticeRecordList();
      },
      // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },

        },
    };
</script>

<style lang='scss' scoped>
    /deep/.selectCss .el-input__inner {
        border: none;
        background-color: #199fff;
        color: #fff;
        width: 105px;
    }

    /deep/.selectCss .el-input .el-select__caret {
        color: #fff;
    }

    /deep/.el-dialog__body {
        padding: 30px 40px 20px 10px;
    }

    /deep/.selectCss .el-input__inner::-webkit-input-placeholder {
        color: #fff;
    }

    /deep/.el-dialog__footer {
        padding-right: 40px;
    }
  
</style>