import axios from 'axios'
import {header, server} from './common'

export function getSearchTitleList(value, cityId, page) {
  const url = `${server}/act/service/hot/searchTitleList`
  return axios.get(url, {headers: header()}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

export function getSearchList(data) {
  const url = `${server}/act/service/index/getIndexServiceList`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getServiceList(serviceData) {
	let dataObj = {
		uniqueCode: 12333333123123
	}
	let data = Object.assign({}, dataObj, serviceData)
  console.log(900, data)
  const url = `${server}/act/service/index/getIndexServiceList`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getServiceTypeList() {
  const url = `${server}/act/serviceType/getServiceTypeList`
  return axios.get(url, {headers: header()}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
