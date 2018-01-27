# 微信小程序

标签（空格分隔）： 微信小程序


---

[TOC]

## 从业务层面看小程序

小程序的诞生可以让应用无处不在, 随时可用...

微信希望每天各种的需求, 都能通过微信解决

小程序有着服务号一样的功能, 跟应用程序一样的体验

> 总之一句话, 小程序希望实现让应用触手可及


---

## 从技术层面看小程序

小程序不需要下载安装, 可以通过微信打开, 那他是怎么实现的呢?

小程序是要运行在微信内部的, 是微信提供的一个平台, 借助微信这样的运行环境, 所有的用户只要安装了微信, 所有的应用都可以触手可得

> 小程序适合做什么:  用完即走, 不用安装直接使用


---

## 微信小程序初体验

我们会发现小程序自带的样式就是很好看的不需要我们去定制.
本身web端基础样式会丑是由于历史原因, 从一开始出来的时候, 这些控件就很丑.
小程序就不一样了, 他是一个新的平台, 所有样式什么的不受web端基础样式的限制

> 小程序只有思维上的共通, 从技术层面都是不一样的



开发工具下载地址: https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=2018125

- 安装开发工具, 用绑定的微信账号扫一扫

### 基本配置
约定大于配置: 小程序中的开发方式以及文件结构目录, 都是约定好了的, 每个目录什么作用等等, 不需要过多的配置

文档地址: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html
  
  
- 全局配置
 + 配置顶部导航条文字:  ` "navigationBarTitleText": "哈哈"  ` 
 + 配置 bar颜色: `"navigationBarTextStyle":"white"` 只支持 白色 和 黑色
 + 配置下拉刷新 `"enablePullDownRefresh"`  boolean
 + 配置debug 为 true, 会多很多 log 输出

    **tips: 页面的配置会优先于全局的配置**

- 页面配置
    + 页面中的配置, 只能配置窗口相关的配置
    + view 相当于div, text 相当于 span
    
```
    <view><text>hello 大家好, 我是微信小程序</text></view>
    <view><text>hello 大家好, 我是微信小程序</text></view>
```

- 标签栏配置  tabBar

```
"tabBar": {
    "list": [{
      "pagePath": "pagePath",  // 导航的页面
      "text": "text",   // 显示的文本
      "iconPath": "iconPath",  // 配置的图标目录, 但是不能是网络地址, 必须是相对目录
      "selectedIconPath": "selectedIconPath" // 配置选中的图标
    }]
  }
```
tabBar 至少存在两项, 这很好记, 只有一个 tabBar 也没什么意义

如果当前页面没有配置在 tabBar 中, 那么他下面就不会显示 tabBar


--- 

## demo1 - 逻辑层的js
注意: 在小程序中, 没有 window
因为所谓的 bom 和 dom 都是相对有浏览器这个平台而言的, 所以在小程序这个平台中是没有 window的

### 应用的生命周期

```
// 采用的是 common.js 的规范
// 小程序中每一个js文件都有单独的作用域
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
    console.log( message )
  },
  
  // 可以添加任意的从成员, app对象在全局是共享的, 
  // 通过 getApp() 可以用来获取全局的app应用程序实例对象
  foo: "bar"
})
```
- 可以通过 onShow 判断 options 中的 scene编号, 来判断当前是通过哪种方式进行小程序的, 用以做不同的处理
- app对象是全局共享的, 添加的成员, 将来通过 getApp() 方法可以直接获取到 app 应用程序实例对象

### 页面的生命周期

```
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
```


---


## demo2 

### 数据绑定和 wxs

```
Page({
  // 数据源
  data: {
    // 这个对象里面的属性, 在整个页面中都可以访问到
    message: "hello world"
  }
})
```

```
<view class="container">
  <!-- mustance 小胡子语法, 专门用来输出逻辑层暴露的数据  -->
  <text>{{ message }}</text>
  <!-- mustance 可以作用在元素的 内容 和 属性上  -->
  <input value='{{ message }}'></input>

  <!-- 写在小程序内 wxml 中的值, 属性值在双引号内部, 永远是字符串  -->
  <checkbox checked="checked"></checkbox>

  <!-- 想要传一个真正意义上的 false  -->
  <!-- mustance 可以用于声明有类型的值  -->
  <checkbox checked="{{ false }}"></checkbox>
</view>
```

**tips**: 数据源只能暴露数据, 不能暴露函数, 就算在数据源中写了函数, 在页面中也是无法调用的, 这跟我们传统的 vue 中的写法, 就有区别了, 要注意!!!

```
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
```

那么如何在视图层定义一个函数呢 ?
wxs 标签类似于咱们 js 中的 script 标签, 可以定义一些行内脚本, 这里的代码必须遵循 commonjs 规范

```
<view class="container">
  <!-- mustance 小胡子语法, 专门用来输出逻辑层暴露的数据  -->
  <text>{{ message }}</text>
  <!-- mustance 可以作用在元素的 内容 和 属性上  -->
  <input value='{{ message }}'></input>

  <!-- 写在小程序内 wxml 中的值, 属性值在双引号内部, 永远是字符串  -->
  <checkbox checked="checked"></checkbox>

  <!-- 想要传一个真正意义上的 false  -->
  <!-- mustance 可以用于声明有类型的值  -->
  <checkbox checked="{{ false }}"></checkbox>

  <input value='{{ foo.addPostfix( message ) }}'></input>

</view>

<!-- wxs  -->
<!-- wxs 标签类似于咱们 js 中的 script 标签, 可以定义一些行内脚本, 这里的代码必须遵循 commonjs 规范 -->
<wxs module="foo">
  // 这里可以导出一个对象, 这个对象可以在页面中直接使用
  // 通过 commonjs 规范导出成员
  module.exports = {
    addPostfix: function( input ) {
      return input + "$$$wxs"
    }
  }
</wxs>
```

---


### 控制属性(条件渲染)
#### wx:if   wx:elif  wx:else
```
Page({
  data: {
    isLoading: true
  },

  onReady() {
    setTimeout(() => {
      this.setData({ isLoading: false } )
    }, 2000);
  }
})
```

```
<!-- 注意: 在小程序中, 就算在 wx:if 里面, 也要使用小胡子语法 {{}}  -->
<view wx:if="{{ isLoading }}">
  <text>loading...</text>
</view>

<!-- <view wx:elif=""></view> -->

<view wx:else>
  <text>load done</text>
</view>
```

> tips:  上面这种做法虽然可以, 但是这样做不太好, 

> 对于频繁需要切换显示状态的元素, 不应该用 wx:if, 应该用 hidden

#### hidden

hidden 根据boolean 值, 切换显示隐藏状态, 相对于上面wx:if这种操作方式, 性能效率更高

```
<view hidden="{{ !isLoading }}">
  <text>loading...</text>
</view>

<view hidden="{{ isLoading }}">
  <text>load done</text>
</view>

```


#### block 包装元素
block 只是一个包装元素, 不会页面中已经存在的其他元素结构造成影响

```
<view>
  <!-- block 只是一个包装元素, 不会对页面中的元素有影响 -->
  <block wx:if="{{ isLoading }}">
    <text> hello </text>
    <text> world </text>
  </block>
  <text>不要隐藏我</text>
</view> 
```

---

### 控制属性(列表渲染)
#### wx:for
```
Page({
  data: {
    students: [
      { id: 1, name: "张三", age: 18 },
      { id: 2, name: "李四", age: 20 },
      { id: 3, name: "王五", age: 24 },
      { id: 4, name: "赵六", age: 15 },
      { id: 5, name: "田七", age: 32 },
      { id: 6, name: "王八", age: 35 }
    ]
  }
})
```
wx:for 默认遍历后, 通过 item 访问单项, index 访问索引
```
<view>
  <view wx:for="{{ students }}">
    <!-- 默认约定通过 item 访问单项, index 访问索引  -->
    <text>索引: {{ index }}, </text>
    <text>name: {{ item.name }}, </text>
    <text>age: {{ item.age }}</text>  
  </view>
</view>
```

当然也是可以定制的, 通过 wx:for-item 可以自定义 item 
通过 wx:for-index 可以自定义 index

```
<view>
  <view wx:for="{{ students }}" wx:for-item="v" wx:for-index="i">
    <!-- 默认约定通过 item 访问单项, index 访问索引  -->
    <!-- 也可以通过 wx:for-item="", wx-for-index="" 定制  -->
    <text>索引: {{ i }}, </text>
    <text>name: {{ v.name }}, </text>
    <text>age: {{ v.age }}</text>  
  </view>
</view>
```

- Now you can provide attr "wx:key" for a "wx:for" to improve performance.
- 下面一般会弹出一个警告, wx:key 可以用来提高性能

--- 

#### wx:key
我们在数据源中数组中的每个元素其实跟页面中列表的每一行, 其实是对应上的, 后期一旦动态改变了数组源, 页面中肯定也会变
所以应该存在一一对应关系

![wx:key对应关系1][1]

现在勾选上了李四和王五, 然后我们通过 push 往数组中加东西是没问题的, 但是如果通过 unshift 来在上面加一两项以后

**结果令人震惊!!! 选中的元素错位了, 我选的明明是李四和王五, 现在对应关系却变了**

![wx:key对应关系2][2]

代码如下: 

```
<view>
  <view wx:for="{{ students }}">
    <checkbox />
    <text>{{ item.name }}</text>
  </view>
</view>

<button bindtap='addItemHandle'>添加一条数据</button>
```

```
Page({
  data: {
    students: [
      { id: 1, name: "张三", age: 18 },
      { id: 2, name: "李四", age: 20 },
      { id: 3, name: "王五", age: 24 },
      { id: 4, name: "赵六", age: 15 },
      { id: 5, name: "田七", age: 32 },
      { id: 6, name: "王八", age: 35 }
    ]
  },

  // 页面对象上除了可以定义 生命周期的钩子函数外 还可以定义任何其他函数
  // 这些函数可以作为视图层(界面层) 的事件处理函数
  addItemHandle() {
    const students = this.data.students;
    let lastId = students[ students.length - 1 ].id + 1
    // students.push({ id: lastId, name: "鹏鹏" + Math.random(), age: 20 })
    students.unshift({ id: lastId, name: "鹏鹏" + Math.random(), age: 20 })
    this.setData( { students } )
  }
})
```

页面中的元素希望实现一一对应的话就需要通过 v:key 来加一个唯一标识

**而且, 写法也要注意, wx:key 中写的是遍历单项中的属性名字!!! 大坑!!!**

```
<view>
  <!-- 注意: wx:key 中写的是遍历单项中的属性名字  -->
  <!-- 如果值本身就不是对象, 没属性成员, 可以通过 *this 这个保留值, 
       让自己作为key, 去指定当前被遍历的元素, (这语法真是醉了...)  -->
  <view wx:for="{{ students }}" wx:key="id">
    <checkbox />
    <text>{{ item.name }}</text>
  </view>
</view>

<button bindtap='addItemHandle'>添加一条数据</button>

```


---

## demo3
### 事件处理
官网地址: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html

在组件中绑定一个事件处理函数。
如bindtap，当用户点击该组件的时候会在该页面对应的Page中找到相应的事件处理函数
```
<view bindtap="viewTapHandle">
  <button bindtap="tapHandle">Click me</button>
</view>
```
**默认会事件冒泡**
```
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
```

不想冒泡, 正常以前的方法(e.stopPropagation, return false)不会起作用了, 需要使用新的关键字
**catchtap 代替 bindtap 绑定事件, 就不会冒泡了**

```
<view catchtap="viewTapHandle">
  <button catchtap="tapHandle">Click me</button>
</view>
```

- 通过 data-...  来传递值
- 可以通过 data- 属性给事件处理函数, 传递额外的参数
```
<view>
  <text>item 1</text>
  <button data-id="1" bindtap='removeHandle'>remove</button>
</view>
<view>
  <text>item 2</text>
  <button data-id="2" bindtap='removeHandle'>remove</button>
</view>
<view>
  <text>item 3</text>
  <button data-id="3" bindtap='removeHandle'>remove</button>
</view>
<view>
  <text>item 4</text>
  <button data-id="4" bindtap='removeHandle'>remove</button>
</view>
<view>
  <text>item 5</text>
  <button data-id="5" bindtap='removeHandle'>remove</button>
</view>
```



### 单项数据流

```
<text>{{ foo }}</text>

<!-- 文本框发送变化时触发  -->
<input value="{{ foo }}" bindinput="inputChangeHandle"></input>
```

```
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
```


### WXSS
weui 有一套专门针对小程序做的 ui 地址: https://weui.io/
正常和 css 一样写就可以了
```
/* pages/wxss/wxss.wxss */

// 导入 wxss 文件
@import "../../common.wxss"

.box {
  width: 50%;
  height: 400px;
  background-color: pink;
}
```



  [1]: http://static.zybuluo.com/JepsonCC/0itc0augj3km1zw9ciz2nlix/image_1c4rgt7lv1d1irv41ovoae6lec9.png
  [2]: http://static.zybuluo.com/JepsonCC/x3oxomukswnrxe2x0aa8srsp/image_1c4rh4m5v1mma1din19g11j4n19nqm.png