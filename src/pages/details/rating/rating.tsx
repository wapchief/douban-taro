import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtRate } from 'taro-ui'

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
        data:{}
    }


    render() {
        const item = this.props.data
        return (
                <View className="rating-box">
                    
                </View>
        )
    }
}

export default Rating as ComponentClass<PageOwnProps, PageState>