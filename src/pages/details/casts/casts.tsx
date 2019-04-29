import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './casts.scss'
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

interface Casts {
    props: IProps;
}
class Casts extends Component<{}, Casts>{

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
            <ScrollView scrollX>
                <View className="casts-box">
                    <View className="casts-box">
                        {details.directors.map((item) => {
                            return <View className="casts-item-box" key={item.id}>
                                <Image className="info-avatar" src={item.avatars.large} />
                                <Text className="info-name">{item.name}</Text>
                                <Text className="info-status">导演</Text>
                            </View>
                        })}
                    </View>
                    <View className="casts-box">
                        {details.casts.map((item) => {
                            return <View className="casts-item-box" key={item.id}>
                                <Image className="info-avatar" src={item.avatars.large} />
                                <Text className="info-name">{item.name}</Text>
                                <Text className="info-status">演员</Text>
                            </View>
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Casts as ComponentClass<PageOwnProps, PageState>