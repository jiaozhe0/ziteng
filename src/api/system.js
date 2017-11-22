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
  const urls = `${server}/act/wx/getJsSignature`
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
          // 所在城市
          let city = {
            // lng: formatPosition(position.longitude),
            // lat: formatPosition(position.latitude),
            lng: position.longitude,
            lat: position.latitude,
            cityName: result.addressComponents.city,
            province: result.addressComponents.province
          }
          // title: "创展中心", uid: "50f7d146dcc7cfc573210b80", point: H, city: "济南市", Si: "房地产", …
          // 定位
          let map = {}
          if (result.surroundingPois.length) {
            map = {
              title: result.surroundingPois[0].title,
              uid: result.surroundingPois[0].uid,
              ...result.point,
              // point: {
              //   lng: position.longitude,
              //   lat: position.latitude
              // },
              city: result.city
            }
          }
          resolve({city, map})
        })
      })
    })
}

// function formatPosition(num) {
//   let arr = String(num).split('.')
//   return Number(arr[0] + '.' + arr[1].slice(0, 6))
// }
// export function getLocal() {
//   var myCity = new BMap.LocalCity();
//   return new Promise((resolve, reject) => {
//     myCity.get((position) => {
//       let city = {
//         lng: position.center.lng,
//         lat: position.center.lat,
//         cityName: position.name,
//         cityId: position.code
//       }
//       resolve(city)
//     })
//   })
// }
