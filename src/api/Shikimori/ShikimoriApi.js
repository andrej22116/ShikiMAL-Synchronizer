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
        /*user: id => {
            return this.axios.get(`/users/${id}`).then( response => response.data );
        },*/

        me: () => {
            return this.axios.get('/me.php').then( response => response.data );
        },

        /*animeRates: ( params ) => {
            return this.axios.get(`/users/${UserStore.shikimori.id}/anime_rates`, {params}).then( response => response.data );
        }*/
    }
}();

export default ShikimoriApi;