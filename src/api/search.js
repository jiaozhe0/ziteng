import axios from 'axios'
import {header, server} from './common'

export function getSearchTitleList(value, cityId, page) {
  const url = `${server}/act/service/hot/searchTitleList`
  return axios.get(url, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 获取搜索热门标签列表
export function getSearchList(value, cityId, page) {
  const url = `${server}/act/service/index/getIndexServiceList`
  return axios.post(url, {
		searchContent: value,
		baiduCityId: cityId,
		pageNum: page,
		uniqueCode: 12333333123123
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data)
  })
}
