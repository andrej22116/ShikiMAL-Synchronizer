import { makeAutoObservable, reaction  } from "mobx";
import ShikimoriApiWrap from "../api/Shikimori/ShikimoriApiWrap";
import IApiWrap from "../api/IApiWrap";
import OauthStore from "./OauthStore";
import MyAnimeListApiWrap from "../api/MyAnimeList/MyAnimeListApiWrap";
import ShikimoriApi from "../api/Shikimori/ShikimoriApi";

/**
 * @param {IApiWrap} api 
 */
function UserBaseStore( api ) {
    return makeAutoObservable({
        id: 0,
        nickname: "",
        picSrc: "",
        setUserData( data ) {
            this.id = data.id;
            this.nickname = data.nickname;
            this.picSrc = data.picSrc;
        },
        async updateUser() {
            this.setUserData(await api.user());
        },
        async test() {
            console.log(await api.animeList(1, 20), this.id);
        }
    });
}

const UserStore = {
    shikimori: UserBaseStore(new ShikimoriApiWrap),
    myAnimeList: UserBaseStore(new MyAnimeListApiWrap),
};

reaction(
    () => OauthStore.shikimori.isAuthorized,
    () => {
        if ( OauthStore.shikimori.isAuthorized ) {
            UserStore.shikimori.updateUser();
        }
    }
)
reaction(
    () => OauthStore.myAnimeList.isAuthorized,
    () => {
        if ( OauthStore.myAnimeList.isAuthorized ) {
            UserStore.myAnimeList.updateUser();
        }
    }
)

reaction(
    () => UserStore.shikimori.id,
    () => {
        if ( UserStore.shikimori.id > 0 ) {
            UserStore.shikimori.test();
            ShikimoriApi.Users.user(UserStore.shikimori.id).then( data => console.log(data) );
        }
    }
)
reaction(
    () => UserStore.myAnimeList.id,
    () => {
        if ( UserStore.myAnimeList.id > 0 ) {
            UserStore.myAnimeList.test();
        }
    }
)

export default UserStore;