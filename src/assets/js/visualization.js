import { axiosHttp, v, url } from '@/assets/js/apiCommon'
let visualization = {
    mockJS() {
        let config = {
            type:'top',
            key:"123456"
        }
        axiosHttp({
            url: url.mockJS,
            data: config,
            method: 'POST',
            then(res) {
                console.log(res)
            },
        })
    },
}
export default visualization