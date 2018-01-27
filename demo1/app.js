App({
  // 整个应用启动时触发, 只触发一次
  onLaunch: function() {
    console.log("应用启动了")
  },

  // 应用程序显示到屏幕上
  onShow: function( options ) {
    console.log( options );
    console.log( "显示到屏幕上" )
  },

  // 应用程序隐藏到后台触发
  onHide: function() {
    console.log( "屏幕隐藏进入后台了" );
  },

  // 一旦应用程序出错了, 就会触发
  // 注意: onError 只能捕获到运行中的错误
  onError: function( message ) {
    console.log( 123 );
    console.log( message )
  },

  // 可以添加任意的从成员, app对象在全局是共享的, 
  // 通过 getApp() 可以用来获取全局的app应用程序实例对象
  foo: "bar",

  say() {
    console.log( "hello" )
  }
})