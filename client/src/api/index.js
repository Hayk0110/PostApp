import axios from "axios";
import Cookie from "js-cookie"

const api = axios.create({
    baseURL: "http://localhost:8800/api/"
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookie.get("token")}`
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const res = await axios.get("http://localhost:8800/api/user/refresh", { withCredentials: true });
            Cookie.set("token", res.data.accessToken);
            return api.request(originalRequest);
        } catch (error) {
            console.log("UnAuthorized")
        }
        throw error;
    }
    return Promise.reject(error)
})

export default api;