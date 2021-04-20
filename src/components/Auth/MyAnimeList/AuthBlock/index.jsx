import React from "react";
import BaseAuthBlock from "../../BaseAuthBlock";
import OauthStore from "../../../../store/OauthStore";
import UserStore from "../../../../store/UserStore";
import oauthClient from "../AuthClient";
import "./index.css";

export const AuthBlock = () => (
    <BaseAuthBlock
        className="myanimelist-auth-block"
        authStore={OauthStore.myAnimeList}
        authClient={oauthClient}
        userStore={UserStore.myAnimeList}
    />
);