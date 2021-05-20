import Vue from 'vue'
import Vuex from 'vuex'
import ta from "element-ui/src/locale/lang/ta";

Vue.use(Vuex)
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
export default new Vuex.Store({
    state: {
        dot: {
            x: null,
            y: null,
            color: null
        },
        user: {
            uid: null,
            nickName: null
        },
        game: {
            state: null,
            winner: null
        },
        // 自己创建的房间
        myRoom: null,
        // 首页的房间列表
        roomList: [],
        // 打开的房间 ( room对象数组 )
        tabRooms: [],
        // 当前标签
        currentTab: 'hall'
    },
    getters: {
        dot: state => state.dot,

        // 角色的id、昵称
        uid: state => state.user.uid,
        nickName: state => state.user.nickName,

        gameState: state => state.game.state,
        winner: state => state.game.winner,
        myRoom: state => state.myRoom,
        roomList: state => state.roomList,
        tabRooms: state => state.tabRooms,
        currentTab: state => state.currentTab
    },
    mutations: {
        step(state, dot) {
            state.dot = dot
        },
        setUser(state, user) {
            state.user = user
        },
        updateGameState(state, gameState) {
            state.game.state = gameState
        },
        setWinner(state, winner) {
            state.game.winner = winner
        },
        createMyRoom(state, room) {
            state.myRoom = room
        },
        addRoomTab(state, room) {
            // 去重
            let roomId = room.roomId
            let rooms = state.tabRooms
            for (let r of rooms) {
                if (r.roomId === roomId) {
                    return
                }
            }
            state.tabRooms.push(room)
        },
        changeCurrentTab(state, tabName) {
            state.currentTab = tabName
        }
    },
    actions: {},
    modules: {}
})


