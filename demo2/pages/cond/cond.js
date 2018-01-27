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