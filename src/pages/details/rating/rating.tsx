import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtRate, AtProgress } from 'taro-ui'

import './rating.scss'
import { ComponentClass } from 'react';

type PageStateProps = {
    data: any
}
type PageDispatchProps = {
    show: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Rating {
    props: IProps;
}
class Rating extends Component<{}, Rating>{

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
        const item = this.props.data
        return (
            <View className="rating-box">
                <Text className="title">豆瓣评分™</Text>
                <View className="rating-content">
                    <View className="rating-left-box">
                        <Text className="rating-sum">{item.rating.average}</Text>
                        <AtRate
                            size={12}
                            max={5}
                            value={item.rating.average / 2}
                        />
                    </View>
                    <View className="rating-right-box">
                        <AtRate size={8} max={5} value={0} />
                        <AtRate size={8} max={4} value={0} />
                        <AtRate size={8} max={3} value={0} />
                        <AtRate size={8} max={2} value={0} />
                        <AtRate size={8} max={1} value={0} />

                    </View>
                    
                    <View className="rating-progress-box">
                        <AtProgress percent={80} strokeWidth={6} isHidePercent color="#FFC82C"/>
                        <AtProgress percent={12} strokeWidth={6} isHidePercent color="#FFC82C"/>
                        <AtProgress percent={6} strokeWidth={6} isHidePercent color="#FFC82C"/>
                        <AtProgress percent={1} strokeWidth={6} isHidePercent color="#FFC82C"/>
                        <AtProgress percent={1} strokeWidth={6} isHidePercent color="#FFC82C"/>
                        <Text className="rating-comments-count">{item.ratings_count}{'人评分'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Rating as ComponentClass<PageOwnProps, PageState>