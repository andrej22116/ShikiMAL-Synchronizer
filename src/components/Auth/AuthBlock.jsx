import React from "react";
import { observer } from "mobx-react";

const AuthButton = observer(({client}) => (
    <button onClick={() => client.login()}>
        Авторизоваться
    </button>
));

const UserProfileInfo = observer(({store, client}) => (
    <div>
        {
            store.id === 0
            ? (<div> ... </div>)
            : (
                <>
                    <div><img src={store.picSrc} alt={store.nickname}/></div>
                    <div>
                        <h2>{store.nickname}</h2>
                        <button onClick={() => client.logout()}>Выйти</button>
                    </div>
                </>
            )
        }
    </div>
));

const AuthBlock = observer(({authStore, authClient, userStore}) => (
    <div>
        {
            authStore.isAuthorized
            ? <UserProfileInfo store={userStore} client={authClient}/>
            : <AuthButton client={authClient}/>
        }
    </div>
))

export default AuthBlock;