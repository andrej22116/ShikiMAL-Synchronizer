import OauthClient from "../OauthClient";
import axios from "axios";
import OauthStore from "../../store/OauthStore";
import ShikimoriOauthWindow from "./ShikimoriOauthWindow";
import { reaction } from "mobx";

export default class ShikimoriOauthClient extends OauthClient {
    constructor() {
        super();
        this.axios = axios.create({
            baseURL: `/shikimori/`,
            withCredentials: true
        });

        this._window = null;
    }

    get name() { return 'Shikimori'; }

    login() {
        this._window =  new ShikimoriOauthWindow(this.name, `/shikimori/auth/authorize`);
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
        const response = await this.axios.get("/auth/authorized").then(response => response.data);
        if ( response.logged ) {
            OauthStore.shikimori.setToken("");
            OauthStore.shikimori.setAuthorized();
        }
    }

    logout() {
        this.axios.get('/logout.php').then(response => console.log(response));
        OauthStore.shikimori.logout();
    }
}
