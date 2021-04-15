import Vue from 'vue'
const min = (val) => val < 10 ? '0' + val : val
const filters = {
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
    }
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})