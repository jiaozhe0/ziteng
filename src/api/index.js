import axios from 'axios'
import {header, server} from './common'

// 首页分类推荐
export function getClassifyRecommend() {
  const url = `${server}/act/index/getIndexInfo`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 获取首页推荐服务列表
export function getServiceRecommendList(id) {
  const url = `${server}/act/service/recommend/getServiceRecommendList`
  return axios.post(url,
  {
		baiduCityId: id,
		page: {
			currentPage: 0
		}
  },
  {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
