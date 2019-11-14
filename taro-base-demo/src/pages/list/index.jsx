import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


export default class List extends Component {
  // 页面配置 --- 对应小程序的页面配置
  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black',
  }


  render () {
    return (
      <View>list component</View>
    )
  }
}