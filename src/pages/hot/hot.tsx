import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSearchBar, AtRate, AtLoadMore } from 'taro-ui'
import '../hot/hot.scss'
const doubanHot = 'https://douban.uieee.com/v2/movie/in_theaters'
const doubanTop = 'https://douban.uieee.com/v2/movie/top250'
const doubanSearch = 'https://douban.uieee.com/v2/movie/search?q=%E6%88%98%E7%8B%BC&start=25&count=25'
export default class Hot extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '正在热映',
    enablePullDownRefresh: true,//开启下拉刷新
    backgroundTextStyle: "dark",
    backgroundColor: "#fafcfd",
  }


  state = ({
    loadMore: 'more',
    value: '',
    pageNo: 0,
    datas: [],
    total: 0,
  })
  onChange(value) {
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索')
  }
  //下拉刷新
  onPullDownRefresh() {
    this.setState({ pageNo: 0, datas: [] })
    this._getDoubanList()
  }
  //加载更多
  onReachBottom() {
    Taro.stopPullDownRefresh()
    //判断是否加载完所有的数据
    if (this.state.datas.length < this.state.total) {
      this.setState({
        pageNo: this.state.pageNo += 15,
        loadMore: 'loading'
      })
      this._getDoubanList()

    } else {
      this.setState({
        loadMore: 'noMore'
      })
    }

  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    this._getDoubanList()
    //  this.setState({datas:res.data})
  }
  // 请求热门电影列表
  _getDoubanList() {
    const _this = this
    Taro.request({
      url: doubanHot,
      data: {
        start: this.state.pageNo,
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

      },
    })
  }

  componentDidHide() { }

  render() {
    return (
      <View className="hot-search-box">
        {/* 搜索框 */}
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this, '')}
          onActionClick={this.onActionClick.bind(this)}
        />
        {/* list */}
        <View className='list_box'>
          {this.state.datas.map((item) => {
            return <View className='item' key={item.id}>
              <Image className='cover_image' src={item.images.large}></Image>
              <Text className='title'>{item.title}</Text>
              <View className='rating_box'>
                {item.rating.average > 0 ? <View className='rating_bar'>
                  <AtRate
                    size='12'
                    max={5}
                    value={item.rating.average / 2}
                  />
                </View> : ''}

                <Text className='rating_tv'>{item.rating.average > 0 ? item.rating.average : '暂未上映'}</Text>
              </View>
            </View>
          })}
        </View>
        {/* 加载更多 */}
        <AtLoadMore
          status={this.state.loadMore}
          moreText=''
          noMoreText='已经到底了'>

        </AtLoadMore>
      </View>
    )
  }
}
