import React from "react";
import BaseAuthBlock from "../../BaseAuthBlock";
import OauthStore from "../../../../store/OauthStore";
import UserStore from "../../../../store/UserStore";
import oauthClient from "../AuthClient";
import "./index.css";

export const AuthBlock = () => (
    <BaseAuthBlock
        className="shikimori-auth-block" 
        authStore={OauthStore.shikimori}
        authClient={oauthClient}
        userStore={UserStore.shikimori}
    />
);