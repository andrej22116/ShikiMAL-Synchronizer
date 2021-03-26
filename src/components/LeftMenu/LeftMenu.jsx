import React from "react";
import { MyAnimeListMenuBlock } from "../Auth/MyAnimeListAuthBlock";
import { ShikimoriMenuBlock } from "../Auth/ShikimoriAuthBlock";
import "./style/LeftMenu.css";

const LeftMenu = () => {
    return (
        <div className="left-menu" >
            <div className="left-menu-bg"></div>
            <div className="left-menu-items">
                <div>
                    <ShikimoriMenuBlock/>
                    <MyAnimeListMenuBlock/>
                </div>
                <div className="left-menu-items-middle">

                </div>
                <div className="left-menu-items-bottom">

                </div>
            </div>
        </div>
    )
};

export default LeftMenu;