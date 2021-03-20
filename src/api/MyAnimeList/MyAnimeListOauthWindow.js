import { autorun } from "mobx";
import OauthStore from "../../store/OauthStore";
import OauthWindow from "../OauthWindow";

export default function MyAnimeListOauthWindow( name, url ) {
    const window = new OauthWindow(name, url);
    autorun( () => OauthStore.myAnimeList.setAuthorizationProcessState(!window.isClosed) );
    return window;
}