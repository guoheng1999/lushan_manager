import axios from 'axios';
var BASE_URL_CONFIG = {
	'DEV' :'http://10.23.107.96:8081/lushan',
	'TEST' : 'http://106.12.109.129:8849/lushan'
}
const LUSHAN_CONFIG = {
	BASE_URL: BASE_URL_CONFIG['TEST'],
	TIME_OUT: 100000
}

var instance = axios.create({
	baseURL: LUSHAN_CONFIG['BASE_URL'],
	timeout: LUSHAN_CONFIG['TIME_OUT'],
	headers: {
		'Access-Control-Allow-Origin': '*',
		// 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
		'token': sessionStorage.getItem('logintoken') || ''
	}
})

var fileUploadInstance = axios.create({
	baseURL: LUSHAN_CONFIG['BASE_URL'],
	timeout: LUSHAN_CONFIG['TIME_OUT'],
	headers: {
		'Access-Control-Allow-Origin': '*',
		// 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
		'token': sessionStorage.getItem('logintoken') || ''
	},
	responseType: 'blob'
})


const postRequest =  ( url, params) => {
    return instance.post(url, params).then(res => res.data )
} 

const getRequest = (url, params) => {
    return instance.get(url, params).then(res => res.data );
}
const putRequest = (url, params) => {
    return instance.put(url, params).then(res => res.data )
}
const deleteRequest = (url, params) => {
    return instance.delete(url, params).then(res => res.data )
}

const fileUploadRequest = (url, formData) => {
    return fileUploadInstance.post(url, formData).then(res=>res.data)
}

const fileDownloadRequest = (url, formData) => {
    return fileUploadInstance.get(url, formData).then(res=>res)
}

export {
    getRequest,
    putRequest,
    postRequest,
    deleteRequest,
    fileUploadRequest,
    fileDownloadRequest
}