import axios from 'axios'
import {server} from './common'
export function test() {
	alert('-------------')
	// const url = `${server}/act/app/isRefreshVersion`
	// return axios.post(url, {
	// 	'platform': 1
 //  }).then((res) => {
 //    return Promise.resolve(res.data.data)
 //  })
}

// 版本号
export function getVersion() {
  const url = `${server}/act/app/isRefreshVersion`
  return axios.post(url, {
		'platform': 1
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

