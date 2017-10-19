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
export function getEvaluateStatistics(serviceUserId) {
  const url = `${server}/act/evaluate/statistics`
  return axios.post(url, {
		serviceUserId: serviceUserId
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
