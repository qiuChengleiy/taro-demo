/**
 * 全局变量
 */

const globalData = {}

export function set (key, val) {
  globalData[key] = val
  console.log('set_global------->', globalData)
}

export function get (key) {
  console.log('get_global----->', globalData)
  return globalData[key]
}