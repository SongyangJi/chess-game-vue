<template>
  <div class="container">
    <div class="header">
      <span class="title">{{ dialogTitle }}</span>
    </div>
    <div class="scrollbar">
      <div class="line" v-for="(item, index) in dialog" :key="index">
        <span style="font-size: xx-small">{{ item.time }}</span>
        <br>
        <span>{{ item.from }}: {{ item.content }}</span>
      </div>
    </div>
    <div>
      <el-input size="mini" v-model="input" class="input" @keyup.enter.native="onSend"/>
      <el-button size="mini" @click="onSend" class="send-button">发送</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Dialog",
  props: ['dialogTitle'],
  data() {
    return {
      input: '',
      dialog: []
    }
  },
  methods: {
    onSend() {
    },
    addDialogMsg(msg) {
    }
  },
  computed: {
    dialogMsg() {

    }
  },
  watch: {
    dialogMsg(newMsg) {
    }
  },
  mounted() {

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