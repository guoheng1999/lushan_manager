import axios from 'axios';

var BASE_URL_CONFIG = {
  'DEV': 'http://10.23.107.96:8081/lushan',
  'TEST': 'http://106.13.10.209:8849/lushan'
}
const LUSHAN_CONFIG = {
  BASE_URL: BASE_URL_CONFIG['TEST'],
  TIME_OUT: 100000
}


const postRequest = (url, params) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    }
  }).post(url, params).then(res => res.data)
}

const getRequest = (url, params) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    }
  }).get(url, params).then(res => res.data);
}
const putRequest = (url, params) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    }
  }).put(url, params).then(res => res.data)
}
const deleteRequest = (url, params) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    }
  }).delete(url, params).then(res => res.data)
}

const fileUploadRequest = (url, formData) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    },
    responseType: 'blob'
  })
    .post(url, formData).then(res => res.data)
}

const fileDownloadRequest = (url, formData) => {
  return axios.create({
    baseURL: LUSHAN_CONFIG['BASE_URL'],
    timeout: LUSHAN_CONFIG['TIME_OUT'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'token': sessionStorage.getItem('token') || "eFhyenM4STFZd0JrRGc1WlVacHhvNE0wNkJGdTN1SXRVNGJFNHRZeG4vRkRoVXk2S0FRbzFhTVMzYjA2ajJXNQ=="
      'token': sessionStorage.getItem('logintoken') || ''
    },
    responseType: 'blob'
  })
    .post(url, formData).then(res => res)
}

export {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
  fileUploadRequest,
  fileDownloadRequest
}
