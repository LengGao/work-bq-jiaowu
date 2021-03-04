<template>
    <section class="mainwrap">
        <div class="client_head">
            <search
                    :hideTime="true"
                    :hideOtherOption="true"
                    :selectItems="false"
                    api="livelist"
                    placeholder="课程分类"
                    @getTable="getTable"
            ></search>
            <el-button type="primary" v-if="biaoshi == 2" @click="addVideo"
            >添加直播
            </el-button>
            <el-button type="primary" v-if="biaoshi == 1" @click="addopenVideo"
            >添加直播
            </el-button>
        </div>
        <!--表格-->
        <div class="userTable">
            <el-table
                    ref="multipleTable"
                    :data="videoData.data"
                    style="width: 100%"
                    class="min_table"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="60"
                        align="left"
                ></el-table-column>
                <el-table-column label="序号" max-width="50">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                        prop="live_class_name"
                        label="直播名称"
                        min-width="210"
                        show-overflow-tooltip
                        align="left"
                ></el-table-column>
                <el-table-column
                        prop="number"
                        label="直播班级"
                        min-width="120"
                        show-overflow-tooltip
                        align="left"
                >
                    <template slot-scope="scope">
                        <div style="display:flex;">
                            <!-- {{scope}} -->
                            <span
                                    v-for="item in scope.row.class_info"
                                    :key="item.classroom_id"
                            >{{ item.classroom_name }}</span
                            >
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="live_status"
                        label="状态"
                        min-width="70"
                        show-overflow-tooltip
                        align="center"
                >
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content:space-around">
                            <!-- //确定属性 -->
                            <el-button type="text" v-if="scope.row.live_status == 0"
                            >未直播
                            </el-button>
                            <el-button
                                    type="text"
                                    v-if="scope.row.live_status == 1"
                                    @click="editor3(scope.$index, scope.row)"
                            ><span style="color: red"> 直播中</span></el-button
                            >
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="直播情况"
                        fixed="right"
                        min-width="100"
                        align="center"
                >
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content:space-around">
                            <!-- <el-button type="text" v-if="scope.row.live_status == 1" disabled
                                            >开始</el-button
                                          > -->

                            <el-button
                                    type="text"
                                    v-if="scope.row.live_status == 0"
                                    @click="editor(scope.$index, scope.row)"
                            >开始直播
                            </el-button>
                            <el-button
                                    type="text"
                                    @click="delbtn(scope.$index, scope.row)"
                                    v-if="scope.row.live_status == 1"
                            >关闭直播
                            </el-button>
                            <el-button type="text" @click="editor2(scope.$index, scope.row)"
                            >直播场次
                            </el-button>
                            <el-button type="text" @click="modify(scope.$index, scope.row)"
                            >修改
                            </el-button>
                            <el-button type="text" @click="liveBack(scope.$index, scope.row)"
                            >删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="发布成功" :visible.sync="dialogVisible" width="50%">
            <!-- <p style="padding-left:93px;margin-bottom:20px">
                    在OBS直播软件中输入以下的URL与流名称
                  </p> -->
            <el-form :model="createVideo" ref="reasonForm" label-width="150px">
                <!-- <el-form-item label="流类型:">
                          <el-input class="input-width" disabled value="rtmp"></el-input>
                        </el-form-item> -->
                <el-form-item label="网页开播链接">
                    <el-input v-model="WebpageUrl" class="input-width"></el-input>
                    <a :href="WebpageUrl" target="_blank">
                        <el-button
                                class="input-width"
                                type="success"
                                plain
                                style="margin-left:20px"
                        >打开
                        </el-button>
                    </a>
                </el-form-item>
                <el-form-item label="启动客户端链接:">
                    <el-input v-model="clientUrl" class="input-width"></el-input>
                    <a :href="clientUrl" target="_blank">
                        <el-button
                                class="input-width"
                                type="success"
                                plain
                                style="margin-left:20px"
                        >打开
                        </el-button>
                    </a>
                </el-form-item>
                <el-form-item>
                    <div style="display:flex;">
                        <div style="padding-right:20px">
                            <span style="padding-right:10px">频道号</span>{{ channelId }}
                        </div>
                        <div>
              <span style="padding-right:10px">登录密码</span
              >{{ channelPasswd }}
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="助教后台链接:">
                    <el-input v-model="teacherUrl" class="input-width"></el-input>
                    <a :href="teacherUrl" target="_blank">
                        <el-button
                                class="input-width"
                                type="success"
                                plain
                                style="margin-left:20px"
                        >打开
                        </el-button>
                    </a>
                </el-form-item>
                <el-form-item>
                    <div>
                        <div
                                style="display:flex;"
                                v-for="(item, index) in channel_accout"
                                :key="index"
                        >
                            <div style="padding-right:20px">
                                <span style="padding-right:10px">频道号</span>{{ item.account }}
                            </div>
                            <div>
                <span style="padding-right:10px">登录密码</span
                >{{ item.passwd }}
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog title="添加直播" :visible.sync="addDialogVisible" width="30%">
            <el-form :model="createVideo" ref="reasonForm" label-width="150px">
                <el-form-item label="直播名称:">
                    <el-input
                            class="input-width"
                            value="直播名称"
                            v-model="livingName"
                    ></el-input>
                </el-form-item>
                <el-form-item label="任课老师:">
                    <el-select v-model="teachers" placeholder="请选择">
                        <el-option
                                v-for="item in teacherList"
                                :key="item.teacher_id"
                                :label="item.teacher_name"
                                :value="{ value: item.teacher_id, label: item.teacher_name }"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联班级:">
                    <div
                            style="width:75%;display:flex;flex-direction:column;margin-right:10px"
                            v-if="addclass.length"
                    >
                        <el-input
                                v-for="(items, index) in addclass"
                                :key="index"
                                :value="items.name"
                                class="input-width"
                                style="width:100%;margin-bottom:10px"
                        >
                            <i
                                    class="el-icon-delete el-input__icon"
                                    slot="suffix"
                                    @click="handleIconClick(items.name)"
                            >
                            </i
                            ></el-input>
                    </div>
                    <el-select
                            v-model="value"
                            placeholder="请选择"
                            style="margin-left：20px"
                            @change="addDomain"
                    >
                        <el-option
                                v-for="item in classList"
                                :key="item.classroom_id"
                                :label="item.classroom_name"
                                :value="{ value: item.classroom_id, label: item.classroom_name }"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddhandleConfirm">确 定</el-button>
      </span>
        </el-dialog>
        <div class="table_bottom">
            <div class="table_bottom">
                <page
                        :data="videoData.total"
                        :curpage="page"
                        @pageChange="doPageChange"
                />
            </div>
        </div>
        <!-- <el-button type="warning" @click="multiDel" style="margin-top:20px"
              >批量删除</el-button
            >-->
    </section>
</template>

<script>
    const defaultcreateVideo = {
        name: '',
        sort: 0,
        class: '',
        url: '',
    }
    export default {
        data() {
            return {
                datas: {},
                teacherUrl: 'https://live.polyv.net/teacher.html',
                livingName: '',
                biaoshi: '',
                Webpage: '',
                clientUrl: '',
                WebpageUrl: '',
                channelPasswd: '',
                channelId: '',
                account: '',
                passwd: '',
                multipleSelection: [],
                videoData: [
                    {
                        index: '1',
                        nickname: '',
                        describe: '',
                        order: '0',
                        number: '10',
                        status: 0,
                    },
                    {
                        index: '2',
                        nickname: '',
                        describe: '',
                        order: '1',
                        number: '10',
                        status: 1,
                    },
                ],
                channel_accout: [],
                auccout: 0,
                page: 1,
                classList: [],
                teachers: '',
                teacherList: [],
                addclass: [],
                dialogMiddleVisible: false,
                dialogVisible: false,
                createVideo: Object.assign({}, defaultcreateVideo),
                videoId: null,
                addDialogVisible: false,
                teacherArray: [],
                classArray: [],
                value: '',
                livingName: '',
                addLiveData: {
                    live_name: '', //直播名称
                    class_id: [], //直播班级数组形式
                    live_teacher_id: '', //直播讲师ID
                    live_teacher_name: '', //直讲师名称
                    live_long: '', //直播时长
                    live_type: 2, //直播类型：1为免费公开课，2为正常班级直播
                    course_id: '', //课程ID
                },
            }
        },
        created() {
            console.log(this.$route.query.biaoshi)
            this.$api.livelist(this, 'videoData')
            this.$api.teacherArray(this, 'teacherArray')
            this.$api.classroom(this, 'classArray')
            this.biaoshi = this.$route.query.biaoshi
        },
        methods: {
            addopenVideo() {
                let course_id = this.$route.query.course_id
                this.$router.push({
                    name: 'openclassVideo',
                    query: { course_id: course_id },
                })
            },
            handleIconClick(values) {
                let deleteItems = this.addclass.findIndex((value) => value.name == values)
                this.addclass.splice(deleteItems, 1)
            },
            addDomain(value) {
                console.log(value)
                if (this.addclass.length > 0) {
                    let flag = false
                    for (let i of this.addclass) {
                        if (value.value == i.ID) {
                            flag = true
                        }
                    }
                    if (!flag) {
                        this.addclass.push({
                            name: value.label,
                            ID: value.value,
                        })
                    }
                } else {
                    this.addclass.push({
                        name: value.label,
                        ID: value.value,
                    })
                }
                console.log(this.addclass)
                // this.addclass.push({
                //   name: value.label,
                //   ID: value.value,
                // })
            },
            AddhandleConfirm() {
                this.$api.createlive(this, 'addLiveData')
            },
            // 复制成功时的回调函数
            onCopy(e) {
                console.log(e)
                this.$message.success('内容已复制到剪切板！')
            },
            // 复制失败时的回调函数
            onError(e) {
                this.$message.error('抱歉，复制失败！')
            },
            editor2(index, row) {
                console.log(row)
                this.$router.push({
                    path: '/eda/liveMan',
                    query: { live_class_id: row.live_class_id },
                })
            },
            deleteOption(data) {
                console.log(data)
                this.addLiveData.class_id.forEach((item, index) => {
                    if (JSON.stringify(item) == JSON.stringify(data)) {
                        console.log(item)
                        this.addLiveData.class_id.splice(index, 1)
                    }
                })
            },
            selectOption(event, item) {
                console.log(
                    JSON.stringify(this.addLiveData.class_id),
                    JSON.stringify(event)
                )
                if (
                    JSON.stringify(this.addLiveData.class_id).indexOf(
                        JSON.stringify(event)
                    ) == -1
                ) {
                    console.log('不存在')
                    this.addLiveData.class_id.push({
                        value: event.value,
                        label: event.label,
                    })
                } else {
                    console.log('已存在')
                    this.$message({
                        type: 'warning',
                        message: '不能重复添加同一数据',
                    })
                }
            },
            delbtn(index, data) {
                console.log(data)
                let that = this
                this.$confirm('确定要关闭当前直播吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        console.log(data)
                        that.$api.closeLive(this, data.live_class_id)
                    })
                    .catch(() => {})
            },
            liveBack(index, row) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning',
                })
                    .then(() => {
                        this.$api.LiveToDelete(this, row)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        })
                    })
            },
            // 获取数据
            getTable(state, val, datas) {
                console.log(state, val)
                if (state == 'page') {
                    this.page = val
                    this.datas = datas
                } else if (state == 'data') {
                    this.videoData = val
                }
            },
            GoDetail(index, row) {
                console.log(index, row)
                this.$router.push({
                    name: 'liveDetail',
                    query: { live_id: row.live_id },
                })
            },
            doPageChange(page) {
                this.page = page
                this.$api.livelist(this, 'videoData', this.datas)
            },
            addVideo() {
                this.addDialogVisible = true
                this.$api.getTeacherDrop(this, 'teacherList')
                this.$api.getCourseAllclass(this, 'classList')
            },

            editor3(index, row) {
                this.clientUrl = ''
                this.WebpageUrl = ''
                this.channelId = ''
                this.channelPasswd = ''
                this.channel_accout = []
                // this.account = ''
                // this.passwd = ''
                this.dialogVisible = true
                this.$api.getLiveLink(this, row, 'createVideo')
            },
            editor(index, row) {
                this.clientUrl = ''
                this.WebpageUrl = ''
                this.channelId = ''
                // this.account = ''
                // this.passwd = ''
                this.channel_accout = []
                this.channelPasswd = ''
                this.$confirm('确定要创建直播吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        console.log('创建直播', row)
                        this.dialogVisible = true
                        // this.$api.openlive(this, row, 'createVideo')
                        this.$api.livestart(this, row, 'createVideo')
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        })
                    })
            },
            handleMiddleConfirm() {
                this.dialogMiddleVisible = false
                this.dialogVisible = true
            },
            handleConfirm() {
                this.dialogVisible = false
                if (this.videoId == null) {
                    //添加操作
                    this.$message({
                        message: '添加成功！',
                        type: 'success',
                        duration: 1000,
                    })
                } else {
                    //编辑操作
                    this.$message({
                        message: '编辑成功！',
                        type: 'success',
                        duration: 1000,
                    })
                }
            },
            chapterVideo() {},
            handleSelectionChange(val) {
                this.multipleSelection = val
                console.log(this.multipleSelection)
            },
            multiDel() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        message: '请先勾选操作选项！',
                        type: 'warning',
                    })
                }
            },
            modify(index, data) {
                console.log('执行', index, data)

                this.$router.push({
                    path: '/eda/openclassVideo',
                    query: {
                        live_class_id: data.live_class_id,
                    },
                })
            },
        },

        //   mounted() {}
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-form-item__content {
        display: flex;
    }

    /deep/ .el-table__header th,
    .el-table__header tr {
        background-color: #f8f8f8;
        color: #909399;
    }

    .main {
        padding: 20px;
    }

    .client_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .userTable {
        margin-top: 20px;
    }

    /deep/ .el-input {
        width: 60%;
    }

    /deep/ .el-input--suffix {
        width: 100%;
    }
</style>
