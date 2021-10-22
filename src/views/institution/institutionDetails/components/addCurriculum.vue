<template>
    <section>
        <!-- 添加课程弹窗 -->
        <el-dialog title="添加课程" :visible.sync="visible" :close-on-click-modal="false" width="1200px" @open="handleOpen"
            @closed="handleColse">
            <div class="container-table">
                <div class="table-left">
                    <div class="tab-search">
                        <SearchList :options="searchLeftOptions" :data="searchLeftData" @on-search="handleLeftSearch" />
                    </div>

                    <el-table ref="multipleTable" :data="listLeftData" style="width: 100%" v-loading="listLeftLoading"
                        element-loading-text="loading" element-loading-spinner="el-icon-loading"
                        element-loading-background="#fff" class="table" :header-cell-style="{
                          'text-align': 'center',
                          background: '#f8f8f8',
                        }" @selection-change="handleLeftSelection" height="500">
                        <el-table-column type="selection" width="55"> </el-table-column>
                        <el-table-column label="课程名称" show-overflow-tooltip min-width="240" align="left"
                            prop="course_name">
                        </el-table-column>
                        <el-table-column label="所属分类" show-overflow-tooltip min-width="120" align="center"
                            prop="category_name">
                        </el-table-column>
                        <el-table-column prop="title" :label="item.title" min-width="100" align="center"
                            show-overflow-tooltip v-for="(item, index) in classTypes" :key="index">
                            <template slot-scope="{ row }">
                                <el-input type="number" size="small" v-model="row[row.course_id][item.id]"
                                    placeholder="请输入">
                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <div class="table_bottom">
                        <page :data="listLeftTotal" :curpage="pageLeftNum" @pageChange="handleLeftPageChange"
                            @pageSizeChange="handleLeftSizeChange" />
                    </div> -->
                </div>
            </div>
            <div class="table-bottom">
                <el-button @click="handleColse">取 消</el-button>
                <el-button type="primary" :loading="submitLoading" @click="assignOrgCourse">确定添加</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { getDistributeCourseList, assignOrgCourse } from "@/api/institution";
    import { getCateList } from "@/api/sou";
    import { cloneOptions } from "@/utils/index";
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
                    search_box: "",
                    cate_id: [],
                },
                searchLeftOptions: [
                    {
                        key: "cate_id",
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
                        key: "search_box",
                        attrs: {
                            placeholder: "课程名称",
                        },
                    },
                ],
                classTypes: [],
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
                this.getDistributeCourseList(),
                this.getCateList()
                console.log(this.$route.query.institution_id)
            },

            // 分发
            async assignOrgCourse() {
                if (!this.leftSelection.length) {
                    this.$message.warning("请选择课程");
                    return;
                }
                const coursePriceMap = {};
                
                const arr = this.leftSelection.map((item) => ({
                    [item.course_id]: item[item.course_id],
                }));
                arr.forEach((item) => {
                    for (const key in item) {
                        coursePriceMap[key] = item[key];
                    }
                });
                const data = {
                org_arr:this.$route.query.institution_id,
                course_id_arr: coursePriceMap,
            };
                this.submitLoading = true;
                const res = await assignOrgCourse(data).catch(() => { });
                this.submitLoading = false;
                if (res.code === 0) {
                    this.$message.success(res.message);
                    this.setCoursePrice(coursePriceMap);
                    this.$emit("on-success");
                    this.handleColse();
                   
                }
            },
            // 把输入的价格存到本地
            setCoursePrice(newData) {
                const oldData = JSON.parse(localStorage.getItem("coursePrice"));
                localStorage.setItem(
                    "coursePrice",
                    JSON.stringify({
                        ...oldData,
                        ...newData,
                    })
                );
            },
            handleLeftSelection(selection) {
                this.leftSelection = selection;
            },
            handleLeftSearch(data) {
                this.pageLeftNum = 1;
                this.searchLeftData = {
                    ...data,
                    cate_id: data.cate_id.pop(),
                };
                this.getDistributeCourseList();
            },

            handleLeftPageChange(val) {
                this.pageLeftNum = val;
                this.getDistributeCourseList();
            },
            handleLeftSizeChange(size) {
                this.pageLeftSize = size;
                this.getDistributeCourseList();
            },
            // 课程列表
            async getDistributeCourseList() {
                const data = {
                    page: this.pageLeftNum,
                    limit: this.pageLeftSize,
                    ...this.searchLeftData,
                };
                this.listLeftLoading = true;
                const res = await getDistributeCourseList(data);
                const coursePrice = JSON.parse(localStorage.getItem("coursePrice"));
                this.listLeftLoading = false;
                this.listLeftTotal = res.data.total;
                this.classTypes = res.data.class_type;
                this.listLeftData = res.data.list.map((item) => {
                    item[item.course_id] = {};
                    res.data.class_type.forEach((child) => {
                        // 默认价格为本地缓存的价格
                        if (
                            coursePrice &&
                            coursePrice[item.course_id] &&
                            coursePrice[item.course_id][child.id]
                        ) {
                            item[item.course_id][child.id] =
                                coursePrice[item.course_id][child.id];
                        } else {
                            item[item.course_id][child.id] = "";
                        }
                    });
                    return {
                        ...item,
                    };
                });
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
        margin-top: 20px;
    }
</style>