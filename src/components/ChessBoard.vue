<template>
  <el-container>
    <el-header style="height: 20px; display: block; text-align: center">
    </el-header>
    <el-main>
      <canvas id="board" @click="onClick">Your browser doesn't support canvas</canvas>
    </el-main>
    <el-footer style="height: 20px">
    </el-footer>
  </el-container>
</template>

<script>

//canvas边长

import COLOR from '@/constants/color'

/**
 *
 * 五子棋的棋盘的规则是 15 × 15 的 棋盘，也就是一共有 225 个格点
 *
 *  495 = 15 * 33
 *
 *
 */

const side = 495
// 棋盘格子边长
const d = 33
//棋盘格子距离棋盘边缘的距离
const m = d / 2
//棋子半径
const r = 15

export default {
  name: "ChessBoard",
  data() {
    return {
      // canvas 画板
      context: {},
      steps: [],
      myColor: 0,
      started: false,
      waitResponse: false
    }
  },
  methods: {
    initCanvas() {
      let canvas = document.getElementById("board");
      canvas.width = side
      canvas.height = side
      this.context = canvas.getContext('2d');
    },
    onClick(e) {
      let x = e.offsetX
      let y = e.offsetY
      // console.log("(x,y) ",x,y)
      let i = Math.floor(x / d)
      let j = Math.floor(y / d)
      // console.log("(i,j)  ", i, j)

      // 如果没有下过此格点
      if (!this.hasStep(i, j)) {
        // console.log('下棋')
        this.chess(i, j, this.myColor)
      }

    },
    chess(i, j, color) {
      this.steps.push({i, j})
      this.drawChess(i, j, color)
      // this.drawLabel(i, j)
    },
    /**
     *
     * @param i 棋盘坐标 -- i
     * @param j 棋盘坐标 -- j
     * @param color 颜色
     */
    drawChess(i, j, color) {
      let context = this.context
      context.beginPath()
      context.arc(m + i * d, m + j * d, r, 0, 2 * Math.PI)
      context.closePath()
      if (color === COLOR.BLACK.CODE) {
        context.fillStyle = COLOR.BLACK.COLOR
        context.fill()
      } else if (color === COLOR.WHITE.CODE) {
        context.stroke()
        context.fillStyle = COLOR.WHITE.COLOR
        context.fill()
      }
    },
    /**
     *
     * 画出高亮棋子
     * @param i 坐标
     * @param j 坐标
     */
    drawLabel(i, j) {
      let context = this.context
      context.beginPath()
      context.arc(m + i * d, m + j * d, r / 3, 0, 2 * Math.PI)
      context.closePath()
      context.fillStyle = COLOR.LABEL_COLOR
      context.fill()
    },
    /**
     *
     * 判断格点是否已经被下过棋子
     * @param i 坐标 i
     * @param j 坐标 j
     * @returns {boolean} 已经下过则返回true，没有则返回false
     */
    hasStep(i, j) {
      for (let step of this.steps) {
        if (step.i === i && step.j === j) {
          return true
        }
      }
      return false
    },

  },
  mounted() {
    this.initCanvas();
  },
  computed: {
    step() {
      return this.$store.getters.step
    },
    gameState() {
      return this.$store.getters.gameState
    },
    winner() {
      return this.$store.getters.winner
    }
  },
  watch: {
    step(step) {
      this.chess(step.x, step.y, step.color)
    },
    gameState(gameState) {
      alert("对局状态更新" + gameState)
    },
    winner(winner) {
      alert("赢家是" + winner)
    }
  }
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