Page({
  // data
  // on xxx
  // 定义用于界面层的事件处理函数
  data: {},
  tapHandle( e ) {
    // e 是事件参数
    console.log( e )
  },
  viewTapHandle( e ) {
    console.log( "viewHandle----" );
    console.log( e );
  } 
})