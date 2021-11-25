import Vue from 'vue'
const min = (val) => val < 10 ? '0' + val : val
const filters = {
    moneyFormat(number, isCompact) {
        return new Intl.NumberFormat('zh-CN', { style: 'currency', minimumFractionDigits: 2, notation: isCompact ? 'compact' : 'standard', currency: 'CNY' }).format(number || 0)
    },
    filterPhone(val) {
        if (!val) return "--";
        val = val + ''
        let start = val.substr(0, 3);
        let end = val.substr(-4);
        return `${start}****${end}`;
    },
    filterIdCard(val) {
        if (!val) return "--";
        val = val + ''
        let start = val.substr(0, 3);
        let end = val.substr(-4);
        return `${start}***********${end}`;
    },
    removeTag(val) {
        const regx = /<[^>]*>|<\/[^>]*>/gm;
        return val ? val.replace(regx, "") : ''
    },
    // 视频时长
    filterDuration(val) {
        let s = val
        let h = 0
        let m = 0
        if (s >= 60) {
            m = Math.floor(s / 60)
            s = s % 60
        }
        if (m >= 60) {
            h = Math.floor(m / 60)
            m = m % 60
        }
        return `${min(h)}:${min(m)}:${min(s)}`
    },
    // 视频大小
    filterFileSize(b) {
        let kb = 0
        let mb = 0
        let g = 0
        if (b / 1024 >= 1) {
            kb = (b / 1024).toFixed(2)
            if (kb < 1024) {
                return `${kb}KB`
            }
        }
        if (kb / 1024 >= 1) {
            mb = (kb / 1024).toFixed(2)
            if (mb < 1024) {
                return `${mb}MB`
            }
        }
        if (mb / 1024 >= 1) {
            g = (mb / 1024).toFixed(2)
            return `${g}G`
        }
        return `${b}B`
    },
    orderStatus(status) {
        const statusMap = {
            0: "未付款",
            1: "新订单",
            2: "部分付款",
            3: "已付款",
            4: "已作废",
            5: "已退款",
        }
        return statusMap[status]
    },
    orderTagType(status) {
        const tagTypeMap = {
            0: "info",
            1: "",
            2: "warning",
            3: "success",
            4: "danger",
            5: "danger",
        }
        return tagTypeMap[status]
    }
}
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
    }
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})