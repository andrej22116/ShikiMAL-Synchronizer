import React from "react";
import "./style/MenuUserBlock.css";

const MenuUserBlock = ({userStore, authClient}) => {
    return (
        <div className="menu-user-block" >
            <div className="menu-user-block-base-img menu-user-block-img-wrap">
                <img src={userStore.picSrc} alt={userStore.nickname}/>
            </div>
            <div className="menu-user-block-overlay">
                <div className="menu-user-block-overlay-img menu-user-block-img-wrap">
                    <img src={userStore.picSrc} alt={userStore.nickname} title={userStore.nickname}/>
                </div>
                <div className="menu-user-block-overlay-info">
                    <p title={userStore.nickname}>{userStore.nickname}</p>
                    <button onClick={() => authClient.logout()}>Logout</button>
                </div>
            </div>
        </div>
    )
};

export default MenuUserBlock