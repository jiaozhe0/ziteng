export function saveToLocal(value) {
  if (value) {
    let historyTitle = localStorage.__historyTitle__ // seller包含所有不同id的seller
    // 如果还没有创建seller
    if (!historyTitle) {
      historyTitle = []
    } else { // 如果以及创建了seller,但是不同id的seller对象
      historyTitle = JSON.parse(historyTitle)
    }
    historyTitle.unshift(value)
    historyTitle = [...new Set(historyTitle)]
    if (historyTitle.length > 20) {
      historyTitle = historyTitle.slice(0, 20)
    }
    localStorage.__historyTitle__ = JSON.stringify(historyTitle)
  }
};

export function loadFromLocal (id, key, def) {
  let historyTitle = window.localStorage.__historyTitle__
  return historyTitle ? JSON.parse(historyTitle) : []
  // if (!seller) {
  //   return def;
  // };
  // seller = JSON.parse(seller)[id];
  // if (!seller) {
  //   return def;
  // };
  // let ret = seller[key];
  // return ret || def;
}

// export function saveChatToLocal(key, value, flag) {
//   let historyChats = localStorage.__historyChats__ ? JSON.parse(localStorage.__historyChats__) : {}// seller包含所有不同id的seller
//   // 如果还没有创建seller
//   if (!historyChats[key]) {
//     historyChats[key] = {
//       count: 0,
//       list: []
//     }
//   } else { // 如果以及创建了seller,但是不同id的seller对象
//     historyChats[key] = historyChats[key]
//   }
//   historyChats[key]['list'] = historyChats[key]['list'].concat(value)
//   if (flag) {
//     historyChats[key]['count'] += 1
//   } else {
//     historyChats[key]['count'] = 0
//   }
//   localStorage.__historyChats__ = JSON.stringify(historyChats)
// };

// export function getChat(key, def) {
//   let historyChats = localStorage.__historyChats__ ? JSON.parse(localStorage.__historyChats__) : []
//   let ChatList = []
//   if (!(historyChats instanceof Array) && !key) {
//     for (let i in historyChats) {
//       let obj = {
//         id: i,
//         count: historyChats[i]['count'],
//         list: historyChats[i]['list']
//       }
//       ChatList.push(obj)
//     }
//     return ChatList
//   } else if (!(historyChats instanceof Array) && key) {
//      console.log('.....d')
//     return historyChats[key]
//   } else {
//     return []
//   }
// }
export function saveChatToLocal(chatList) {
  console.log(34567, chatList)
  localStorage.__historyChats__ = JSON.stringify(chatList)
}

export function getChat() {
  let historyChats = localStorage.__historyChats__ ? JSON.parse(localStorage.__historyChats__) : []
  console.log(123, historyChats)
  return historyChats instanceof Array && historyChats
}
