import axios from 'axios'
import {header, server} from './common'
const wxserver = 'http://test.ijzsh.com'
// 发送手机验证码
export function getTelMessage(tel) {
  const url = `${server}/act/loginphone/sendMessage/${tel}`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 校验手机验证码
export function checkPhoneCode(tel, code) {
  const url = `${server}/act/loginphone/checkPhoneCode/${tel}/${code}`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 微信登录
export function registerWeixin(data) {
  const url = `${server}/act/loginweixin/registerWeixin`
  return axios.post(url, data,
  {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2.2.4.微信绑定手机号
export function bindWeixinUserPhone(unionid, tel, code) {
  const url = `${server}/act/loginweixin/bindWeixinUserPhone`
  return axios.post(url, {
		unionid: unionid,
		phoneNumber: tel,
		phoneCode: code
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 2、获取access token信息
export function getToken(code) {
  const url = `${wxserver}/act/wx/user/getToken`
  return axios.post(url, {code: code}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 刷新access token信息
export function refreshToken(token) {
  const url = `${wxserver}/act/wx/user/refreshToken`
  return axios.post(url, {refresh_token: token}, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 3、获取用户信息
export function getUserInfo(accessToken, openid) {
  const url = `${wxserver}/act/wx/user/getUserInfo`
  return axios.post(url, {
			access_token: accessToken,
			openid: openid
		},	{
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 微信登录
export function loginweixin(accessToken, openid) {
  const url = `https://api.weixin.qq.com/cgi-bin/user/info`
  return axios.get(url, {
		params: {
			access_token: accessToken,
			openid: openid,
			lang: 'zh_CN'
		},
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 2.2.5.用户登录日志
export function saveLoginLog(id) {
  const url = `${server}/act/login/user/saveLoginLog`
  return axios.post(url, {
    userId: id,
    systemType: 3
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取用户信息
// export function refreshToken(token) {
//   const url = `${server}/act/wx/user/getUserInfo`
//   return axios.post(url, {
//   	acc_token: token
//   }, {
//     headers: header
//   }).then((res) => {
//     return Promise.resolve(res.data.data)
//   })
// }
