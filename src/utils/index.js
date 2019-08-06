import 'whatwg-fetch'
import React from "react" /*eslint-disable-line */

const SERVER_URL = process.env.SERVER_URL

export function call(url, method, data) {
	const serverUrl = `${SERVER_URL}${url}`
	return fetch(serverUrl, {
		method: method,
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
		.then(parseJSON)
		.then(checkHttpStatus)
		.catch(error => {
			// No response from the server
			if (typeof error.response === 'undefined') {
				error.response = {
					status: 408,
					message: 'Cannot connect to the server'
				}
			}
			throw error
		})
}

export function callUpload(url, method, formData) {
	const serverUrl = `${SERVER_URL}${url}`
	return fetch(serverUrl, {
		method: method,
		credentials: 'include',
		headers: {
			Accept: 'application/json'
		},
		body: formData
	})
		.then(parseJSON)
		.then(checkHttpStatus)
		.catch(error => {
			// No response from the server
			if (typeof error.response === 'undefined') {
				error.response = {
					status: 408,
					message: 'Cannot connect to the server'
				}
			}
			throw error
		})
}

export function fetchImageBase64(url) {
	return fetch(url, {
		method: 'GET',
		credentials: 'include',
	})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				return response.blob()
			}
			else{
				const error = new Error(response.statusText)
				error.status = response.status
				throw error
			}
		})
		.then(blob => {
			const promise = new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(blob)
				reader.onloadend = function() {
					const base64Data = reader.result
					const base64Image = base64Data.replace(/^data:application\/octet-stream/, 'data:image/jpg')
					resolve(base64Image)
		 		}
			})
			return promise
		})
		.catch(error => {
			throw error
		})
}

export function get(url) {
	return call(url, 'GET')
}

export function post(url, data) {
	return call(url, 'POST', data)
}

export function put(url, data) {
	return call(url, 'PUT', data)
}

export function del(url, data) {
	return call(url, 'DELETE', data)
}

export function patch(url, data) {
	return call(url, 'PATCH', data)
}

export function postUpload(url, formData) {
	return callUpload(url, 'POST', formData)
}

export function patchUpload(url, formData) {
	return callUpload(url, 'PATCH', formData)
}

export function checkHttpStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response.body
	} else {
		var error = new Error(response.statusText)
		error.response = response.body
		error.status = response.status
		throw error
	}
}

export function parseJSON(response) {
	return response
		.json()
		.then(function (body) {
			return {
				status: response.status,
				statusText: response.statusText,
				body: body
			}
		})
		.catch(function (e) {
			return response
		})
}

export const storage = {
	get: function (k) {
		return localStorage.getItem(k)
	},
	set: function (k, v) {
		localStorage.setItem(k, v)
	},
	remove: function (k) {
		localStorage.removeItem(k)
	}
}

export const FETCH_STATUS_REQUEST = 'request'
export const FETCH_STATUS_SUCCESS = 'success'
export const FETCH_STATUS_FAILURE = 'failure'
export const FETCH_STATUS_IDLE = 'idle'

export function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = atob(dataURI.split(',')[1])
	else byteString = unescape(dataURI.split(',')[1])

	// separate out the mime component
	var mimeString = dataURI
		.split(',')[0]
		.split(':')[1]
		.split(';')[0]

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length)
	for (var i = 0;i < byteString.length;i++) {
		ia[i] = byteString.charCodeAt(i)
	}

	return new Blob([ia], { type: mimeString })
}

export function detectBrowser() {
	var sBrowser, sUsrAg = navigator.userAgent

	// The order matters here, and this may report false positives for unlisted browsers.

	if (sUsrAg.indexOf('Firefox') > -1) {
		sBrowser = 'Firefox'
		// "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
	} else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
		sBrowser = 'Opera'
		//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
	} else if (sUsrAg.indexOf('Trident') > -1) {
		sBrowser = 'IE'
		// "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
	} else if (sUsrAg.indexOf('Edge') > -1) {
		sBrowser = 'Edge'
		// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
	} else if (sUsrAg.indexOf('Chrome') > -1) {
		sBrowser = 'Chrome'
		// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
	} else if (sUsrAg.indexOf('Safari') > -1) {
		sBrowser = 'Safari'
		// "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
	} else {
		sBrowser = 'unknown'
	}
	return sBrowser
}
