// 创建一个页面实例对象
Page({
  data: {},
  // 页面加载: 这个页面即将要工作了, 适合做页面的数据初始化
  onLoad() {
    // this.data.foo = 'hello world'
    this.setData( { foo: "hellow world" } );
    console.log( "index 页面加载" )
  },
  // 页面进入焦点状态: 说白了就是页面在前台显示了
  onShow() {
    console.log( "index onShow" )
  },
  onHide() {
    console.log( "index onHide" )
  },
  // 当页面准备好了, 页面上的数据渲染完成了, 图形界面渲染完了
  onReady() {
    // 只有页面加载完成才可以设置标题
    wx.setNavigationBarTitle({
      title: 'foo',
    })
    console.log( "ready" )
  },

  // 页面卸载: 当页面被销毁掉
  // 正常跳转, 不会销毁, 会一张叠一张, 俗称页面堆栈
  // A 跳到 B, A不会被销毁, 在 B 上面再通过返回键跳回 A, B就被销毁了
  onUnload() {
    // 可以用于在页面卸载之前, 记录保存一些信息
    console.log( "页面被销毁了" )
  }
})