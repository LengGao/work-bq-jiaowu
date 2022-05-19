const searchCache = {
    state: {
        //   需要缓存的页面:[缓存的触发条件]
        cacheViews: {
            studentCenter: ['studentDetail'], //示例： 学生中心，只有进入学生详情才能缓存
            channelStudent: ['studentDetail'],
            classManage: ['classDetail', 'learnerManage', 'massMessage', 'returnVisit', 'classVideo', 'classMessage'],
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
            sessionStatistics: ['studentDetail', 'orderdetail', 'studentOrderDetail', 'crmOrderDetail'],
            configureCourses: ['videoFaceRecord', 'studentDetail', 'videoPlayStatistics'],
            videoFaceRecord: ['studentDetail'],
            faceScanningRecord: ['studentDetail'],
            operationLog: ['logDetails'],
            studentList: ['studentChapter'],
            studentDetail: ['studentChapter', 'learningDetails', 'orderdetail', 'shift', 'classDetail', 'crmOrderDetail', 'studentOrderDetail'],
            cusdetail: ['studentChapter', 'learningDetails', 'orderdetail', 'shift', 'classDetail', 'crmOrderDetail'],
            questionStatistics: ['learningDetails', 'studentDetail'],
            classDetail: ['learningDetails', 'studentDetail', 'studentChapter'],
            projectStatistics: ['studentDetail'],
            projectManage: ['projectStatistics'],
            institutionAccount: ['institutionConfig', 'institutionUser', 'institutionDetails', 'collectionDetail', 'institutionProject', 'institutionalCollection'],
            customerProject: ['orderdetail', 'cusdetail'],
            eduOrder: ['orderdetail', 'cusdetail'],
            crmCustomer: ['cusdetail'],
            crmOrder: ['crmOrderDetail', 'cusdetail'],
            crmOrderDetail: ['cusdetail'],
            eduOpenClass: ['studentDetail'],
            approveManage: ['crmOrderDetail', 'cusdetail'],
            returnPayment: ['crmOrderDetail', 'studentDetail', 'studentOrderDetail', 'institutionalCollectionDetail'],
            institutionalCollection: ['institutionalCollectionDetail'],
            institutionalCollectionDetail: ['studentOrderDetail'],
            studentOrder: ['studentOrderDetail', 'studentDetail'],
            collectionList: ['cusdetail', 'crmOrderDetail'],
            studentStatusChangeList: ['crmOrderDetail', 'studentDetail'],
            expireManage: ['crmOrderDetail'],
            institutionProject: ['institutionDetails'],
            institutionDetails: ['addInstitutionalCollection', 'institutionalCollectionDetail', 'collectionDetail', 'studentDetail', 'studentOrderDetail', 'crmOrderDetail'],
            paymentRebate: ['institutionalCollectionDetail', 'studentDetail', 'crmOrderDetail', 'institutionalRebateDetail', 'studentOrderDetail', 'addInstitutionalCollection']
        },
        // 当前缓存的页面
        currentCache: ['visualization']
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