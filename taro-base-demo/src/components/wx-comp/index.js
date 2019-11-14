// 原生组件
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
    },
    ready() {
        console.log(this.data.show) // 这是taro传过来的属性值
    },
    methods: {
        click() {
            console.log('wx click') // 这里方法照样可以使用
            this.bindClick() 
        },
        bindClick() {
            console.log('bind Click')
            this.triggerEvent('click','wx bind click')
        }
    }
});
