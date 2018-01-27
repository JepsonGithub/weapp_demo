Page({
  data: {
    foo: "Jepson"
  },
  inputChangeHandle( e ) {
    console.log( e );
    // 将页面中的数据同步回数据源上
    // this.data.foo = e.detail.value

    // 1. 改变数据源
    // 2. 通知数据源改变了, 需要重新渲染页面
    this.setData( { foo: e.detail.value } )
  }
})