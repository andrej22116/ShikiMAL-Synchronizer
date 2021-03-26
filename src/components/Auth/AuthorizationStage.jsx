import React from "react";
import MyAnimeListAuthBlock from "./MyAnimeListAuthBlock";
import ShikimoriAuthBlock from "./ShikimoriAuthBlock";
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
                <div className="auth-colorization-shiki-bg">
                    <h2 className="auth-colorization-shiki-text">Shikimori</h2>
                    <ShikimoriAuthBlock/>
                </div>
                <div className="auth-colorization-mal-bg">
                    <h2 className="auth-colorization-mal-text">MyAnimeList</h2>
                    <MyAnimeListAuthBlock/>
                </div>
            </div>
            <div className="authorization-stage-block-footer">
                
            </div>
        </div>
    </div>
);

export default AuthorizationStage;