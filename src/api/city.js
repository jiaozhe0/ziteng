import axios from 'axios'

// 城市列表
export function cityList() {
  const url = 'http://test.zitengkeji.com/act/positionbaidu/getCityList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
