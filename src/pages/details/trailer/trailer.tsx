import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Video } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './trailer.scss'
import { ComponentClass } from 'react';
// import jsonDetails from '../moveDetails'
// let details = jsonDetails.data;
type PageStateProps = {
    data: any
}
type PageDispatchProps = {
    show: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface InitState {
    props: IProps;
}

class Trailer extends Component<{}, InitState>{

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
                <View className="trailer-box">
                    {/* 预告片 */}
                    <View className="trailer-box">
                        <Video className="video" src={details.trailers[0].resource_url} poster={details.trailers[0].medium} />
                    </View>
                    {/* 剧照 */}
                    <View className="trailer-box">
                        {details.photos.map((item) => {
                            return <View className="trailer-item-box" key={item.id}>
                                <Image className="cover" src={item.image} mode={'aspectFill'}/>
                            </View>
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Trailer as ComponentClass<PageOwnProps, PageState>