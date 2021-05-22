<template>
  <div class="shadow-container">
    <h2 class="title">快来下五子棋吧！</h2>
    <el-divider/>
    <el-form class="form" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="nickName" placeholder="请输入你的昵称" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">游客登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api"

export default {
  name: "LoginComponent",
  data() {
    return {
      nickName: ''
    }
  },
  methods: {
    login() {
      let api = '/api/visitor/' + this.nickName;
      getRequest(api).then(res => {
        console.log(res.data)
        if (res.status === 200) {
          alert("将进入大厅")
          let user = {
            uid: res.data,
            nickName: this.nickName
          }
          console.log('user info ',user)
          this.$store.commit('setUser', user)
          this.$router.replace({path: '/home'});
        }
      })
    }
  }
}
</script>

<style scoped>
.shadow-container {
  margin: 180px auto;
  width: 25%;
  text-align: center;
  min-width: 400px;
}

.form {
  width: 60%;
  padding: 3% 1% 1% 20%;
}
</style>