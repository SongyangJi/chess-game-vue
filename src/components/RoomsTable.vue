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

          <div v-if="showOwner(scope.row)" :class="getChessClass(scope.row.owner)"></div>

          <div v-if="showOwner(scope.row)" style="float: left">
            {{ scope.row.owner.nickName}}
          </div>



          <div v-if="showChallenger(scope.row)" style="float: left">
            {{"-  VS  -"+scope.row.challenger.nickName }}
          </div>
          <div v-if="showChallenger(scope.row)" :class="getChessClass( scope.row.challenger)"></div>

        </div>
      </el-table-column>

      <el-table-column align="align:center">
        <span slot-scope="scope">
          {{ "游戏房间 " + scope.row.roomId }}
        </span>
      </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">

          <el-button size="mini" @click="onChallenge(scope.row)"
                     v-if="showChallengeButton(scope.row)">挑战
          </el-button>

          <el-button size="mini" @click="onInto(scope.row)"
                     v-else-if="showIntoButton(scope.row)">进入
          </el-button>

          <el-button size="mini" @click="onSpectate(scope.row)"
                     v-if="showSpectateButton(scope.row)">观战
          </el-button>

        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import color from "@/constants/color"

import {getRequest, postRequest} from "@/utils/api";

export default {
  name: "RoomTable",
  data() {
    return {
      roomList: [],
      time: null
    }
  },
  methods: {
    // 创建新房间
    onCreateRoom() {
      if (this.$store.getters.myRoom != null) {
        alert('您已经创建了一个房间，不可以创建多个')
        return;
      }
      let api = '/api/game/room'
      getRequest(api).then(res => {
        if (res.status === 200) {

          let roomId = res.data

          alert("创建房间成功" + roomId)
          this.$store.commit('createMyRoom', roomId)

          let role = {
            "uid": this.$store.getters.uid,
            "nickName": this.$store.getters.nickName,
            "turn": 0
          }

          this.setRoomRole(roomId, role)

        } else if (res.status === 204) {
          alert("创建房间失败")
        }

      })
    },
    setRoomRole(roomId, role) {
      console.log('角色', role)
      let api = '/api/game/room/role/' + roomId
      postRequest(api, role).then(res => {
        if (res.status === 200) {
          console.log('房间', roomId, ' ', role, '角色设置成功')
        } else {
          alert("角色设置失败")
        }
      }).catch(
          res => {
            alert("角色设置失败")
          }
      )
    },
    // 刷新房间列表
    refresh() {
      let api = '/api/game/room/room-list'
      getRequest(api).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.roomList = res.data
        }
      })
    },
    getChessClass(player) {
      if (player.turn === color.BLACK.CODE) {
        return 'black'
      } else if (player.turn === color.WHITE.CODE) {
        return 'white'
      }
      return ''
    },
    // 打开标签页并跳转（如果已经打开，则直接跳转）
    openTab(room) {
      this.$store.commit('addRoomTab', room)
      this.$store.commit('changeCurrentTab', room.roomId)
    },
    onInto(room) {
      this.openTab(room)
    },
    onChallenge(room) {
      this.openTab(room)

      let role = {
        "uid": this.$store.getters.uid,
        "nickName": this.$store.getters.nickName,
        "turn": 1
      }

      this.setRoomRole(room.roomId, role)
    },
    onSpectate(room) {
      this.openTab(room)
      // 以观战者身份加入
    },
    showOwner(room) {
      return room.owner != null && room.owner.nickName != null
    },
    showChallenger(room) {
      return room.challenger != null && room.challenger.nickName != null
    },
    showChallengeButton(room) {
      // 有房主且不是自己，且尚无挑战者
      return room.owner != null && this.$store.getters.uid !== room.owner.uid && room.challenger == null
    },
    showSpectateButton(room) {
      let uid = this.$store.getters.uid;
      return room.owner != null && room.challenger != null && room.owner.uid !== uid && room.challenger.uid !== uid;
    },
    showIntoButton(room) {
      return room.owner != null && this.$store.getters.uid === room.owner.uid
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

/*
[
    {
        "roomId": "room1",
        "owner": {
            "uid": "",
            "nickName": "张三",
            "turn": 0
        },
        "challenger": {
            "uid": "",
            "nickName": "李四",
            "turn": 1
        }
    }
]
*/
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
