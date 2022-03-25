import Vue from 'vue'
const mixin = {
    methods: {
        // 跳转到学生详情
        toStudentDetail(uid, query) {
            this.$router.push({
                name: "studentDetail",
                query: { uid, ...query },
            });
        },
        // 跳转到班级详情
        toClassDetail(id) {
            this.$router.push({
                name: "classDetail",
                query: {
                    id,
                },
            });
        },
        // 跳转到订单详情
        toOrderDetail(id) {
            this.$router.push({
                name: "crmOrderDetail",
                query: {
                    id,
                },
            });
        },
    }
}
Vue.mixin(mixin)
