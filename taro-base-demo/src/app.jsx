import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 环境变量获取：

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// 获取小程序实例
console.log(Taro.getApp({allowDefault: true})) 

class App extends Component {

  // 全局配置 - 同小程序  ---- 开发工具配置： project.config.json
  config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    debug: false
  }

  // 相当于onLaunch --- 初始化完成时触发（全局只触发一次） 真机下查看  1 
  componentWillMount() {
    console.log('willMount') 
    console.log(this.$router.params) // 可以访问到程序初始化参数
    // obj{
          // path: "pages/index/index"
          // .....
    // }
  }

  // 加载完毕  2 
  componentDidMount () {
    console.log('didMount') 
  }

  // onShow  3 页面显示或者后台切到前台 
  componentDidShow () {
    console.log('didShow')
  }

  // onHide 
  componentDidHide () {
    console.log('didHide')
  }

  // onError
  componentDidCatchError () {
    console.log('catchError')
  }

  // onPageNotFound
  componentDidNotFound(Object) {
    console.log('page not found')
  }

  // 在 App 类中的 render() 函数没有实际作用 
  // 请勿修改此函数
  // 一般返回程序的第一个页面
  // 但值得注意的是不要在入口文件中的 render 方法里写逻辑及引用其他页面、组件，因为编译时 render 方法的内容会被直接替换掉，
  // 你的逻辑代码不会起作用。
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
