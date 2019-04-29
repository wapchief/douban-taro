import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Video } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './reviews.scss'
import { ComponentClass } from 'react';
import arrow from '../../../assets/arrow.svg'

type PageStateProps = {
    data: any
}
type PageDispatchProps = {
    show: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Reviews {
    props: IProps;
}

class Reviews extends Component<{}, Reviews>{

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */


    static defaultProps = {
        data: {}
    }


    render() {
        const details = this.props.data
        return (
            <View className="review-box">
                
                {details.popular_reviews.map((comment) => {
                    return <View className="review-item-box" key={comment.id}>
                    <View className="user-info-box">
                        <Image className="avatar" src={comment.author.avatar} />
                        <Text className="name">{comment.author.name}</Text>
                        <AtRate
                                    size={12}
                                    max={5}
                                    value={comment.rating.value} />
                    </View>
                    <Text className="title">{comment.title}</Text>
                    <Text className="content">{comment.summary}</Text>
                </View>
                })}
                <View className="arrow-box">
                    <Text className="arrow-text">{'查看全部'}{details.reviews_count}{'条评影'}</Text>
                    <Image className="arrow-img" src={arrow}/>
                </View>
            </View>
        )
    }
}

export default Reviews as ComponentClass<PageOwnProps, PageState>