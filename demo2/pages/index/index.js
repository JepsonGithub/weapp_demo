Page({
  // 数据源
  data: {
    // 这个对象里面的属性, 在整个页面中都可以访问到
    message: "hello world",

    // 注意: 数据源只能暴露数据, 不能暴露函数, 这样写在页面中也拿不到这个方法!!!
    addPofix( input ) {
      return input + "$$"
    }
  }
})