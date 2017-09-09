export function browserTest() {
  if (window.navigator) {
    return true
  } else {
    return false
  }
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
