import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import '../details/details.scss'
import Info from '../details/info/info'
import Rating from '../details/rating/rating'
import Casts from '../details/casts/casts'
import Trailer from '../details/trailer/trailer'
import Comments from '../details/comments/comments'
import Reviews from '../details/reviews/reviews'

import jsonDetails from './moveDetails'
let details = jsonDetails.data;
// console.log()
// console.log(Array.from(ratingDetails), 'kkkkk')
const doubanDetails = 'https://douban.uieee.com/v2/movie/subject/'
//本地代理请求
// const doubanDetails = 'http://localhost:8080/v2/movie/subject/'

import { connect } from '@tarojs/redux'
import { ComponentClass } from 'react';

type PageStateProps = {
    details: {
        details: {}
    }
}

type PageDispatchProps = {
    
    details: (data: any) => void

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}


@connect(({ details}) => ({
    details
  }), (dispatch) => ({
    
    details(data){
      dispatch(details(data))
    }
  }))

class Details extends Component {

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
        summaryExpand: false,
        details: {
            year: '',//年份
            images: { large: '' },//封面
            rating: { average: 0, details: {} },//评分
            wish_count: '',//想看
            collect_count: '',//收藏人数
            popular_comments: [{
                rating: { value: 0 },
                author: { avatar: '', name: '', signature: '' },
                content: '',//评论内容
                created_at: '',//评论时间
            }],//热评列表（List）
            title: '',
            photos_count: 0,//剧照数量
            pubdate: '',//上映日期
            share_url: '',//分享链接
            writers: [{
                avatars: { large: '' },
                name: '',
                alt: '',
            }],//作者（List）
            pubdates: [],//上映时间
            tags: [],//标签
            durations: [],//时长
            genres: [],//分类
            trailers: [{
                resource_url: '',//预告片播放链接
                title: '',
                medium: '',
            }],//预告片（List）
            casts: [],//演员
            summary: '',//简介
            directors: [],//导演
            ratings_count: 0,//评分人数
            comments_count: 0,//评论人数
        }
    }

    config: Config = {
        navigationBarTitleText: this.state.title,
        backgroundColor: "#f9f5f4",
    }
    static data: any;

    componentWillMount() {
        const date = this.$router.params
        console.log(date)
        this.setState({
            id: date.id,
            title: date.title
        })
        this._getDetails(date.id)
    }

    onShareAppMessage() {
        return {
        }
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
                console.log(e.statusCode + '========' + e.data)
                if (e.statusCode == 200) {
                    _this.setState({
                        details: e.data,
                    })
                } else {
                    //请求失败使用本地假数据
                    _this.setState({
                        details: details,
                    })
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

    _summaryExp() {
        this.setState({
            summaryExpand: !this.state.summaryExpand
        })
    }


    render() {
        const item = this.state.details
        return (
            <ScrollView className="root-box">
                {/* 头部简介 */}
                <Info data={item} />
                {/* 评分模块 */}
                <Rating data={item} />
                {/* 简介 */}
                <View className="sub-title">简介</View>
                <Text className={this.state.summaryExpand ? "summary-tv" : "summary-tv-all"}>{item.summary}</Text>
                <View className="summary-bt" onClick={this._summaryExp.bind(this)}>{this.state.summaryExpand ? "" : "展开"}</View>
                {/* 影人 */}
                <View className="sub-title">影人</View>
                <Casts data={item} />
                {/* 预告片剧照 */}
                <View className="sub-title">预告片/剧照</View>
                <Trailer data={item} />
                {/* 热门短评 */}
                <View className="sub-title">短评</View>
                <Comments data={item} />
                {/* 热门影评 */}
                <View className="sub-title">影评</View>
                <Reviews data={item} />
            </ScrollView >
        )
    }
}

export default Details as ComponentClass<PageOwnProps, PageState>