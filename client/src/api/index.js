import axios from "axios";
import router from "@/router";
import { showToast } from 'vant';

// axios.defaults.baseURL = 'http://8.149.240.91:3000';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json' // 响应

// 请求拦截
axios.interceptors.request.use(req => {
  let jwtToken = sessionStorage.getItem('token')
  if (jwtToken) {
    req.headers.Authorization = jwtToken
  }
  return req
})

// 响应拦截
axios.interceptors.response.use(res => {
  if (res.status !== 200) { // 程序错误
    showToast('服务器异常');
    return Promise.reject(res)
  } else {
    if (res.data.status == 401) {
      showToast(res.data.msg)
      setTimeout(() => { router.push('/login') }, 1000)
      return Promise.reject(res)
    }
    if (res.data.code !== '8000') { // 逻辑性错误
      showToast(res.data.msg);
      return Promise.reject(res)
    }
    return res.data
  }
})

export default axios
