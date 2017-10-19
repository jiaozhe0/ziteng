import axios from 'axios'
import {header, server} from './common'
// 版本号
export function getVersion() {
  const url = `${server}/act/app/isRefreshVersion`
  return axios.post(url, {
		'platform': 1
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

// 默认城市
export function getDefualtCity() {
  const url = `${server}/act/sys/config/list`
  return axios.post(url, {
		'configType': 0
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
// 城市列表
export function cityList() {
  const url = `${server}/act/positionbaidu/getCityList`
  return axios.get(url, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getJsSignature(zturl) {
  const urls = `http://test.ijzsh.com/act/wx/getJsSignature`
  return axios.post(urls, {
    url: zturl
  }, {
    headers: header()
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

export function getLocal() {
    var geolocation = new BMap.Geolocation()
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition(position => {
        resolve(position)
      })
    }).then(position => {
      var point = new BMap.Point(position.longitude, position.latitude)
      var myGeo = new BMap.Geocoder()
      return new Promise((resolve, reject) => {
        myGeo.getLocation(point, function(result) {
          console.log(55, result)
          let city = {
            lng: position.longitude,
            lat: position.latitude,
            cityName: result.addressComponents.city,
            province: result.addressComponents.province
          }
          resolve(city)
        })
      })
    })
}
