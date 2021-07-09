const searchCache = {
    state: {
        // 需要缓存的页面
        cacheViews: ['studentCenter', 'classManage', 'customerManage',
            'teachMaterial', 'certificates', 'teachSchedule',
            'attendanceManage', 'classLive', 'liveSessions', 'livePublicClass',
            'finance', 'order', 'courseManage', 'apply', 'questionBank', 'achievement'
        ],
        // 缓存的触发条件
        cacheTo: {
            studentCenter: ['studentDetail'], //示例： 学生中心，只有进入学生详情才能缓存
            classManage: ['classDetail', 'learnerManage', 'massMessage', 'returnVisit'],
            customerManage: ['cusdetail', 'orderdetail'],
            teachMaterial: ['materialJournal'],
            certificates: ['certificatesLog'],
            teachSchedule: ['timetablePreview', 'allSchedule'],
            attendanceManage: ['callinClass', 'attendanceStatistics'],
            classLive: ['liveSessions'],
            livePublicClass: ['liveSessions'],
            liveSessions: ['playbackVideo', 'learningMaterials', 'liveDetails'],
            finance: ['orderdetail', 'cusdetail'],
            order: ['orderdetail', 'cusdetail'],
            courseManage: ['configureCourses', 'cusdetail'],
            apply: ['examinationSMS', 'projectDetails'],
            questionBank: ['configureQuestionBank', 'configureScore'],
            achievement: ['achieveDetails', 'allResult'],
        },
        // 当前缓存的页面
        currentCache: []
    },
    mutations: {
        SET_VIEW_CACHE(state, viewName) {
            if (!state.currentCache.includes(viewName)) {
                state.currentCache.push(viewName)
            }
        },
        DEL_VIEW_CACHE(state, viewName) {
            state.currentCache = state.currentCache.filter(item => item !== viewName)
        },
    },
    actions: {
        setViewCache({ commit }, viewName) {
            commit('SET_VIEW_CACHE', viewName)
        },
        delViewCache({ commit }, viewName) {
            commit('DEL_VIEW_CACHE', viewName)
        },
    }
}
export default searchCache