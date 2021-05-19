import opt from "@/constants/chessOperations"
import handler from "@/websocket/messageHandler"

let ws = null

export default {
    connect(url) {
        ws = new WebSocket(url)
        ws.onopen = onOpen
        ws.onclose = onClose
        ws.onerror = onError
        ws.onmessage = onMessage
    },
    send(data) {
        ws.send(data)
    }
}

function onOpen(e) {
    console.log('websocket 打开', e)
}


function onClose(e) {
    console.log('websocket 断开: ', '错误状态码', e.code, '断开原因', e.reason, '是否正常断开', e.wasClean,)
    console.log(e)
}


function onMessage(e) {
    console.log('收到消息 ', e)
    let data = e.data
    console.log('socket信息', data)
    switch (data.opt) {
        case opt.STEP:
            handler.showStep(data)
            break
        case opt.OVER:
            handler.gameOver(data)
            break
        default:
            break
    }
}

function onError(e) {
    console.log('websocket 异常', e)
}


// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    ws.close();
}
