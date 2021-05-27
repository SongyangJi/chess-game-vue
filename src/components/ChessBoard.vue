<template>
  <el-container>
    <el-header style="height: 20px; display: block; text-align: center">
    </el-header>
    <el-main>
      <canvas :id="roomId" @click="onClick">Your browser doesn't support canvas</canvas>
    </el-main>
    <el-footer style="height: 20px">
    </el-footer>
  </el-container>
</template>

<script>

//canvas边长

import gameState from "@/constants/gameState";
import COLOR from '@/constants/color'
import {Game} from "@/websocket/gameService";

/**
 *
 * 五子棋的棋盘的规则是 15 × 15 的 棋盘，也就是一共有 225 个格点
 *
 *  495 = 15 * 33
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
  props: ['roomId', 'selfRole'],
  data() {
    return {
      gameService: null,
      // canvas 画板
      context: {},
      // 本地下棋记录，两个作用。1.前端控制信息 2. 存储到本地，刷新页面后自动恢复
      steps: [],
      // 本地游戏状态
      localState: null
    }
  },
  methods: {
    initSocket() {
      this.gameService = new Game()
      this.gameService.connectRoom(this.roomId)
      console.log('连接房间' + this.roomId)
    },
    initCanvas() {
      let canvas = document.getElementById(this.roomId);
      canvas.width = side
      canvas.height = side
      this.context = canvas.getContext('2d');
    },
    /**
     *
     * @param e 点击事件
     */
    onClick(e) {

      if (this.selfRole.turn === -1) {
        alert('你是观战者，不可以下棋！')
        return
      }


      if (this.localState == null || this.localState.state !== gameState.RUNNING) {
        if (this.localState == null || this.localState.state === gameState.READY) {
          alert('游戏尚未开始，请先准备')
        }
        return;
      }

      let x = e.offsetX
      let y = e.offsetY
      let i = Math.floor(x / d)
      let j = Math.floor(y / d)

      // 如果没有下过此格点
      if (!this.hasStep(i, j)) {
        console.log('下棋')
        let msg = {
          roomId: this.roomId,
          dot: {
            x: i,
            y: j,
            color: this.selfRole.turn
          },
          opt: "MOVE",
          from: "",
          to: ""
        }
        msg['role'] = this.selfRole

        // console.log('发给服务器的操作信息', msg)
        this.gameService.move(msg)
      }

    },
    /**
     *
     * @param i 棋盘坐标 -- i
     * @param j 棋盘坐标 -- j
     * @param color 颜色
     */
    chess(i, j, color) {
      this.steps.push({i, j, color})
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
    // 初始化画板
    this.initCanvas()
    // 初始化socket连接
    this.initSocket()

  },
  // 初始化时需要加载对局信息，否则一刷新数据就全都丢失
  created() {

  },
  computed: {
    step() {
      return this.$store.getters.newestDotInRoom
    },
    gameState() {
      return this.$store.getters.gameState
    }
  },
  watch: {
    step(step) {
      // 对应房间才更新
      if (step != null && step.roomId === this.roomId) {
        let dot = step.dot
        this.steps.push(dot)
        this.chess(dot.x, dot.y, dot.color)
      }
    },
    gameState(state) {
      // 对应房间才更新
      if (state != null && state.roomId === this.roomId) {
        this.localState = state
      }
    },
    localState(state) {
      switch (state.state) {
        case gameState.RUNNING:
          alert('游戏开始！')
          break
        case gameState.FINISH:
          alert('游戏结束!')
          break
        case gameState.READY:
          break
      }
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