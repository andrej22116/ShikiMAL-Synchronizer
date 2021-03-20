import {id, secret} from "./secret";
import OauthClient from "../OauthClient";
import axios from "axios";
import OauthStore from "../../store/OauthStore";
import ShikimoriOauthWindow from "./ShikimoriOauthWindow";

export default class ShikimoriOauthClient extends OauthClient {
    constructor() {
        super();
        this.origin = window.location.origin;
        this.axios = axios.create();
        this.axios.defaults.headers.post['User-Agent'] = 'ShikiMAL-Synchronizer';

        this._token = null;
        this.__updateThis();
    }

    get name() { return 'shikimori'; }

    authorize() {
        const url = `https://shikimori.one/oauth/authorize?client_id=${id}&redirect_uri=${this.origin}&response_type=code&scope=`;
        window.emitter.once(`auth-${this.name}`, code => this.__getToken(code));
        return new ShikimoriOauthWindow(this.name, url);
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
        window.localStorage.removeItem('shikimori_r');
        window.localStorage.removeItem('shikimori_at');
        window.localStorage.removeItem('shikimori_in');
        this.__updateThis();
        OauthStore.shikimori.logout();
    }

    async __getToken( code ) {
        const response = await this.axios.post("https://shikimori.one/oauth/token", {
            grant_type: "authorization_code",
            client_id: id,
            client_secret: secret,
            code,
            redirect_uri: this.origin
        }).then( response => response.data );
        
        this.__setToken(response);

        return this._token;
    }

    

    async __refreshToken() {
        if ( !this._refreshToken ) {
            OauthStore.shikimori.logout();
            return null;
        }

        const response = await this.axios.post("https://shikimori.one/oauth/token", {
            grant_type: "refresh_token",
            client_id: id,
            client_secret: secret,
            refresh_token: this._refreshToken
        })
        .then( response => response.data )
        .catch( response => {
            console.error(response);
            OauthStore.shikimori.logout();
        });
        
        this.__setToken(response);

        return this._token;
    }

    __setToken( response ) {
        this._token = response.access_token;
        window.localStorage.setItem('shikimori_r', response.refresh_token);
        window.localStorage.setItem('shikimori_at', response.created_at);
        window.localStorage.setItem('shikimori_in', response.expires_in);
        this._createAt = response.created_at;
        this._expiresIn = response.expires_in;
        this._refreshToken = response.refresh_token;
        setTimeout(() => this.__refreshToken(), (response.expires_in * 1000) / 2);
        OauthStore.shikimori.setToken(this._token);
        OauthStore.shikimori.setAuthorized();
    }

    __updateThis() {
        this._createAt = window.localStorage.getItem('shikimori_at') || 0;
        this._expiresIn = window.localStorage.getItem('shikimori_in') || 0;
        this._refreshToken = window.localStorage.getItem('shikimori_r') || null;
    }
}

/*const ShikimoriAuth = new ClientOAuth2({
    clientId: 'O-qL5TOxgz0oLdszEC9HBpWxaYwdSnUmd8D72or2h0I',
    clientSecret: 'hXeND8Hb4AyBpMBuuyxXqS_6714ZSAyNMKkh_Yp8KGk',
    accessTokenUri: 'https://shikimori.one/oauth/token',
    authorizationUri: 'https://shikimori.one/oauth/authorize?client_id=O-qL5TOxgz0oLdszEC9HBpWxaYwdSnUmd8D72or2h0I&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=user_rates',
    redirectUri: 'https://andrej22116.byethost5.com/'
});*/

//export default ShikimoriAuth;