<template>
  <div class="container">
    <div class="header">
      <span class="title">房间列表</span>
      <el-button size="mini" @click="onCreateRoom" style="float: right; margin-right: 10px">创建房间</el-button>
      <el-button size="mini" @click="refresh" style="float: right; margin-right: 10px">刷新</el-button>
    </div>

    <!--    <el-dialog title="选择先后手" :visible.sync="dialog.visible" width="25%">-->
    <!--      <el-form>-->
    <!--        <el-form-item label="执方">-->
    <!--          <el-select v-model="dialog.color">-->
    <!--            <el-option label="黑" :value="0"></el-option>-->
    <!--            <el-option label="白" :value="1"></el-option>-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button type="primary" @click="onDialogConfirm" size="small">确认</el-button>-->
    <!--        <el-button @click="dialog.visible = false" size="small">取消</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

    <el-table :data="roomList" class="scrollbar" :show-header="false">

      <el-table-column label="room">
        <div slot-scope="scope" style="display: inline-block">
          <div v-if="isVisible(scope.row)" :class="getChessClass(scope.row.owner)"></div>
          <div v-if="isVisible(scope.row)" style="float: left">{{ scope.row.owner.nickName }} vs {{ scope.row.challenger.nickName }}</div>
          <div v-if="isVisible(scope.row)" :class="getChessClass( scope.row.challenger)"></div>
        </div>
      </el-table-column>

      <el-table-column align="align:center" prop="roomId">
      </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="onChallenge(scope.row)" v-if="challengeShow(scope.row)">挑战</el-button>
          <el-button size="mini" @click="onSpectate(scope.row)">观战</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import color from "@/constants/color"

import {getRequest} from "@/utils/api";

export default {
  name: "RoomTable",
  data() {
    return {
      dialog: {
        visible: false,
        color: null
      },
      roomList: [],
      time: null
    }
  },
  methods: {
    onCreateRoom() {
      this.dialog.visible = true
    },
    refresh() {
      let api = '/api/game/room/room-list'
      getRequest(api).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.roomList = res.data
        }
      })
    },
    onDialogConfirm() {
      this.dialog.visible = false
      // 创建房间
    },
    getChessClass(player) {
      if (player.turn === color.BLACK.CODE) {
        return 'black'
      } else if (player.turn === color.WHITE.CODE) {
        return 'white'
      }
      return ''
    },
    onChallenge(room) {

    },
    challengeShow(room) {

    },
    onSpectate(room) {

    },
    isVisible(data) {
      return data.owner != null && data.challenger != null
    }
  },
  computed: {
    // roomList() {
    //   return this.$store.getters.roomList
    // }
  },
  mounted() {
    this.timer = setInterval(this.refresh, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>


<style scoped>
.container {
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}

.scrollbar {
  height: calc(70vh);
  min-height: 415px;
}

.header {
  border-bottom: 1px solid lightgrey;
  padding: 2% 0 2% 5%;
}

.title {
  padding-top: 100px;
}
</style>