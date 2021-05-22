import store from "@/store/index"
import {Socket} from "@/websocket/socket";
import opt from "@/constants/chessOperations"
import gameState from "@/constants/gameState";

let url = 'ws://127.0.0.1:18080/topic/game/'

export function Game() {
    this.roomId = null
    this.service = null
    this.socket = new Socket()

    // 连接房间
    this.connectRoom = function (roomId) {
        this.roomId = roomId
        this.socket.connect(url + roomId)
        this.socket.setMessageHandler(onMessage)
    }
    // 向服务器发送下棋消息
    this.move = function (gameMessage) {
        this.socket.send(gameMessage)
    }
}

// gameMessage
function onMessage(event) {
    let gameMessage = JSON.parse(event.data)
    // console.log(event)
    // console.log(gameMessage)
    switch (gameMessage.opt) {
        case opt.STEP:
            showStep(gameMessage)
            break
        case opt.OVER:
            gameOver(gameMessage)
            break
        default:
            break
    }
}

function showStep(gameMessage) {
    store.commit({
        type: 'updateNewestDotInRoom',
        roomId: gameMessage.roomId,
        dot: gameMessage.dot
    })
}

function gameOver(gameMessage) {
    store.commit({
        type: 'updateGameState',
        roomId: gameMessage.roomId,
        state: gameState.FINISH,
        winner:gameMessage.role
    })
}

