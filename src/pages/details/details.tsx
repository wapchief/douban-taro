import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import '../details/details.scss'
let doubanDetails = 'https://douban.uieee.com/v2/movie/subject/'
import Info from '../details/info/info'
export default class Details extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    state = {
        id: '',
        title: '',
        data: {
            year: '',//年份
            images: { large: '' },//封面
            rating: { average: 0, details: {} },//评分
            wish_count: '',//想看
            collect_count: '',//收藏人数
            popular_comments: [{
                rating: { value: 0 }, 
                author: { avatar: '', name: '', signature: '' },
                content:'',//评论内容
                created_at:'',//评论时间
            }],//热评列表（List）
            title:'',
            photos_count:0,//剧照数量
            pubdate:'',//上映日期
            share_url:'',//分享链接
            writers:[{
                avatars:{large:''},
                name:'',
                alt:'',
            }],//作者（List）
            pubdates:[],//上映时间
            tags:[],//标签
            durations:[],//时长
            genres:[],//分类
            trailers:[{
                resource_url:'',//预告片播放链接
                title:'',
                medium:'',
            }],//预告片（List）
            casts:[],//演员
            summary:'',//简介
            directors:[],//导演
            ratings_count:0,//评分人数
            comments_count:0,//评论人数
        }
    }

    config: Config = {
        navigationBarTitleText: this.state.title,
        backgroundColor: "#f9f5f4",
    }

    componentWillMount() {
        const date = this.$router.params
        console.log(date)
        this.setState({
            id: date.id,
            title: date.title
        })
        this._getDetails(date.id)
    }
    _getDetails(id) {
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
                console.log(_this.state.id + '=========' + (doubanDetails + _this.state.id) + '========' + e.data)
                _this.setState({
                    data: e.data,
                })
            },
            fail(e) {

            },
            complete() {
                Taro.hideLoading()
            },
        })
    }



    render() {
        const item = this.state.data
        return (
            <ScrollView className="root-box">
                {/* 头部简介 */}
                <Info data={item}/>
            </ScrollView>
        )
    }
}
