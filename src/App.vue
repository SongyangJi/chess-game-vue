<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


import Login from "@/views/Login"
import Home from "@/views/Home";


export default {
  name: 'App',
  components: {
    Login,
    Home
  },
  mounted() {
    // let url = 'ws://127.0.0.1:8900/topic/room1'
    // socket.connect(url)
    // let msg = {'from': '张三', 'to': '李四'}
    // setTimeout(() => socket.send(JSON.stringify(msg)), 3000)

    // setTimeout(() => this.$store.commit('step', {x: 6, y: 6, color: 0}), 3000)
    // setTimeout(() => this.$store.commit('step', {x: 1, y: 4, color: 1}), 5000)

  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>
