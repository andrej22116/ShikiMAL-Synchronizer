import axios from "axios";
import EventEmitter from "events";
import OauthStore from "../../store/OauthStore";

const ShikimoriApi = new class {
    /**
     * 
     * @param {OauthClient} oauthClient 
     */
    constructor() {
        this.emitter = new EventEmitter;
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
        whoAmI: () => {
            return this.axios.get('/users/whoami').then( response => response.data );
        }
    }
};

export default ShikimoriApi;