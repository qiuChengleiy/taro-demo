import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"

import { get as getGlobalData } from '../../app.globalData'
 // 获取全局变量test --- 需要异步去获取 不然获取不到
setTimeout(() => console.log('全局变量', getGlobalData('test')),3000)

export default class Test extends Component {
  state = {
    context: { }
  }

  // 这里的构造函数和react中还不太一样  这里能获取到的只是默认的属性值
  // 在 Taro 中多出的这一次提前调用，就是为了收集组件的初始化数据，给自定义组件提前生成 data ，以保证组件初始化时能带有数据，
  // 让组件初次渲染正常。
  // 所以，在编码时，需要在处理数据的时候做一些容错处理，这样可以避免在 constructor 与 render 提前调用时出现由于没有数据导致出错的情况。
  constructor(args) {
    super(args)
    console.log('constructor',args) // {color: "red"}
  }

  // 组件加载时触发，一个组件只会调用一次，此时组件 DOM 尚未准备好，还不能和视图层进行交互 1
  componentWillMount() {
    console.log('组件test willMount')
  }

  // 组件初次渲染完成时触发，一个组件只会调用一次，代表组件已经准备妥当，可以和视图层进行交互 3
  componentDidMount() {
    console.log('组件test didMount')
  }

  // 组件卸载时触发 切到后台并不会触发
  componentWillUnmount() {
    console.log('组件test willUnMount')
  }

  // 组件显示 2
  componentDidShow() {
    console.log('组件test didShow')
  }

  // 组件隐藏触发 -- 非组件卸载
  componentDidHide() {
    console.log('组件test didHide')
  }

  // 已经装载的组件接收到新属性前调用
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  // 组件是否需要更新，返回 false 不继续更新，否则继续走更新流程
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps,nextState)
  }

  // 组件即将更新
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps,nextState)
  }

  // 组件更新完毕
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps,prevState)
  }

  render() {
    const {val, color, onTrigger} = this.props //  和react 一样支持通过这样获取到属性值 {val: "hello props", onTrigger: ƒ, color: "red"}
    onTrigger(color)
    console.log('执行的次数  2') // 这里执行了两次 一个是初始化 一个是父组件传值引发的渲染

    return (
        <View>
            <View>test components {val}</View>
            <View>{this.props.children}</View>
        </View>
    
    )
  }
}

// 也可以默认的传属性 --- 推荐设置默认属性 以提高初次渲染性能
Test.defaultProps = {
    color: 'red',
    onTrigger:  () => { }
}

// 组件属性传递注意

// 不要以 id、class、style 作为自定义组件的属性与内部 state 的名称，因为这些属性名在微信小程序小程序中会丢失。

// 组件 state 与 props 里字段重名的问题

// 不要在 state 与 props 上用同名的字段，因为这些字段在微信小程序中都会挂在 data 上。


// JS 编码必须用单引号

// 在 Taro 中，JS 代码里必须书写单引号，特别是 JSX 中，如果出现双引号，可能会导致编译错误。


// 环境变量 process.env 的使用

// 不要以解构的方式来获取通过 env 配置的 process.env 环境变量，请直接以完整书写的方式 process.env.NODE_ENV 来进行使用



