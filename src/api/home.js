import axios from 'axios'
import {header, server} from './common'
// ---------------------认证
// 商户认证
export function saveUserAuthBusiness(data) {
  const url = `${server}/act/index/getIndexInfo`
  return axios.post(url, data, {
    headers: header
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
