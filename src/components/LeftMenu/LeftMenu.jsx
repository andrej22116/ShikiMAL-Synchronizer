import React from "react";
import * as MyAnimeList from "../Auth/MyAnimeList/UserProfileMenuBlock";
import * as Shikimori from "../Auth/Shikimori/UserProfileMenuBlock";
import BgImagePathSettingPopup from "./BgImagePathSettingPopup";
import OptionsPopup from "./OptionsPopup";
import "./style/LeftMenu.css";

const LeftMenu = () => {
    return (
        <div className="left-menu" >
            <div className="left-menu-bg"></div>
            <div className="left-menu-items">
                <div>
                    <Shikimori.UserProfileMenuBlock/>
                    <MyAnimeList.UserProfileMenuBlock/>
                </div>
                <div className="left-menu-items-middle">

                </div>
                <div className="left-menu-items-bottom">
                    <OptionsPopup />
                    <BgImagePathSettingPopup />
                </div>
            </div>
        </div>
    )
};

export default LeftMenu;