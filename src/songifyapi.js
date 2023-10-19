
import axios from "axios";


const userapi=axios.create({
    baseURL:"https://api.spotify.com/v1/",
});

export const setclienttoken=(token_)=>{
    userapi.interceptors.request.use(async function(config){
        config.headers.Authorization="Bearer "+token_;
        return config;
    })
}
export default userapi
