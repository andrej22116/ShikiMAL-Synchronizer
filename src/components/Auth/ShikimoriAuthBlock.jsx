import ShikimoriOauthClient from "../../api/Shikimori/ShikimoriOauthClient";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";
import AuthBlock from "./AuthBlock";

const oauthClient = new ShikimoriOauthClient();
oauthClient.token();

const ShikimoriAuthBlock = () => (
    <AuthBlock 
        authStore={OauthStore.shikimori} 
        authClient={oauthClient} 
        userStore={UserStore.shikimori}
    />
);

export default ShikimoriAuthBlock;