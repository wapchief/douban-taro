import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './info.scss'
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

interface Info {
    props: IProps;
}
class Info extends Component<{}, Info>{

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    
    
    static defaultProps = {
        data:{}
    }


    render() {
        const item = this.props.data
        return (
                <View className="details-box">
                    <Image className="item-cover" src={item.images.large}></Image>
                    <View className="item-detail">
                        <Text className="title">{item.title}</Text>
                        <View className="tag-box">
                            <Text className="tag">
                                {/* 分类 */}
                                {item.genres.join(' ')}{'/'}
                                {/* 导演 */}
                                {item.directors[0].name}{'/'}
                                {/* 遍历主演，并格式化空格分割 */}
                                {item.casts.map((child) => {
                                    return child.name
                                }).join(' ')}
                                {'\n时长：'}{item.durations[0]}
                            </Text>
                        </View>
                    </View>
                </View>
        )
    }
}

export default Info as ComponentClass<PageOwnProps, PageState>