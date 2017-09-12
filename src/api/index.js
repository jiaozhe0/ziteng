import axios from 'axios'
import {header, server} from './common'

// 首页分类推荐
export function getClassifyRecommend() {
  const url = `${server}/act/index/getIndexInfo`
  return axios.get(url, {
    headers: header
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
