import axios from 'axios';
const LUSHAN_CONFIG = {
	BASE_URL: 'http://10.23.107.96:8081/lushan',
	TIME_OUT: 100000
}

var instance = axios.create({
	baseURL: LUSHAN_CONFIG['BASE_URL'],
	timeout: LUSHAN_CONFIG['TIME_OUT'],
	headers: {
		'Access-Control-Allow-Origin': '*',
		// 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
		'token': localStorage.getItem('logintoken')
	}
})

var fileUploadInstance = axios.create({
	baseURL: LUSHAN_CONFIG['BASE_URL'],
	timeout: LUSHAN_CONFIG['TIME_OUT'],
	headers: {
		'Access-Control-Allow-Origin': '*',
		// 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
		'token': localStorage.getItem('logintoken')
	}
})


const postReqeust =  ( url, params) => {
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
    return fileUploadInstance.get(url, formData).then(res=>res.data)
}

export {
    getRequest,
    putRequest,
    postReqeust,
    deleteRequest,
    fileUploadRequest,
    fileDownloadRequest
}