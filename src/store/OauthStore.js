import { makeAutoObservable  } from "mobx";

function OauthBaseStore() {
    return makeAutoObservable({
        authorization: false,
        isAuthorized: false,
        setAuthorized() {
            this.isAuthorized = true;
            this.setAuthorizationProcessState(false);
        },
        setAuthorizationProcessState(state) {
            this.authorization = state;
        },
        logout() {
            this.token = null;
            this.isAuthorized = false;
        },
        setToken(token) {
            this.token = token;
        }
    });
}

const OauthStore = {
    shikimori: OauthBaseStore(),
    myAnimeList: OauthBaseStore(),
};

export default OauthStore;