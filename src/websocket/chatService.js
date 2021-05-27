import {Socket} from "@/websocket/socket";
import store from "@/store/index"

let url = 'ws://127.0.0.1:18080/topic/chat/'

export function Chat() {
    this.roomId = null
    this.socket = new Socket()

    // 连接房间
    this.connectRoom = function (roomId) {
        this.roomId = roomId
        this.socket.connect(url + roomId)
        this.socket.setMessageHandler(onMessage)
    }
    // 向服务器发送下棋消息
    this.send = function (chatMessage) {
        this.socket.send(chatMessage)
    }
}

// gameMessage
function onMessage(event) {
    let chatMessage = JSON.parse(event.data)
    // console.log('收到聊天消息', chatMessage)
    store.commit('updateNewestChatMessage',chatMessage)
}