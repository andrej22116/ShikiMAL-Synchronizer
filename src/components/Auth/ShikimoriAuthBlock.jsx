import ShikimoriOauthClient from "../../api/Shikimori/ShikimoriOauthClient";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";
import AuthBlock from "./AuthBlock";
import MenuUserBlock from "./MenuUserBlock";

const oauthClient = new ShikimoriOauthClient();
oauthClient.logged();

const ShikimoriAuthBlock = () => (
    <AuthBlock 
        authStore={OauthStore.shikimori} 
        authClient={oauthClient} 
        userStore={UserStore.shikimori}
    />
);

const ShikimoriMenuBlock = () => <MenuUserBlock userStore={UserStore.shikimori} authClient={oauthClient} />;

export default ShikimoriAuthBlock;
export {ShikimoriMenuBlock};