import {id, secret} from "./secret";
import OauthClient from "../OauthClient";
import axios from "axios";
import querystring from "querystring";
import OauthStore from "../../store/OauthStore";
import MyAnimeListOauthWindow from "./MyAnimeListOauthWindow";

export default class MyAnimeListOauthClient extends OauthClient {
    constructor() {
        super();
        this.codeVerifier = null;
        this.origin = window.location.origin;
        this.axios = axios.create();
        this.axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

        this._token = null;
        this.__updateThis();
    }

    get name() { return 'MyAnimeList'; }

    authorize() {
        this.codeVerifier = this.__makeVerifier();
        const url = `https://myanimelist.net/v1/oauth2/authorize?client_id=${id}`+
                    `&redirect_uri=${this.origin}&response_type=code&state=allok`+
                    `&code_challenge=${this.codeVerifier}&code_challenge_method=plain`;
        window.emitter.once(`auth-${this.name}`, code => this.__getToken(code));
        return new MyAnimeListOauthWindow(this.name, url);
    }

    async token( code = null ) {
        if ( code ) {
            return this.__getToken(code);
        }

        this.__updateThis();
        if ( this._token && (this._createAt + this._expiresIn > + new Date()) ) {
            return this._token;
        }
        
        return this.__refreshToken();
    }

    async refreshToken() {
        this.__updateThis();
        return this.__refreshToken();
    }

    logout() {
        window.localStorage.removeItem('myanimelist_t');
        window.localStorage.removeItem('myanimelist_r');
        window.localStorage.removeItem('myanimelist_at');
        window.localStorage.removeItem('myanimelist_in');
        this.__updateThis();
        OauthStore.myAnimeList.logout();
    }

    async __getToken( code ) {
        const response = await this.axios.post("https://myanimelist.net/v1/oauth2/token", querystring.stringify({
            client_id: id,
            client_secret: secret,
            grant_type: "authorization_code",
            code,
            redirect_uri: this.origin,
            code_verifier: this.codeVerifier
        })).then( response => response.data );
        
        this.__setToken(response);

        return this._token;
    }

    

    async __refreshToken() {
        if ( !this._refreshToken ) {
            OauthStore.myAnimeList.logout();
            return null;
        }

        const response = await this.axios.post("https://myanimelist.net/v1/oauth2/token", querystring.stringify({
            grant_type: "refresh_token",
            client_id: id,
            client_secret: secret,
            refresh_token: this._refreshToken
        }))
        .then( response => response.data )
        .catch( response => {
            console.error(response);
            OauthStore.myAnimeList.logout();
        });
        if ( !response ) {
            return null;
        }
        
        this.__setToken(response);

        return this._token;
    }

    __setToken( response ) {
        const myanimelist_at = + new Date();
        this._token = response.access_token;
        window.localStorage.setItem('myanimelist_t', response.access_token);
        window.localStorage.setItem('myanimelist_r', response.refresh_token);
        window.localStorage.setItem('myanimelist_at', myanimelist_at);
        window.localStorage.setItem('myanimelist_in', response.expires_in);
        this._createAt = response.created_at;
        this._expiresIn = response.expires_in;
        this._expiresAt = myanimelist_at;
        this._refreshToken = response.refresh_token;
        OauthStore.myAnimeList.setToken(this._token);
        OauthStore.myAnimeList.setAuthorized();
        this.__setRefreshTimeout();
    }

    __updateThis() {
        this._token = window.localStorage.getItem('myanimelist_t') || null;
        this._expiresIn = window.localStorage.getItem('myanimelist_in') || 0;
        this._expiresAt = window.localStorage.getItem('myanimelist_at') || 0;
        this._refreshToken = window.localStorage.getItem('myanimelist_r') || null;
        if ( !this.__setRefreshTimeout() ) {
            this.__refreshToken();
        }
    }

    __makeVerifier() {
        let result = '';
        const length = Math.floor(44 + Math.random() * 84); // 44 - 128
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    __setRefreshTimeout() {
        clearTimeout(this._refreshTimer);
        const time = (this._expiresAt + this._expiresIn * 1000) - (+ new Date());
        if ( time < 1000 ) {
            return false;
        }

        //this._refreshTimer = setTimeout(() => this.__refreshToken(), time);
        return true;
    }
}
