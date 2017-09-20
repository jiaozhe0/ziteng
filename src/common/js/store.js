export function saveToLocal(value) {
  let historyTitle = localStorage.__historyTitle__ // seller包含所有不同id的seller
  // 如果还没有创建seller
  if (!historyTitle) {
    historyTitle = []
  } else { // 如果以及创建了seller,但是不同id的seller对象
    historyTitle = JSON.parse(historyTitle)
  }
  // historyTitle.push(value)
  historyTitle.forEach((item) => {
    if (item !== value) {
      historyTitle.push(value)
    }
  })
  localStorage.__historyTitle__ = JSON.stringify(historyTitle)
};

export function loadFromLocal (id, key, def) {
  let historyTitle = window.localStorage.__historyTitle__
  return JSON.parse(historyTitle)
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

