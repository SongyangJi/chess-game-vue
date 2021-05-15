<template>
  <el-container>
    <el-header style="height: 20px; display: block; text-align: center">
    </el-header>
    <el-main>
      <canvas :id="roomId" @click="onClick()">Your browser doesn't support canvas</canvas>
    </el-main>
    <el-footer style="height: 20px">
    </el-footer>
  </el-container>
</template>

<script>

//canvas边长
const side = 495
// 棋盘格子边长
// const d = 33
//棋盘格子距离棋盘边缘的距离
// const m = d / 2
//棋子半径
// const r = 15

export default {
  name: "ChessBoard",
  props: ['roomId'],
  data() {
    // let canvas = document.getElementById(this.roomId);
    // let context = canvas.getContext('2d');
    return {
      // canvas,
      context: {},
      steps: [],
      myColor: -1,
      // title: this.$t('lang.chessboard.message.clickReady'),
      started: false,
      waitResponse: false
    }
  },
  methods: {
    initCanvas() {
      let canvas = document.getElementById(this.roomId);
      canvas.width = side
      canvas.height = side
      this.context = canvas.getContext('2d');
    },
    onClick(e) {
      let x = e.offsetX
      let y = e.offsetY
      let i = Math.floor(x / d)
      let j = Math.floor(y / d)
      console.log("(i,j)  ", i, j);
    }
  },
  mounted() {
    this.initCanvas();
  },
  computed: {}

}
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
  box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
  cursor: pointer;
  pointer-events: auto;
  background-image: url("../assets/images/chessboard.jpg");
  background-size: 100% 100%;
}
</style>