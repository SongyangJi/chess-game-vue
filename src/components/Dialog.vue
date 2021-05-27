<template>
  <div class="container">
    <div class="header">
      <span class="title">{{ dialogTitle }}</span>
    </div>
    <div class="scrollbar">
      <div class="line" v-for="(item, index) in messages" :key="index">
        <span style="font-size: xx-small">{{ item.time }}</span>
        <br>
        <span>{{ item.sender }}: {{ item.content }}</span>
      </div>
    </div>
    <div>
      <el-input size="mini" v-model="text" class="input" @keyup.enter.native="onSend"/>
      <el-button size="mini" @click="onSend" class="send-button">发送</el-button>
    </div>
  </div>
</template>

<script>
import {Chat} from "@/websocket/chatService";

export default {
  name: "Dialog",
  props: ['dialogTitle', 'chatRoomId'],
  data() {
    return {
      text: '',
      messages: [],
      chatService:null
    }
  },
  methods: {
    init(){
      this.$store.commit({
        type: 'updateNewestChatMessage',
        from: 'system',
        sender:'系统消息',
        to: this.chatRoomId,
        content: '聊起来吧！',
        time: new Date().toLocaleString('cn',{hour12:false})
      })
      this.chatService = new Chat()
      this.chatService.connectRoom(this.chatRoomId)
      console.log('连接聊天房间' + this.roomId)
    },
    onSend() {
      let message = {
        from: this.$store.getters.uid,
        sender: this.$store.getters.nickName,
        to: this.chatRoomId,
        content: this.text,
        time: null
      }
      this.chatService.send(message)
      this.text = ''
    },
    addDialogMsg(msg) {
      this.messages.push(msg)
    }
  },
  computed: {
    dialogMsg() {
      return this.$store.getters.newestChatMessage
    }
  },
  watch: {
    dialogMsg(chatMessage) {
      if (chatMessage.to == null || chatMessage.to !== this.chatRoomId) return
      this.addDialogMsg(chatMessage)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.container {
  margin-top: 3%;
}

.scrollbar {
  height: calc(69vh);
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