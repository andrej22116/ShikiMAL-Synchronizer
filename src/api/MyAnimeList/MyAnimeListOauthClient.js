import OauthClient from "../OauthClient";
import axios from "axios";
import OauthStore from "../../store/OauthStore";
import MyAnimeListOauthWindow from "./MyAnimeListOauthWindow";
import { reaction } from "mobx";

export default class MyAnimeListOauthClient extends OauthClient {
    constructor() {
        super();
        this.axios = axios.create({
            baseURL: `/myanimelist/auth`,
            withCredentials: true
        });

        this._window = null;
    }

    get name() {
        return "MyAnimeList";
    }

    login() {
        this._window = new MyAnimeListOauthWindow(this.name, `/myanimelist/auth/authorize`);
        reaction(
            () => this._window.isClosed,
            () => {
                if ( this._window.isClosed ) {
                    this.logged();
                    this._window = null;
                }
            }
        )
    }

    async logged() {
        const response = await this.axios.get("/authorized").then(response => response.data);
        if ( response.logged ) {
            OauthStore.myAnimeList.setToken("");
            OauthStore.myAnimeList.setAuthorized();
        }
    }

    logout() {
        this.axios.get('/logout');
        OauthStore.myAnimeList.logout();
    }
}
