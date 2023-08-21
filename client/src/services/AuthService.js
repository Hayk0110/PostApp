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
        const res = await api.post("/user/logout");
        return res.data;
    }

    static getUser = async (token)=>{
        const user = await api.post("/user/", token)
        return user.data;
    }

    static getUserById = async (userId) =>{
        const user = await api.post("/user/",{userId})
        return user.data;
    }
}