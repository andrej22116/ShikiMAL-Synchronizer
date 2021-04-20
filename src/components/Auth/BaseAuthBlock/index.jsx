import React from "react";
import { observer } from "mobx-react";
import "./index.css";

const AuthButton = observer(({authStore, client}) => (
    <div className="base-auth-block-button">
        <div className="base-auth-block-button-wrap">
            <i className="base-auth-block-button-user-icon icon-user-circle-o"/>
            <button 
                className="login-btn"
                onClick={() => {
                    authStore.setAuthorizationProcessState(true);
                    client.login();
                }}
            >
                <p>Login</p>
            </button>
        </div>
    </div>
));

const UserProfileInfo = observer(({authStore, userStore, client}) => (
    <div className="base-auth-block-user-wrap">
    {
        userStore.id === 0 || authStore.authorization
        ? (<div key="0" className="loader"> ... </div>)
        : (
            <div key="1" className="user">
                <div className="avatar">
                    <div className="img-wrap">
                        <img src={userStore.picSrc} alt={userStore.nickname}/>
                    </div>
                    <button className="logout" onClick={() => client.logout()}>Logout</button>
                </div>
                <div className="nickname">
                    <h2>{userStore.nickname}</h2>
                </div>
            </div>
        )
    }
    </div>
));

const BaseAuthBlock = observer(({authStore, authClient, userStore, className}) => (
    <div className={className}>
    {
        authStore.isAuthorized || authStore.authorization
        ? <UserProfileInfo authStore={authStore} userStore={userStore} client={authClient}/>
        : <AuthButton authStore={authStore} client={authClient}/>
    }
    </div>
))

export default BaseAuthBlock;