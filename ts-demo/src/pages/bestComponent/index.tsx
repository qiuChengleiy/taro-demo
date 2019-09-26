import { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

type Props = {
    data: {
        name: string,
        age: number,
    }
}

// 在taro中  ---- 在其他地方引用组件时要注入类型 
// -- taro中的class 和 function 组件一个文件只能一个
export default class StateLessCom extends Component <Props> {
    state = {
        name: 'xiaomin',
        age: 20,
    }

    funcCom(job: string) {
        return <View>{job}</View>
    }

    render() {
        return <View>{this.props.data.name}今年{this.state.age},工作是{this.funcCom('设计师')}</View>
    }
}

// 在 @types/react 类型模块中预定了 type SFC<P>，它是 interface StatelessComponent<P> 的类型别名，并且它预定义了 children 、displayName 和 defaultProps 等属性。
// 所以，我们用不着自己写，可以直接拿来用。
// 无状态组件
// import { SFC } from 'react'
// const StateLessComFunc: SFC<Props> = ({ name, age }) => (
//     <View>我叫{name}，今年{age}</View>
// )

// ------- reactz中
// import React, { MouseEvent, ReactNode } from 'react'
// type Props = { 
//  onClick(e: MouseEvent<HTMLElement>): void
//  children?: ReactNode 
// }
// const Button = ({ onClick: handleClick, children }: Props) => (
//   <button onClick={handleClick}>{children}</button>
// )



// 有状态组件

// 1.初始化一个状态
const initState = { count: 0 }

// 2.定义类型 --- 后边改变会随类型的改变而改变  --- 当前标记为只读类型
type State = Readonly<typeof initState>

// 3.使用时需要显示 标记只读 --- class 内部组件使用
//readonly state: State = initState

// 为什么声明为只读呢？
// 这是因为 React 不允许直接更新 state 及其属性。类似下面的做法是错误的：

//该做法在编译时不会出错，但是会导致运行时错误。通过使用 Readonly 显式地把类型 type State 的属性都标记为只读属性，
//以及声明 state 为只读对象，TypeScript 可以实时地把错误用法反馈给开发者，从而避免错误。
// 由于容器组件 ButtonCounter 还没有任何属性，所以我们把 Component 的第一个泛型参数组件属性类型设置为 object，
// 因为 props 属性在 React 中总是 {}。第二个泛型参数是组件状态类型，所以这里使用我们前面定义的 State 类型。
const increamentCount = (preCount: State) => ({ count: preCount.count + 1 })

export class StateCom extends Component <Object, State> {
    readonly state: State = initState
    
    

    private handleClick = () => this.setState(increamentCount)

    render() {
        const { count } = this.state
        return (
            <>
                <View>{count}</View>
                <Button onClick={this.handleClick}>点击增加</Button>
            </>
        )
    }
}




