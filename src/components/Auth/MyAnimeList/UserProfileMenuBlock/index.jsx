import React from "react";
import BaseUserProfileMenuBlock from "../../BaseUserProfileMenuBlock";
import UserStore from "../../../../store/UserStore";
import oauthClient from "../AuthClient";

export const UserProfileMenuBlock = () => (
    <BaseUserProfileMenuBlock
        userStore={UserStore.myAnimeList}
        authClient={oauthClient}
        titleStyleName="icon-mal"
    />
);