<template>
    <section>
        <!-- 添加题库 -->
        <el-dialog title="添加题库" :visible.sync="visible" :close-on-click-modal="false" width="950px" @open="handleOpen"
            @closed="handleColse">
            <div class="container-table">
            <div class="table-left">
                <div class="tab-search">
                <SearchList :options="searchLeftOptions" :data="searchLeftData" @on-search="handleLeftSearch" />
                </div>
                <el-table
            ref="multipleTable"
            :data="listLeftData"
            style="width: 100%"
            v-loading="listLeftLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            class="table"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            @selection-change="handleLeftSelection"
            height="490"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="题库名称"
              show-overflow-tooltip
              min-width="140"
              align="left"
              prop="title"
            >
            </el-table-column>
            <el-table-column
              label="所属分类"
              show-overflow-tooltip
              min-width="180"
              align="center"
              prop="category_name"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="题库价格"
              min-width="100"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-input
                  type="number"
                  size="small"
                  v-model="row.price"
                  placeholder="请输入"
                >
                </el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listLeftTotal"
              :curpage="pageLeftNum"
              @pageChange="handleLeftPageChange"
              @pageSizeChange="handleLeftSizeChange"
            />
          </div>
            </div>
            </div>
            <div class="table-bottom">
                <el-button @click="handleColse">取 消 </el-button>
                <el-button type="primary" :loading="submitLoading" @click="assignOrgQuestionBank">确定添加</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { getOrgList, assignOrgQuestionBank } from "@/api/institution";
    import { getCateList } from "@/api/sou";
    import { cloneOptions } from "@/utils/index";
    import { getQuestionBankList } from "@/api/sou";
    export default {
        props: {
            value: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                visible: this.value,
                listLeftData: [],
                listLeftLoading: false,
                listLeftTotal: 0,
                pageLeftNum: 1,
                pageLeftSize: 20,
                searchLeftData: {
                    title: "",
                    category_id: [],
                },
                searchLeftOptions: [
                    {
                        key: "category_id",
                        type: "cascader",
                        attrs: {
                            placeholder: "所属分类",
                            props: { checkStrictly: true },
                            filterable: true,
                            clearable: true,
                            options: [],
                        },
                    },
                    {
                        key: "title",
                        attrs: {
                            placeholder: "题库名称",
                        },
                    },
                ],

                listRightData: [],
                listRightLoading: false,
                listRightTotal: 0,
                pageRightNum: 1,
                pageRightSize: 20,
                searchRightData: {
                    search_box: "",
                },
                searchRightOptions: [
                    {
                        key: "search_box",
                        attrs: {
                            placeholder: "机构名称",
                        },
                    },
                ],
                leftSelection: [],
                submitLoading: false,
            };
        },

        watch: {
            value(val) {
                this.visible = val;
            },
        },
        methods: {
            handleColse() {
                this.$emit('input', false)
            },
            handleOpen() {
                this.getQuestionBankList(),
                this.getCateList()
                console.log(this.$route.query.institution_id)
            },

            // 把输入的价格存到本地
            setquestionBankPrice(newData) {
            const oldData = JSON.parse(localStorage.getItem("questionBankPrice"));
            const newDataMap = {};
            newData.forEach((item) => {
                newDataMap[item.id] = item.price;
            });
            localStorage.setItem(
                "questionBankPrice",
                JSON.stringify({
                ...oldData,
                ...newDataMap,
                })
            );
            },

             // 分发
                async assignOrgQuestionBank() {
                if (!this.leftSelection.length) {
                    this.$message.warning("请选择题库");
                    return;
                }
                if (this.leftSelection.some((item) => item.price === "")) {
                    this.$message.warning("请输入选中题库的价格");
                    return;
                }
                const data = {
                    institution_arr: [this.$route.query.institution_id],
                    question_bank_arr: this.leftSelection.map((item) => ({
                    question_bank_id: item.id,
                    wholesale_price: item.price || 0,
                    })),
                };
                this.submitLoading = true;
                const res = await assignOrgQuestionBank(data).catch(() => {});
                this.submitLoading = false;
                if (res.code === 0) {
                    this.$message.success(res.message);
                    this.setquestionBankPrice([...this.leftSelection]);
                    this.handleColse();
                    this.$emit("on-success");
                }
                },        

            handleLeftSelection(selection) {
                this.leftSelection = selection;
            },
            handleLeftSearch(data) {
                this.pageLeftNum = 1;
                this.searchLeftData = {
                    ...data,
                    category_id: data.category_id.pop(),
                };
                this.getQuestionBankList();
            },

            handleLeftPageChange(val) {
                this.pageLeftNum = val;
                this.getQuestionBankList();
            },
            handleLeftSizeChange(size) {
                this.pageLeftSize = size;
                this.getQuestionBankList();
            },
            // 题库列表
            async getQuestionBankList() {
            const data = {
                page: this.pageLeftNum,
                limit: this.pageLeftSize,
                ...this.searchLeftData,
            };
            this.listLeftLoading = true;
            const res = await getQuestionBankList(data);
            const questionBankPrice = JSON.parse(
                localStorage.getItem("questionBankPrice")
            );
            this.listLeftLoading = false;
            this.listLeftTotal = res.data.total;
            this.listLeftData = res.data.list.map((item) => ({
                ...item,
                price: questionBankPrice ? questionBankPrice[item.id] || "" : "",
            }));
            },

            // 获取教材分类
            async getCateList() {
                const data = { list: true };
                const res = await getCateList(data);
                if (res.code === 0) {
                    this.searchLeftOptions[0].attrs.options = cloneOptions(
                        res.data,
                        "category_name",
                        "category_id",
                        "son"
                    );
                }
            },


        },
    };
</script>

<style lang="scss" scoped>
    /* 去掉number样式 */
    /deep/.el-input {
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
    }

    /deep/.el-dialog__body {
        padding: 20px 20px 30px 20px;
    }

    .college-student {
        &-container {
            padding: 0 20px 0 0;
            display: flex;

            .tree-list {
                width: 200px;
                flex-shrink: 0;
                border-right: 1px solid #eee;
                margin-right: 20px;
                height: 60vh;
                overflow-x: hidden;
                overflow-y: auto;

                .title {
                    color: #444;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                h5 {
                    color: #444;
                }
            }

            .table-list {
                flex: 1;
                overflow: hidden;
            }
        }

        .copy-number {
            color: #199fff;
            cursor: pointer;
            margin-left: 8px;
        }


    }

    .college-student-search {
        display: flex;
        justify-content: flex-start;

        span {
            font-size: 14px;
            color: #999;
            line-height: 40px;
        }
    }

    .dialog-footer {
        float: right;
        margin-top: 20px;
    }

    .table-bottom {
        text-align: center;
        margin-top: 25px;
    }
</style>