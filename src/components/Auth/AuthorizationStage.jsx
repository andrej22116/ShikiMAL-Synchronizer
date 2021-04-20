import React from "react";
import * as MyAnimeList  from "./MyAnimeList/AuthBlock";
import * as Shikimori from "./Shikimori/AuthBlock";
import "./style/AuthorizationStage.css";

const AuthorizationStage = () => (
    <div className="authorization-stage">
        <div className="authorization-stage-block">
            <div className="authorization-stage-block-header">
                <h1>
                    <span className="auth-colorization-shiki-text-rev">Shiki</span>
                    <span className="auth-colorization-mal-text-rev">mal</span>
                </h1>
                <p>Shikimal - Your personal tool for syncing Shikimori and MyAnimeList anime lists!</p>
            </div>
            <div className="authorization-stage-block-body">
                <div className="shikimori auth-colorization-shiki-bg">
                    <h2 className="auth-colorization-shiki-text"><i className="icon-shikimori"/></h2>
                    <Shikimori.AuthBlock/>
                </div>
                <div className="myanimelist auth-colorization-mal-bg">
                    <h2 className="auth-colorization-mal-text"><i className="icon-mal"/></h2>
                    <MyAnimeList.AuthBlock/>
                </div>
            </div>
            <div className="authorization-stage-block-footer">
            </div>
        </div>
    </div>
);

export default AuthorizationStage;