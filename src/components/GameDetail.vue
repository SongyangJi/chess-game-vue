<template>
  <div class="container">

    <el-container>
      <el-header>
        <div class="header">
          <span class="title">对局信息</span>
        </div>
      </el-header>
      <el-main>

        <el-row>
          <el-col :span="12" :offset="8">
            <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <div>我的昵称</div>
          </el-col>
          <el-col :span="12">
            <div>{{ selfRole.nickName }}</div>
          </el-col>

        </el-row>


        <el-row>
          <el-col :span="12">
            <div v-if="selfRole.turn===0">房主</div>
            <div v-else-if="selfRole.turn===1">挑战者</div>
            <div v-else>观战者</div>
          </el-col>
          <el-col :span="12">
            <div v-if="selfRole.turn===0">黑方</div>
            <div v-else-if="selfRole.turn===1">白方</div>
          </el-col>
        </el-row>

        <el-divider></el-divider>

        <el-row>
          <el-col :span="12">
            点击准备
          </el-col>
          <el-col :span="12">
            <el-button type="success" icon="el-icon-check" circle @click="setReady"></el-button>
          </el-col>
        </el-row>


      </el-main>
    </el-container>
  </div>
</template>

<script>

import {postRequest} from "@/utils/api";

export default {
  name: "GameDetail",
  props: ['roomId', 'selfRole'],
  methods: {
    setReady() {
      let api = '/api/game/room/' + this.roomId
      postRequest(api, this.selfRole).then(res=>{
        if(res.status === 200) {
          alert('已准备，等待游戏开始！')
        }
      }).catch(
      )
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 3%;
}

.scrollbar {
  height: calc(60vh);
  min-height: 180px;
}

.header {
  border-bottom: 1px solid lightgrey;
  padding: 2% 0 2% 5%;
}

.title {
  padding-top: 100px;
}

.line {
  margin-top: 5px;
  margin-left: 3%;
  font-size: small;
}

.input {
  width: 80%;
}

.send-button {
  width: 20%;
}
</style>