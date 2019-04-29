import Taro, { Component, Config, showLoading } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Video } from '@tarojs/components'
import { AtRate } from 'taro-ui'

import './comments.scss'
import { ComponentClass } from 'react';
import arrow from '../../../assets/arrow.svg'
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

interface Comments {
    props: IProps;
}

class Comments extends Component<{}, Comments>{

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
            <View className="comments-box">
                
                {details.popular_comments.map((comment) => {
                    return <View className="comments-item-box" key={comment.id}>
                    <View className="user-info-box">
                        <Image className="avatar" src={comment.author.avatar} />
                        <View className="right-box">
                            <Text className="name">{comment.author.name}</Text>
                            <View className="rating-box">
                                <AtRate
                                    size={12}
                                    max={5}
                                    value={comment.rating.value} />
                                <Text className="time">{comment.created_at}</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="content">{comment.content}</Text>
                    <Text className="useful_count">{comment.useful_count}{' 人赞过这条评论'}</Text>

                </View>
                })}
                <View className="arrow-box">
                    <Text className="arrow-text">{'查看全部'}{details.comments_count}{'条短评'}</Text>
                    <Image className="arrow-img" src={arrow}/>
                </View>
            </View>
        )
    }
}

export default Comments as ComponentClass<PageOwnProps, PageState>