import axios from 'axios'
import { getToken } from './token'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.response.use((config)=> {
    // 操作这个config 注入token数据
    // 1. 获取到token
    // 2. 按照后端的格式要求去做token拼接
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { request }