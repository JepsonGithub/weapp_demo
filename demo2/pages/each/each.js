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