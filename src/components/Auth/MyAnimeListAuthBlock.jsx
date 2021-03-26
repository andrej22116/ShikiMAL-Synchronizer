import MyAnimeListOauthClient from "../../api/MyAnimeList/MyAnimeListOauthClient";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";
import AuthBlock from "./AuthBlock";
import MenuUserBlock from "./MenuUserBlock";

const oauthClient = new MyAnimeListOauthClient();
oauthClient.logged();

const MyAnimeListAuthBlock = () => (
    <AuthBlock 
        authStore={OauthStore.myAnimeList} 
        authClient={oauthClient} 
        userStore={UserStore.myAnimeList}
    />
);

const MyAnimeListMenuBlock = () => <MenuUserBlock userStore={UserStore.myAnimeList} authClient={oauthClient} />;

export default MyAnimeListAuthBlock;
export {MyAnimeListMenuBlock};