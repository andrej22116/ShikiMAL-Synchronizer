import axios from "axios";
import UserStore from "../../store/UserStore";

const MyAnimeListApi = new class {
    constructor() {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: `/myanimelist`,
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
        me: async () => {
            return this.axios.get('/user/me.php').then( response => response.data );
        },
        
        animeList: async () => {
            return this.axios.get(`/anime/library`).then( response => response.data );
        },
    }
    Anime = {
        get: async animeId => {
            return this.axios.get(`/anime/rates/${animeId}`).then( response => response.data );
        },

        update: async (animeId, data) => {
            return this.axios.patch(`/anime/rates/${animeId}`, data).then( response => response.data );
        },

        delete: async animeId => {
            return this.axios.delete(`/anime/rates/${animeId}`).then( response => response.data );
        }
    }
}();

export default MyAnimeListApi;