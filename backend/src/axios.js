import axios from "axios";
import store from "./store";
import router from "./router/index.js";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    return config;
})

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    if (error.response.status === 401) {
        sessionStorage.removeItem('TOKEN')
        //store.commit('setToken', null)
        router.push({name: 'login'})
    }
    console.error(error);
})

export default axiosClient;
