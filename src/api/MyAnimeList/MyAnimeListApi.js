import axios from "axios";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";

const MyAnimeListApi = new class {
    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.myanimelist.net/v2/',
        });
        this.axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
        this.axios.interceptors.request.use( config => {
            if ( !OauthStore.myAnimeList.token ) {
                throw new Error("Invalid token!");
            }
            config.headers['Authorization'] = `Bearer ${OauthStore.myAnimeList.token}`;
            return config;
        }, error => Promise.reject(error));
    }

    Users = {
        userFields: [
            "id",
            "name",
            "picture",
            "gender",
            "birthday",
            "location",
            "joined_at",
            "anime_statistics",
            "time_zone",
            "is_supporter"
        ],
        me: () => {
            return this.axios.get('/users/@me', {
                params: {
                    fields: this.Users.userFields.toString()
                }
            }).then( response => response.data );
        },
        
        animeList: params => {
            return this.axios.get(`/users/${UserStore.myAnimeList.nickname}/animelist`, {
                params
            }).then( response => response.data )
        }
    }
};

export default MyAnimeListApi;