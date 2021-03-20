import { makeAutoObservable, reaction  } from "mobx";
import ShikimoriApiWrap from "../api/Shikimori/ShikimoriApiWrap";
import IApiWrap from "../api/IApiWrap";
import OauthStore from "./OauthStore";

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
        }
    });
}

const UserStore = {
    shikimori: UserBaseStore(new ShikimoriApiWrap),
    myAnimeList: UserBaseStore(),
};

reaction(
    () => OauthStore.shikimori.isAuthorized,
    () => {
        if ( OauthStore.shikimori.isAuthorized ) {
            UserStore.shikimori.updateUser();
        }
    }
)

export default UserStore;