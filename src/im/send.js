const msgTpl = {
	base: {
	    error: false,
	    errorCode: "",
	    errorText: "",
	    // if status is blank, it's treated as "sent" from server side
	    status: "sending", // [sending, sent ,fail, read] 状态
	    id: "", 
	    // from - room id need it,should not be deleted
	    from: "",
	    to: "",
	    toJid: "",
	    time: "",
	    type: "chat", // chat / groupchat
	    body: {},
	    ext: {},
	    bySelf: false
	},
	txt: {
        type: "txt",
        msg: ""
  }
}

// unify message format: local side 本地
// message = {msg:消息, ext: {个人信息}}
function parseFromLocal(to, message = {}, bodyType) {
    let ext = message.ext || {} // 个人信息
    let obj = copy(message, msgTpl.base)
    let body = copy(message, msgTpl[bodyType])
    return {
        ...obj,
        to,
        id: WebIM.conn.getUniqueId(),
        body: {
            ...body,
            ext,
            type: bodyType
        }
    }
}

// unify message format: server side 服务端
export const parseFromServer = (message = {}, bodyType) => {
    let ext = message.ext || {}
    let obj = copy(message, msgTpl.base)
    // all of entities of message should in body, not in base
    // body.ext could save any customize info of message, like image size, width, height etc
    let body = copy(message, msgTpl[bodyType])
    switch (bodyType) {
    case "txt":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                msg: message.data,
                type: "txt"
            }
        }
        break
    case "img":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "img"
            }
        }
        break
    case "file":
        return {
            ...obj,
            status: "sent",
            body: {
                ...body,
                ...ext,
                type: "file"
            }
        }
        break
    }
}

function copy(message, tpl) {
    let obj = {}
    Object.keys(tpl).forEach(v => {
        obj[v] = message[v] || tpl[v]
    })
    return obj
}

// 参数： 对方id 
export function sendTxtMessage (chatId, message = {}) {
        // console.log('sendTxtMessage', chatType, chatId, message)
            const pMessage = parseFromLocal(chatId, message, "txt")
            console.log(12, pMessage)
            const { body, id, to } = pMessage
            const { type, msg, ext } = body
            const msgObj = new WebIM.message(type, id)
            // const chatroom = chatType === "chatroom"
           return new Promise((resolve, reject) => {
           		msgObj.set({
                msg,
                to,
                ext,
                success: function () {
                	resolve(msgObj.body)
                },
                fail: function () {
                }
            })
           		WebIM.conn.send(msgObj.body)
           })
    }

export function sendImage(files, userId, ext) {
        if (files.length > 0) {
            if (/^image\/\w+$/.test(files[0].type)) {
                var blob = files[0]
                var url = window.URL.createObjectURL(blob)
                var id = WebIM.conn.getUniqueId()             // 生成本地消息id
                var msg = new WebIM.message('img', id)  // 创建图片消息
                return new Promise((resolve,reject) => {
                    msg.set({
                    apiUrl: WebIM.config.apiURL,
                    file: {data: blob, url: url},
                    to: userId,                      // 接收消息对象
                    ext: ext,
                    roomType: false,
                    chatType: 'singleChat',
                    onFileUploadError(error) {
                       console.log('error')
                    },
                    onFileUploadComplete(data) {
                        console.log('Complete')
                    },
                    success(id) {
                        resolve(msg.body)
                        console.log('Success')
                    }
                })
                WebIM.conn.send(msg.body)
            })
            }
        }
    }