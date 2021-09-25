const searchCache = {
    state: {
        // 需要缓存的页面
        cacheViews: ['studentCenter', 'classManage', 'customerManage',
            'teachMaterial', 'certificates', 'teachSchedule',
            'attendanceManage', 'classLive', 'liveSessions', 'livePublicClass',
            'finance', 'order', 'courseManage', 'apply', 'questionBank', 'achievement',
            'teachingManage', 'textbookManage', 'warehouseManage', 'agency', 'configureQuestionBank',
            'allQuestionList', 'videoLibrary', 'aliVideo', 'classVideo', 'collegeStudentList',
            'configureCourses', 'videoFaceRecord', 'faceScanningRecord', 'operationLog', 'studentList',
            'studentDetail', 'questionStatistics', 'classDetail', 'projectStatistics', 'projectManage',
            'institutionAccount', 'customerProject', 'eduOrder'
        ],
        // 缓存的触发条件
        cacheTo: {
            studentCenter: ['studentDetail'], //示例： 学生中心，只有进入学生详情才能缓存
            classManage: ['classDetail', 'learnerManage', 'massMessage', 'returnVisit', 'classVideo'],
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
            courseManage: ['configureCourses', 'cusdetail', 'createClass', 'studentList', 'studentChapter', 'videoFaceRecord', 'videoPlayStatistics'],
            apply: ['examinationSMS', 'projectDetails'],
            questionBank: ['configureQuestionBank', 'configureScore', 'questionConfigure', 'questionStatistics', 'studentDetail', 'learningDetails'],
            configureQuestionBank: ['questionConfigure'],
            allQuestionList: ['questionConfigure', 'configureQuestionBank'],
            achievement: ['achieveDetails', 'allResult'],
            teachingManage: ['addTeacher'],
            textbookManage: ['inventoryDetails'],
            warehouseManage: ['textbookDetails', 'storageLog'],
            agency: ['editOrgan'],
            videoLibrary: ['classVideo', 'configureCourses'],
            aliVideo: ['classVideo'],
            classVideo: ['videoPlaybackStatistics'],
            collegeStudentList: ['studentDetail', 'orderdetail'],
            configureCourses: ['videoFaceRecord', 'studentDetail', 'videoPlayStatistics'],
            videoFaceRecord: ['studentDetail'],
            faceScanningRecord: ['studentDetail'],
            operationLog: ['logDetails'],
            studentList: ['studentChapter'],
            studentDetail: ['studentChapter', 'learningDetails', 'orderdetail', 'shift', 'classDetail'],
            questionStatistics: ['learningDetails', 'studentDetail'],
            classDetail: ['learningDetails', 'studentDetail', 'studentChapter'],
            projectStatistics: ['studentDetail'],
            projectManage: ['projectStatistics'],
            institutionAccount: ['institutionConfig', 'institutionUser'],
            customerProject: ['orderdetail', 'cusdetail'],
            eduOrder: ['orderdetail', 'cusdetail']
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