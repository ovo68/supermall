import axios from 'axios'
//最终方式
export function request(config) {

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000',
    timeout: 5000
  })

  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config;//对请求进行放行
  },error => {

  })

  instance.interceptors.response.use(res=>{
    // console.log(res.data /api/n3)
    return res.data  //return res  进行放行
  },error => {})

  //真正发送网络请求
  return instance(config);


}