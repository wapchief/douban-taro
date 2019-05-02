
import Taro from '@tarojs/taro'
const doubanDetails = 'https://douban.uieee.com/v2/movie/subject/'
import {DETAILS,DETAILS_DATA} from '../constants/details'
export function details(id) {
    return (dispatch) => {
        Taro.showLoading({ title: '正在加载' })
        const _this = this
        const url = doubanDetails + id
        console.log(url)
        Taro.request({
            url: url,
            header: {
                'content-type': 'json'
            },
            success(e) {
                console.log(e.statusCode + '========' + e.data)
                if (e.statusCode == 200) {
        
                    dispatch({
                        type: DETAILS,
                        data: e.data
                    })
                    Taro.setStorage({
                        key: DETAILS_DATA,
                        data: e.data
                      }).then(() => {
                        console.log(' Taro.setStorage')
                      })
                } else {
                    //请求失败使用本地假数据
                    // _this.setState({
                    //     details: details,
                    // })
                }
                

            },
            fail(e) {
                console.log('error')
            },
            complete() {
                Taro.hideLoading()
            },
        })

    }
}