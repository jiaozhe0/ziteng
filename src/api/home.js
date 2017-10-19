import axios from 'axios'
import {header, server} from './common'
// 2.11.1.保存我的地址
export function saveUserAddress(data) {
  const url = `${server}/act/user/saveUserAddress`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.2.修改我的地址
export function updateUserAddress(data) {
  const url = `${server}/act/user/updateUserAddress`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.3.删除我的地址
export function deleteUserAddress(id) {
  const url = `${server}/act/user/deleteUserAddress`
  return axios.post(url, {addressId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.4.获取我的地址
export function getUserAddressList(id) {
  const url = `${server}/act/user/getUserAddressList`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.11.5.获取我的收藏列表
export function getServiceCollectionList(data) {
  const url = `${server}/act/service/user/getServiceCollectionList`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.6.获取我的收藏总数
export function getSerColCount(Id) {
  const url = `${server}/act/service/user/getServiceCollectionCount`
  return axios.post(url, {userId: Id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.11.7.获取我的个人信息
export function getIndexInfo(id) {
  const url = `${server}/act/user/getUserInfo`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.11.9.获取用户钱包总金额
export function getTotal(id) {
  const url = `${server}/act/bill/total`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.11.13.修改我的资料
export function updateUserInfo(data) {
  const url = `${server}/act/user/updateUserInfo`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.14.修改我的头像
export function updateUserInfoPicture(data) {
  const url = `${server}/act/user/updateUserInfoPicture`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.15.上传用户身份证信息
export function saveUserAuthId(data) {
  const url = `${server}/act/user/auth/saveUserAuthId`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.11.16.上传用户专业证书信息
export function saveUserAuthProfessional(data) {
  const url = `${server}/act/user/auth/saveUserAuthProfessional`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.18.获取用户身份证信息
export function getUserAuthId(id) {
  const url = `${server}/act/user/auth/getUserAuthId`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.17.上传商家证书信息
export function saveUserAuthBusiness(data) {
  const url = `${server}/act/user/auth/saveUserAuthBusiness`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.19.获取商户认证信息
export function getUserAuthBusiness(id) {
  const url = `${server}/act/user/auth/getUserAuthBusiness`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.20.获取技能认证信息
export function getUserAuthProfessional(id) {
  const url = `${server}/act/user/auth/getUserAuthProfessional`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.11.21.获取我的认证状态
export function getUserAuthStatus(id) {
  const url = `${server}/act/user/auth/getUserAuthStatus`
  return axios.post(url, {userId: id}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
