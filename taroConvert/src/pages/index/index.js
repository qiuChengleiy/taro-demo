import { Block, View, Button, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
//index.js
//获取应用实例
const app = Taro.getApp()

@withWeapp({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: Taro.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    Taro.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      Taro.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
class _C extends Taro.Component {
  config = {}

  render() {
    const { hasUserInfo, canIUse, userInfo, motto } = this.data
    return (
      <View className="container">
        <View className="userinfo">
          {!hasUserInfo && canIUse ? (
            <Button openType="getUserInfo" onGetuserinfo={this.getUserInfo}>
              获取头像昵称
            </Button>
          ) : (
            <Block>
              <Image
                onClick={this.bindViewTap}
                className="userinfo-avatar"
                src={userInfo.avatarUrl}
                mode="cover"
              ></Image>
              <Text className="userinfo-nickname">{userInfo.nickName}</Text>
            </Block>
          )}
        </View>
        <View className="usermotto">
          <Text className="user-motto">{motto}</Text>
        </View>
      </View>
    )
  }
}

export default _C
