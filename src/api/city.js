import axios from 'axios'
import header from './common'

// 城市列表
export function cityList() {
  const url = 'http://test.zitengkeji.com/act/positionbaidu/getCityList'
  return axios.get(url, {
    headers: header
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
