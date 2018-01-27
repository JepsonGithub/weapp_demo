// 创建一个页面实例对象
Page({
  // 页面加载: 这个页面即将要工作了, 适合做页面的数据初始化
  onLoad() {
    console.log("page1 页面加载")
  },
  // 页面进入焦点状态: 说白了就是页面在前台显示了
  onShow() {
    console.log("page1 onShow")
  },
  onHide() {
    console.log("page1 onHide")
  },

  onUnload() {
    console.log("页面被销毁了")
  }
})