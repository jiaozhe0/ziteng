import axios from 'axios'
import {header, server} from './common'
// 2.10.5.按分类获取评价列表
export function getEvaluateList(data) {
  const url = `${server}/act/evaluate/list`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.10.6.获取评价统计数
export function getEvaluateStatistics(data) {
  const url = `${server}/act/evaluate/statistics`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.10.1.获取评价标签列表
export function getTypes(data) {
  const url = `${server}/act/evaluate/types`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

//  2.10.3.保存评价
export function saveEvaluate(data) {
  const url = `${server}/act/evaluate/saveEvaluate`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.10.2.保存评价图片
export function saveEvaluatePic(data, callback) {
  const url = `${server}/act/evaluate/saveEvaluatePic`
  return axios.post(url,
    data, {
    headers: header(),
    onUploadProgress(progressEvent) {
      if (progressEvent.lengthComputable) {
        callback(progressEvent)
      }
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
