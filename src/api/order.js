import axios from 'axios'
import {header, server} from './common'
import store from '../store'
// 2.8.1.获取系统预约时间规则
export function getAppointmentTime(data) {
  const url = `${server}/act/order/appointmentTime`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.8.2.下订单接口
export function placeOrder(data) {
  const url = `${server}/act/order/placeOrder`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.8.3.获取订单状态（精简)
export function getStatus(id) {
  const url = `${server}/act/order/status`
  return axios.post(url, {
    orderId: id
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.8.5.获取订单列表提醒数
export function getListRemind(id) {
  const url = `${server}/act/order/listRemind`
  return axios.post(url, {
    userId: id
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.8.4.订单详情
export function getDetail(data) {
  const url = `${server}/act/order/detail`
  return axios.post(url, data, {
    headers: header(),
    timeout: 7000
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(() => {
    store.commit('LOADING', false)
  })
}
// 2.8.6.获取购买订单列表
export function getBuyOrderList(data) {
  const url = `${server}/act/order/purchase/list`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 2.8.7.获取售出的订单列表
export function getSellOrderList(data) {
  const url = `${server}/act/order/sell/list`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.8.8.获取订单取消原因列表
export function cancelReasons(type) {
  const url = `${server}/act/order/cancelReasons/${type}`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.8.9.服务者接单
export function receiveOrder(data) {
  const url = `${server}/act/order/receiveOrder`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.8.9.服务者拒单
export function refuseOrder(data) {
  const url = `${server}/act/order/refuseOrder`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.8.11.用户取消订单
export function cancelOrder(data) {
  const url = `${server}/act/order/cancelOrder`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.8.12.用户完成订单
export function finishOrder(data) {
  const url = `${server}/act/order/finishOrder`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// --------------------支付模块----------------------
// 2.9.3.获取微信公众号支付接口
export function wxMpPayInfo(data) {
  const url = `${server}/act/order/wxMpPayInfo`
  return axios.post(url, data, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 2.9.2.获取微信支付接口
export function wxPayInfo(id) {
  const url = `${server}/act/order/wxPayInfo`
  return axios.post(url, {
    orderId: id
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
