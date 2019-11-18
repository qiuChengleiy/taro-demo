import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


export default class List extends Component {
  // 页面配置 --- 对应小程序的页面配置
  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black',
  }

  componentDidMount() {
    console.log(this.$router.params) // {name: 'lili'}
  }

  // 接受preload参数
  componentWillMount () {
    console.log('preload: ', this.$router.preload.key) //  preload data
    console.log(this.$preloadData)
  }

   // 预加载 仅微信小程序支持 --- 注意： 仅相对路径下可用
  //  它接收页面跳转的参数作为参数。可以把需要预加载的内容通过 return 返回，然后在页面触发 componentWillMount 
  //  后即可通过 this.$preloadData 获取到预加载的内容。
   componentWillPreload(params) { 
     console.log(params) // 接收的是页面传来的参数字段
    return {...params, desc: '这是预加载返回的数据'} // 一般返回的是请求的promise
  }

  render () {
    return (
      <View>list component</View>
    )
  }
}