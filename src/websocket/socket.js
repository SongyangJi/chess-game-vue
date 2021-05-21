/**
 *
 * @constructor
 */

export function Socket() {
    this.ws = null
    this.connect = function (url) {
        this.ws = new WebSocket(url)
        let ws = this.ws
        ws.onopen = onOpen
        ws.onclose = onClose
        ws.onerror = onError
        ws.onmessage = onMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            ws.close();
        }

    }
    this.send = function (data) {
        this.ws.send(JSON.stringify(data))
    }
    this.setOnOpen = function (onopen) {
        this.ws.onopen = onopen
    }
    this.setOnClose = function (onclose) {
        this.ws.onclose = onclose
    }
    this.setOnError = function (onerror) {
        this.ws.onerror = onerror
    }
    this.setMessageHandler = function (handler) {
        this.ws.onmessage = handler
    }
}

/**
 * 几个默认的监听回调方法
 *
 */

function onOpen(e) {
    console.log('websocket 打开', e)
}

function onClose(e) {
    console.log('websocket 断开: ', '错误状态码', e.code, '断开原因', e.reason, '是否正常断开', e.wasClean,)
    console.log(e)
}

function onMessage(e) {
    console.log('收到消息 ', e)
}

function onError(e) {
    console.log('websocket 异常', e)
}

