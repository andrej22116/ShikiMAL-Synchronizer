import MyAnimeListOauthClient from "../../api/MyAnimeList/MyAnimeListOauthClient";
import OauthStore from "../../store/OauthStore";
import UserStore from "../../store/UserStore";
import AuthBlock from "./AuthBlock";

const oauthClient = new MyAnimeListOauthClient();
oauthClient.token();

const MyAnimeListAuthBlock = () => (
    <AuthBlock 
        authStore={OauthStore.myAnimeList} 
        authClient={oauthClient} 
        userStore={UserStore.myAnimeList}
    />
);

export default MyAnimeListAuthBlock;