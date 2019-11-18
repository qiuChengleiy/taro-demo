import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

// 样式单独引入
import './index.scss'

// 图片引用
import ImageName from '../../assests/1.jpeg'

// json文件引用
import User from '../../assests/user.json'

// taro 组件引入
import Test from '../../components/test'

// 引入全局变量方法
import { set as setGlobalData, get as getGlobalData } from '../../app.globalData'
// 设置
setGlobalData('test', 1)
// 获取
//getGlobalData('test')

export default class Index extends Component {
  // 页面配置 --- 对应小程序的页面配置
  config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black',
    // 组件方面配置 --- 当使用原生组件的时候  一般来讲taro的组件可以灵活使用 遵循react组件规范
    usingComponents: {
      wxcomp: '../../components/wx-comp/index'
    } //.... 同小程序
  }

  // 若使用全局样式的话 --- 基础库 2.2.3
  static options = {
    addGlobalClass: true
  }

  // 页面加载时触发，一个页面只会调用一次，此时页面 DOM 尚未准备好，还不能和视图层进行交互 1 --- 可以对比 小程序onLoad
  componentWillMount () {
    console.log('页面index willMount')
    // console.log(this.$router.params)  获取路由参数时不要在render方法里拿 
  }

  // 页面初次渲染完成时触发，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互  3  --- 可以对比 小程序onReady
  componentDidMount () { 
    console.log('页面index didMount')
    console.log(this.$componentType) // PAGE --- 判断当前是组件还是页面
  }

  // 页面卸载时触发，如 redirectTo 或 navigateBack 到其他页面时  
  componentWillUnmount () { 
    console.log('页面index willUnMount')
  }
  
  // 页面显示/切入前台时触发  2 --- 可以对比 小程序onShow
  componentDidShow () { 
    console.log('页面index didShow')
  }

  // 页面隐藏/切入后台时触发， 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等
  componentDidHide () { 
    console.log('页面index didHide')
  }

  // 主要用于性能优化 默认返回true 也可以继承 Taro.PureComponent类 无需手动判断
  // 页面是否需要更新，返回 false 不继续更新，否则继续走更新流程

  // 小程序数据 diff（Taro优化）
  // 在真正调用小程序的 setData 方法之前，Taro 会把页面或组件的 state 和当前页面或组件的 data 做一次 diff，
  // 只对必要更新的数据做 setData，开发者无需手动优化。
  shouldComponentUpdate(nextProps, nextState) { }

  // 页面即将更新
  componentWillUpdate(nextProps, nextState) { }
  
  // 页面更新完毕
  componentDidUpdate(prevProps, prevState) { }

  // 以下是小程序的专有事件监听处理函数
  // 监听用户下拉
  onPullDownRefresh() { }

  // 上拉
  onReachBottom() { }

  // 页面滚动
  onPageScroll(Object) { }

  // 页面分享
  onShareAppMessage(Object) { }

  // 小程序屏幕旋转时触发 仅微信小程序支持 2.4.0
  onResize(object) { }

  // 点击tab时触发  仅微信小程序1.9.0
  onTabItemTap(Object) { }

  // 预加载 仅微信小程序支持 --- 注意： 仅相对路径下可用
  componentWillPreload() { }

  // 其它 ...查看文档 https://taro-docs.jd.com/taro/docs/tutorial.html#指定页面

  // 渲染文字组件  不能使用  Array#map 之外的方法操作 JSX 数组 
  // Taro 在小程序端实际上把 JSX 转换成了字符串模板，而一个原生 JSX 表达式实际上是一个 React/Nerv 
  // 元素(react-element)的构造器，因此在原生 JSX 中你可以随意地一组 React 元素进行操作。但在 Taro 中你只能使用 map 方法，
  // Taro 转换成小程序中 wx:for。
  // 记得加上key 不然开发工具会警告

  renderText() {
     return [1,2,3,4].map(item => <Text key={String(item)}>{item}</Text>)
  }

  trigger(prop) { 
    console.log('子组件传来的',prop) 
  }

  click(prop) {
    console.log('原生组件传来的', prop)
    // 原生组件传来的 {type: "click", timeStamp: 5332, target: {…}, currentTarget: {…}, mark: {…}, …}
  }

  // 路由跳转
  route(e) {
    // 调用跳转方法前使用 this.$preload -- 传入要请求的参数
    this.$preload('key', 'preload data')
    // 跳转到目的页面，打开新页面 --- 又返回键
    Taro.navigateTo({
      url: '/pages/list/index?name=123'
    })

    // 跳转到目的页面，在当前页面打开 ---- 没有返回键
    // Taro.redirectTo({
    //   url: '/pages/list/index?name=lili'
    // })
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world! nihao</Text>
        {/* 自定义组件  传递函数的时候要方法名以on开头 官方推荐规范*/}
        {/* 这是因为，微信小程序端组件化是不能直接传递函数类型给子组件的，在 Taro 中是借助组件的事件机制来实现这一特性，
        而小程序中传入事件的时候属性名写法为 bindmyevent 或者 bind:myevent */}

        {/* 
         小程序中： 
        <!-- 当自定义组件触发 myevent 事件时，调用 onMyEvent 方法 -->
        <component-tag-name bindmyevent="onMyEvent" />
        <!-- 或者可以写成 -->
        <component-tag-name bind:myevent="onMyEvent" /> */}

        <Test val='hello props' onTrigger={this.trigger}>
          <view>我是children1</view>
          <view>我是children2</view>
          <view>我是children3</view>
        </Test>

        {this.renderText()}
        {/* <Ajsx /> */}

        {/* 引入微信小程序原生组件  
         1. 这里完全可以按照原生属性的写法 
         2. 值得注意的是如果在原生小程序组件中修改js文件是不会被直接编译的 因为没有涉及到引用， 关闭调式 重新编译即可
         3. 原生组件触发taro组件 事件方法名要以 on开头监听
        */}
        <wxcomp show="{{true}}" onclick={this.click} />

        {/* 路由 跳转 taro中事件以on开头 并用驼峰写法*/}
        <View onClick={e => this.route()}>点击跳转到list页面</View>
        {/* 也可以是网络地址和base64  */}
        <Image src={ImageName}/>
        <View>name:{User.name}  age:{User.age}</View>
        {/* css类名样式 引用外部文件*/}
        <View className="red-text">我是红色字体</View>
        {/* 全局 css类名样式 需要配置*/}
        <View className="blue-text">我是蓝色字体</View>
      </View>
    )
  }
}

// 这种会编译失败  ---- 错误：一个文件只能定义一个 Taro 类或 Taro 函数式组件
// class Ajsx extends Component {
//   render() {
//     return (
//       <View className='index'>
//           Ajsx jsx
//       </View>
//     )
//   }
// }

// 另外jsx对象拓展预算符 也不支持
// 例如 <Text {...props} />

// 不支持 无状态组件
// 例如： 
// function Test() {  return <View /> }  