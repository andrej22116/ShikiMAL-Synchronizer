import axios from "axios";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";

const ShikimoriApi = new class {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://shikimori.one/api/',
            headers: {
                'User-Agent': 'ShikiMAL-Synchronizer'
            }
        });
        this.axios.interceptors.request.use( config => {
            if ( !OauthStore.shikimori.token ) {
                throw new Error("Invalid token!");
            }
            config.headers['Authorization'] = `Bearer ${OauthStore.shikimori.token}`;
            return config;
        }, error => Promise.reject(error));
    }

    Users = {
        user: id => {
            return this.axios.get(`/users/${id}`).then( response => response.data );
        },

        whoAmI: () => {
            return this.axios.get('/users/whoami').then( response => response.data );
        },

        animeRates: ( params ) => {
            return this.axios.get(`/users/${UserStore.shikimori.id}/anime_rates`, {params}).then( response => response.data );
        }
    }
};

export default ShikimoriApi;