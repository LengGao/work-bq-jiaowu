import Vue from 'vue'

const filters = {
    filterPhone(val) {
        if (!val) return "--";
        let start = val.substr(0, 3);
        let end = val.substr(-4);
        return `${start}****${end}`;
    },
    filterIdCard(val) {
        if (!val) return "--";
        let start = val.substr(0, 3);
        let end = val.substr(-4);
        return `${start}***********${end}`;
    },
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})