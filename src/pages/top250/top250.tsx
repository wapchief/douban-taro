import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtRate, AtLoadMore } from 'taro-ui'

import '../top250/top250.scss'
const doubanTop = 'https://douban.uieee.com/v2/movie/top250'

export default class Top250 extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'Top250',
    enablePullDownRefresh: false,//开启下拉刷新
    backgroundTextStyle: "dark",
    backgroundColor: "#fafcfd",
  }

  state = {
    pageNo: 0,
    datas: [{
      id: '1',
      year: '',
      genres: [],
      pubdates: [],
      durations:[],
      images: {
        large: ''
      },
      casts: [{
        name: ''
      }],
      directors: [{
        name: ''
      }],
      title: '111',
      rating: {
        average: 0
      }
    }],
    total: 0,
    loadMore: 'more',
  }

  componentWillMount() {
    Taro.showLoading({ title: '正在加载' })
    this.setState({
      datas: []
    })
    this._getDouBanList(0)
  }

  onReachBottom() {
    //判断是否加载完所有的数据
    if (this.state.datas.length < this.state.total) {
      this.setState({
        pageNo: this.state.pageNo += 15,
        loadMore: 'loading'
      })
      this._getDouBanList(this.state.pageNo)

    } else {
      this.setState({
        loadMore: 'noMore'
      })
    }
    console.log('滚动到底部')
  }

  _getDouBanList(page) {
    const _this = this
    Taro.request({
      url: doubanTop,
      data: {
        start: page,
        count: 15,
      },
      header: {
        'content-type': 'json'
      },
      success(e) {
        console.log(e.data)
        _this.setState({
          datas: _this.state.datas.concat(e.data.subjects),
          total: e.data.total,
          loadMore: 'more',
        })
      },
      fail(e) {

      },
      complete() {
        Taro.hideLoading()
      },
    })
  }

  onClickItem(item){
    console.log(item.title)
    Taro.navigateTo({url:'/pages/details/details?id='+item.id+'&title='+item.title})
  }

  render() {
    return (

      <View className="list-box">
        {this.state.datas.map((item, i) => {
          return <View className="item" onClick={(()=>{
           this.onClickItem(item)
          })} key={item.id}>
            <Text className="item-raking">{'No.' + (i + 1)}</Text>
            <View className="item-detail-box">
              <Image className="item-cover" src={item.images.large}></Image>
              <View className="item-detail">
                <Text className="title">{item.title}</Text>
                <View className="rating-box">
                  <AtRate className="rating-bar"
                    size='12'
                    max={5}
                    value={item.rating.average / 2}
                  />
                  <Text className="rating-tv">
                    {item.rating.average + ''}

                  </Text>
                </View>
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
            <View className="item-describe">
              <Text className="item-describe-tv">
                {item.pubdates.join('\n')}
              </Text>
            </View>
          </View>
        })}
        <AtLoadMore
          status={this.state.loadMore}
          moreText=''
          noMoreText='没有更多数据了'
        />
      </View>
    )
  }
}
