import {getServiceTypeList} from './search.js'
import axios from 'axios'
import {header, server} from './common'
// 2.5.1.	获取服务类型列表
export function getServiceList(store) {
 return getServiceTypeList().then(data => {
				let serviceType = {}
				let serTypeList = []
				let parTypeList = []
				data.forEach((item, index) => {
					if (!serviceType[item.parentId] && item.parentId !== 'root') {
						serviceType[item.parentId] = {}
						serviceType[item.parentId]['parentId'] = item.parentId
						serviceType[item.parentId]['typeList'] = []
					}
					if (item.parentId !== 'root') {
						serviceType[item.parentId]['typeList'].push(item)
					} else if (item.parentId === 'root') {
						parTypeList.push(item)
					}
				})
				for (let key in serviceType) {
					serTypeList.push(serviceType[key])
				}
				store.commit('PARENTTYPELIST', parTypeList)
				store.commit('SERVICETYPELIST', serTypeList)
				return Promise.resolve({parTypeList, serTypeList})
	})
}
// 2.6.6.获取服务详情
export function getServiceDetails(serviceId, collectionUserId) {
	const url = `${server}/act/service/index/getServiceDetails`
  return axios.post(url, {
		serviceId: serviceId,
		collectionUserId: collectionUserId
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.6.2.收藏服务
export function saveServiceCollection(serviceId, collectionUserId, serviceUserId) {
	const url = `${server}/act/service/user/saveServiceCollection`
  return axios.post(url, {
		serviceId: serviceId,
		collectionUserId: collectionUserId,
		serviceUserId: serviceUserId
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
