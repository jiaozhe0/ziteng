import {getServiceTypeList} from './search.js'
import axios from 'axios'
import {header, server} from './common'
import store from '../store'

// 2.5.1.	获取服务类型列表
export function getServiceList(store) {
 return getServiceTypeList().then(data => {
				let serviceType = {}
				let serTypeList = []
				let parTypeList = []
        console.log(1345, data)
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
// 2.5.2.修改服务销售状态
export function updateServiceStatus(data) {
	const url = `${server}/act/service/state/updateServiceStatus`
  return axios.post(url, data, {headers: header(), timeout: 7000}).then((res) => {
    return Promise.resolve(res.data)
  }).catch(() => {
    store.commit('LOADING', false)
  })
}
// 2.5.3.上传服务图片
export function saveServicePicture(data, callback) {
	const url = `${server}/act/service/user/saveServicePicture`
  return axios.post(url, data, {
    headers: header(),
    onUploadProgress(progressEvent) {
      if (progressEvent.lengthComputable) {
        callback(progressEvent)
      }
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.5.4.发布服务
export function saveServiceInfo(data) {
	const url = `${server}/act/service/user/saveServiceInfo`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.5.5.修改服务内容
export function updateServiceInfo(data) {
	const url = `${server}/act/service/user/updateServiceInfo`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取发布服务预约金额
export function getServiceParameter() {
	const url = `${server}/act/service/user/getServiceParameter`
  return axios.get(url, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.5.6.获取我的发布服务列表
export function getCurrentUserServiceList(data) {
	const url = `${server}/act/service/user/getCurrentUserServiceList`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.6.6.获取服务详情
export function getServiceDetails(serviceId, collectionUserId) {
	const url = `${server}/act/service/index/getServiceDetails`
  return axios.post(url, {
		serviceId: serviceId,
		collectionUserId: collectionUserId
  }, {headers: header()}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.6.2.收藏服务
export function saveServiceCollection(data) {
	const url = `${server}/act/service/user/saveServiceCollection`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.6.3.获取收藏服务
export function getServiceCollection(data) {
	const url = `${server}/act/service/user/getServiceCollection`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.6.4.删除收藏服务
export function deleteServiceCollection(id) {
	const url = `${server}/act/service/user/deleteServiceCollection`
  return axios.post(url, {
		serviceCollectionId: id
  }, {headers: header()}).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.5.7.获取其他用户发布服务列表
export function getOtherUserServiceList(data) {
	const url = `${server}/act/service/user/getOtherUserServiceList`
  return axios.post(url, data, {headers: header()}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.7.1.查看用户详细信息
export function getUserAllInfo(data) {
	const url = `${server}/act/user/getUserAllInfo`
  return axios.post(url, {
		userId: data
  }, {headers: header()}).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
