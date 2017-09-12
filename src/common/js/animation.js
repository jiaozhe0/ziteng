export const requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function(callback) {
		return window.setTimeout(callback, 1000 / 60) // shoot for 60 fps
  }
})()
