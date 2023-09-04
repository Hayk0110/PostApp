import api from "../api";

export default class AuthService{
    static login = async (userCredentials) =>{
        const res = await api.post("/user/login", userCredentials, {
            withCredentials: true,
        })
        return res.data;
    } 

    static register = async (userCredentials) => {
        const res = await api.post("/user/registration", userCredentials);
        return res.data;
    }

    static logout = async () =>{
        const res = await api.post("/user/logout", null, {withCredentials: true});
        return res.data;
    }

    static refresh = async ()=>{
        const user = await api.get("/user/refresh", {withCredentials: true});
        return user.data;
    }
}