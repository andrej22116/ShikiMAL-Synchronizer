import axios from "axios";
import UserStore from "../../store/UserStore";

const ShikimoriApi = new class {
    constructor() {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: 'https://shikimal.tk/shikimori/',
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
            return this.axios.get('/me.php').then( response => response.data );
        },

        animeList: async () => {
            return this.axios.get('/list.php').then( response => response.data );
        }
    }
    Raits = {
        get: async id => {
            return this.axios.get(`/raits.php?id=${id}`).then( response => response.data );
        },

        create: async data => {
            return this.axios.post('/raits.php', data).then( response => response.data );
        },

        update: async (id, data) => {
            return this.axios.patch(`/raits.php?id=${id}`, data).then( response => response.data );
        },

        delete: async id => {
            return this.axios.delete(`/raits.php?id=${id}`).then( response => response.data );
        }
    }
}();

export default ShikimoriApi;