import axios from "axios";
import UserStore from "../../store/UserStore";

const ShikimoriApi = new class {
    constructor() {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: `/shikimori`,
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.axios.interceptors.request.use( config => {
            if ( !UserStore.shikimori.id === 0 ) {
                throw new Error("Invalid token!");
            }
            return config;
        }, error => Promise.reject(error));
    }

    Users = {
        me: async () => {
            return this.axios.get('/user/me').then( response => response.data );
        },

        animeList: async () => {
            return this.axios.get('/anime/library').then( response => response.data );
        }
    }
    Raits = {
        get: async ratesId => {
            return this.axios.get(`/anime/rates/${ratesId}`).then( response => response.data );
        },

        create: async data => {
            return this.axios.post('/anime/rates', data).then( response => response.data );
        },

        update: async (ratesId, data) => {
            return this.axios.patch(`/anime/rates/${ratesId}`, data).then( response => response.data );
        },

        delete: async ratesId => {
            return this.axios.delete(`/anime/rates/${ratesId}`).then( response => response.data );
        }
    }
}();

export default ShikimoriApi;