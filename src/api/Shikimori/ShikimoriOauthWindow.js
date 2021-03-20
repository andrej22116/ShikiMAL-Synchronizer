import { autorun } from "mobx";
import OauthStore from "../../store/OauthStore";
import OauthWindow from "../OauthWindow";

export default function ShikimoriOauthWindow( name, url ) {
    const window = new OauthWindow(name, url);
    autorun( () => OauthStore.shikimori.setAuthorizationProcessState(!window.isClosed) );
    return window;
}