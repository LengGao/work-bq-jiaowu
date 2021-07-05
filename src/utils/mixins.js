import Vue from 'vue'
const mixin = {
    methods: {
        // 跳转到学生详情
        toStudentDetail(id) {
            this.$router.push({
                name: "studentDetail",
                query: { id },
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
        toOrderDetail(order_id) {
            this.$router.push({
                name: "orderdetail",
                query: {
                    order_id,
                },
            });
        },
    }
}
Vue.mixin(mixin)
