import OauthClient from "../OauthClient";
import axios from "axios";
import OauthStore from "../../store/OauthStore";
import MyAnimeListOauthWindow from "./MyAnimeListOauthWindow";
import { reaction } from "mobx";

export default class MyAnimeListOauthClient extends OauthClient {
    constructor() {
        super();
        this.axios = axios.create({
            baseURL: "https://shikimal.tk/myanimelist/",
            withCredentials: true
        });

        this._window = null;
    }

    get name() {
        return "MyAnimeList";
    }

    login() {
        this._window = new MyAnimeListOauthWindow(this.name, "https://shikimal.tk/myanimelist/authorization.php");
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
        const response = await this.axios.get("/authorized.php").then(response => response.data);
        if ( response.logged ) {
            OauthStore.myAnimeList.setToken("");
            OauthStore.myAnimeList.setAuthorized();
        }
    }

    logout() {
        this.axios.get('/logout.php');
        OauthStore.myAnimeList.logout();
    }
}
