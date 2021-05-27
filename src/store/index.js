import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            uid: null,
            nickName: null
        },

        // 以下很明显都是全局的，使用vuex管理再合适不过

        // 自己创建的房间（因为是不允许创建单个人创建多个房间的）
        myRoom: null,
        // 首页的房间列表
        roomList: [],
        // 当前标签
        currentTab: 'hall',
        // 打开的房间 ( room对象数组 , 格式如下)
        tabRooms: [
            // {
            //     roomId: null,
            //     owner: {
            //         uid: null,
            //         nickName: null,
            //         turn: 0
            //     },
            //     challenger: {
            //         uid: null,
            //         nickName: null,
            //         turn: 1
            //     },
            //     selfRole: {
            //         uid: null,
            //         nickName: null,
            //         turn: null
            //     },
            //     winner: null,
            //     state: null
            // }
        ],
        // 单个对象 {roomId + 局内游戏信息}
        newestDotInRoom: {
            roomId: null,
            dot: null
        },
        gameState: {
            roomId: null,
            state: null, // 枚举量
            winner: null // role 赢家
        },
        newestChatMessage: {
            from: null,
            to: null,
            content: null,
            time: null
        }
    },
    getters: {

        // 游戏房间的对局信息
        gameRoom: (state) => (roomId) => {
            return state.tabRooms.find(room => room.roomId === roomId)
        },

        // 角色的id、昵称
        uid: state => state.user.uid,
        nickName: state => state.user.nickName,

        myRoom: state => state.myRoom,
        roomList: state => state.roomList,

        tabRooms: state => state.tabRooms,
        currentTab: state => state.currentTab,


        newestDotInRoom: state => state.newestDotInRoom,
        gameState: state => state.gameState,

        newestChatMessage: state => state.newestChatMessage

    },
    mutations: {
        setUser(state, user) {
            state.user = user
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
        },

        // 更新某个棋子
        updateNewestDotInRoom(state, newestDotInRoom) {
            state.newestDotInRoom = newestDotInRoom
        },
        // 更新某个对局的状态
        updateGameState(state, gameState) {
            state.gameState = gameState
        },
        updateNewestChatMessage(state, message) {
            state.newestChatMessage = message
        }

    },
    actions: {},
    modules: {}
})


