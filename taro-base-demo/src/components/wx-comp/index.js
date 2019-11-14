// 原生组件
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
    },
    ready() {
        console.log(this.data.show)
    },
    methods: {
      
    }
});
