import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';

// todo sz※ 后端请求地址
const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api' : '线上地址',
});

myAxios.defaults.withCredentials = true; // todo sz※ myAxios配置为true 请求会携带session，重要！

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦'+ config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor  todo sz myAxios的response请求拦截器定义，对于没有登录的请求进行拦截操作
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦'+ response)
    // todo sz※  此处为通过myAxios的相应拦截器，将未登录的请求统一跳转到登录页 。
    // 逻辑是： 在后端的全部方法中定义针对登录状态的判断，请求时如果返回40100，则表示当前请求是未登录下的请求，需要跳转到登录界面。
    if (response?.data?.code === 40100) {
        // 直接通过前端界面跳转方式跳转到登录界面。 将当前被拦截的请求进行保存，在登录成功之后自动跳转到被拦截请求对应的请求页
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
