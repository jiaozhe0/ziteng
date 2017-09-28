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

// 2.6.3.获取收藏服务
export function getServiceCollection(serviceId, collectionUserId, serviceUserId) {
	const url = `${server}/act/service/user/getServiceCollection`
  return axios.post(url, {
		serviceId: serviceId,
		collectionUserId: collectionUserId
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.6.4.删除收藏服务
export function deleteServiceCollection(serviceId, collectionUserId, serviceUserId) {
	const url = `${server}/act/service/user/deleteServiceCollection`
  return axios.post(url, {
		serviceId: serviceId,
		collectionUserId: collectionUserId
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.5.7.获取其他用户发布服务列表
export function getOtherUserServiceList(data) {
	const url = `${server}/act/service/user/getOtherUserServiceList`
  return axios.post(url, data, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.7.1.查看用户详细信息
export function getUserAllInfo(data) {
	const url = `${server}/act/user/getUserAllInfo`
  return axios.post(url, {
		userId: data
  }, {headers: header}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
