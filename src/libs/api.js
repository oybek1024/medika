import axios from 'axios'

var myAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

var myAuthAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

myAuthAxios.interceptors.request.use(
  config => {
    if (localStorage.getItem('jwt') && localStorage.getItem('jwt') != undefined) {
      config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json, multipart/form-data';
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

myAxios.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status) {
      return Promise.reject(error.response)
    // switch (error.response.status) {
    //   case 401:
    //     return Promise.reject(error.response)
    //     break
    //   case 400:
    //     return Promise.reject(error.response)
    //     break
    // }
    }
  }
)

myAuthAxios.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status) {
      return Promise.reject(error.response)
    // switch (error.response.status) {
    //   case 401:
    //     return Promise.reject(error.response)
    //     break
    //   case 400:
    //     return Promise.reject(error.response)
    //     break
    //   default:
    //     return Promise.reject(error.response)
    //     break
    // }
    }
  }
)

export { myAxios, myAuthAxios }
