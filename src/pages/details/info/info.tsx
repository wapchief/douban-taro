import Taro, { Component} from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

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
        data:{genres:[]}
    }


    render() {
        const item = this.props.data
        return (
                <View className="details-box">
                    <Image className="item-cover" src={item.images.large}></Image>
                    <View className="item-detail">
                        <Text className="title">{item.title}{'('}{item.year}{')'}</Text>
                        <Text className="original-title">{item.original_title}{'('}{item.year}{')'}</Text>
                        <View className="tag-box">
                            <Text className="tag">
                                {/* 分类 */}
                                {item.genres.join(' ')}{'/'}
                                {item.countries.join(' ')}
                                {'\n\n又名：'}{item.aka.join('/')}
                                {'\n片长:'}{item.durations[0]}
                            </Text>
                        </View>
                    </View>
                </View>
        )
    }
}

export default Info as ComponentClass<PageOwnProps, PageState>