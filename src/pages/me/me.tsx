import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import '../me/me.scss'
export default class Me extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '正在热映'
  }

  _goToDetails(){
    Taro.navigateTo({url:'/pages/details/details?id=27202819&title=反贪风暴'})
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="me-box">
        <Text>Me---</Text>
        <Image className="image" src='https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg' onClick={this._goToDetails.bind(this)}/>
      </View>
    )
  }
}
