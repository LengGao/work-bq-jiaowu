<template>
    <div>
     <div class="head_remind">
     
    </div>

     <section class="mainwrap">
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="角色名称">
                <el-input v-model="formInline.user" placeholder="校长"></el-input>
            </el-form-item>
            </el-form>
        <span class="authority">功能权限</span>
        <div style="display:flex;border:1px solid #ccc;">
       <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        <el-tree
        :data="recruitdata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        <el-tree
        :data="educadata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        <el-tree
        :data="examdata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        <el-tree
        :data="finadata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        <el-tree
        :data="sysdata"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[0]"
        class="configure">
        </el-tree>

        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addrole">取 消</el-button>
            <el-button type="primary" >提 交</el-button>
          </span>
          
        </div>
 
     </section>
    </div>

</template>

<script>
export default {
    name: 'roledetail',

    data() {
    return {
    schoolData: [
      ],
     formInline: {
          user: '',
          region: ''
        },

      data: [{
          id: 1,
          label: '资源配置',
          children: [{
            id: 2,
            label: '分类设置',
            children: [{
              id: 8,
              label: '添加分类'
            }, {
              id: 9,
              label: '编辑分类',
            }, {
              id: 10,
              label: '查询分类',
            }, {
              id: 11,
              label: '分类排序',
            }
            
            ]
          }, {
            id: 3,
            label: '项目管理',
            children: [{
              id: 12,
              label: '添加项目'
            }, {
              id: 13,
              label: '编辑项目',
            }, {
              id: 14,
              label: '查询项目',
            }, {
              id: 15,
              label: '项目排序',
            }
            ]
          },
          {
            id: 4,
            label: '课程管理',
            children: [{
              id: 16,
            //   label: '三级 3-2-1'
            }]
          },
          {
            id: 5,
            label: '题库管理',
            children: [{
              id: 17,
              label: '三级 3-2-1'
            }]
          },
          {
            id: 6,
            label: '老师管理',
            children: [{
              id: 18,
              label: '三级 3-2-1'
            }]
          },
          {
            id: 7,
            label: '教材管理',
            children: [{
              id: 19,
              label: '三级 3-2-1'
            }]
          },
          ]
        }],

        recruitdata: [{
          id: 1,
          label: '招生管理',
          children: [{
            id: 2,
            label: '客户管理',
            children: [{
              id: 8,
              label: '添加客户'
            }, {
              id: 9,
              label: '编辑客户',
            }, {
              id: 10,
              label: '查询客户',
            }, {
              id: 11,
              label: '客户排序',
            }
            
            ]
          },

          ]
        }],

        educadata: [{
          id: 1,
          label: '教务管理',
          children: [{
            id: 2,
            label: '学生中心',
            children: [{
              id: 8,
              label: '添加学生'
            }, {
              id: 9,
              label: '编辑学生',
            }, {
              id: 10,
              label: '查询学生',
            }, {
              id: 11,
              label: '学生排序',
            }
            
            ]
          }, {
            id: 3,
            label: '班级管理',
            children: [{
              id: 12,
              label: '添加班级'
            }, {
              id: 13,
              label: '编辑班级',
            }, {
              id: 14,
              label: '查询班级',
            }, {
              id: 15,
              label: '班级排序',
            }
            ]
          },
          {
            id: 4,
            label: '排课管理',
            children: [{
              id: 16,
            //   label: '三级 3-2-1'
            }]
          },
          {
            id: 5,
            label: '考勤统计',
            children: [{
              id: 17,
              label: '三级 3-2-1'
            }]
          },
          {
            id: 6,
            label: '学习进度',
            children: [{
              id: 18,
              label: '三级 3-2-1'
            }]
          },
          ]
        }],

        examdata: [{
          id: 1,
          label: '考务管理',
          children: [{
            id: 2,
            label: '考试计划',
            children: [{
              id: 8,
              label: '添加考试计划'
            }, {
              id: 9,
              label: '编辑考试计划',
            }, {
              id: 10,
              label: '查询考试计划',
            }, {
              id: 11,
              label: '考试计划排序',
            }
            
            ]
          }, {
            id: 3,
            label: '报考管理',
            children: [{
              id: 12,
              label: '添加项目'
            }, {
              id: 13,
              label: '编辑项目',
            }, {
              id: 14,
              label: '查询项目',
            }, {
              id: 15,
              label: '项目排序',
            }
            ]
          },
          {
            id: 4,
            label: '成绩管理',
            children: [{
              id: 16,
            //   label: '三级 3-2-1'
            }]
          },
          {
            id: 5,
            label: '毕业管理',
            children: [{
              id: 17,
              label: '三级 3-2-1'
            }]
          },
          ]
        }],

        finadata: [{
          id: 1,
          label: '财务管理',
          children: [{
            id: 2,
            label: '订单管理',
            children: [{
              id: 8,
              label: '添加订单'
            }, {
              id: 9,
              label: '编辑订单',
            }, {
              id: 10,
              label: '查询订单',
            }, {
              id: 11,
              label: '订单排序',
            }
            
            ]
          }, {
            id: 3,
            label: '财务入账',
            children: [{
              id: 12,
              label: '添加项目'
            }, {
              id: 13,
              label: '编辑项目',
            }, {
              id: 14,
              label: '查询项目',
            }, {
              id: 15,
              label: '项目排序',
            }
            ]
          },
          {
            id: 4,
            label: '退费审批',
            children: [{
              id: 16,
            //   label: '三级 3-2-1'
            }]
          },
          {
            id: 5,
            label: '作废审批',
            children: [{
              id: 17,
              label: '三级 3-2-1'
            }]
          },
          ]
        }],

        sysdata: [{
          id: 1,
          label: '系统设置',
          children: [{
            id: 2,
            label: '角色权限',
            children: [{
              id: 8,
              label: '添加角色权限'
            }, {
              id: 9,
              label: '编辑角色权限',
            }, {
              id: 10,
              label: '查询角色权限',
            }, {
              id: 11,
              label: '角色权限排序',
            }
            
            ]
          }, {
            id: 3,
            label: '员工管理',
            children: [{
              id: 12,
              label: '添加项目'
            }, {
              id: 13,
              label: '编辑项目',
            }, {
              id: 14,
              label: '查询项目',
            }, {
              id: 15,
              label: '项目排序',
            }
            ]
          },
          {
            id: 4,
            label: '通知公告',
            children: [{
              id: 16,
            //   label: '三级 3-2-1'
            }]
          },
          {
            id: 5,
            label: '自定义字段',
            children: [{
              id: 17,
              label: '三级 3-2-1'
            }]
          },
          {
            id: 6,
            label: '业务模板',
            children: [{
              id: 18,
              label: '三级 3-2-1'
            }]
          },
          {
            id: 7,
            label: '操作日志',
            children: [{
              id: 19,
              label: '三级 3-2-1'
            }]
          },
          ]
        }],


        defaultProps: {
          children: 'children',
          label: 'label'
        }
        
 
    }

  },

    mounted() {
    // let status = 3
    this.$api.roleperm(this, 'schoolData')
  },
    methods: {
      addrole(text) {
      this.$router.push({
        path: '/set/role',
        query: {},
      })
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.roleperm(this, 'schoolData', this.datas)
    },


  },

}
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
//   background-color: #f8f8f8;
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
.add-role{
    float: right;
    margin-bottom: 20px;
}
.el-tree{
    width: 17%;
    border-right:1px solid #ccc;
    // height: 480px;
    padding: 20px;
}
.authority{
    font-size: 14px;
    color: #333;
    padding: 10px 0;
    display: block;
}
.configure{
    text-align: center;

}
.dialog-footer{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>

