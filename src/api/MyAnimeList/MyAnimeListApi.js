import axios from "axios";
import UserStore from "../../store/UserStore";

const MyAnimeListApi = new class {
    constructor() {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: 'https://shikimal.tk/myanimelist/',
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.axios.interceptors.request.use( config => {
            if ( !UserStore.myAnimeList.id === 0 ) {
                throw new Error("Invalid token!");
            }
            return config;
        }, error => Promise.reject(error));
    }

    Users = {
        me: () => {
            return this.axios.get('/me.php').then( response => response.data );
        },
        
        animeList: params => {
            return this.axios.get(`/users/${UserStore.myAnimeList.nickname}/animelist`, {
                params
            }).then( response => response.data )
        }
    }
}();

export default MyAnimeListApi;