import axios from 'axios'
import {header, server} from './common'

// 版本号
export function getVersion() {
  const url = `${server}/act/app/isRefreshVersion`
  return axios.post(url, {
		'platform': 1
  }, {
    headers: header
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 默认城市
export function getDefualtCity() {
  const url = `${server}/act/sys/config/list`
  return axios.post(url, {
		'configType': 0
  }, {
    headers: header
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
