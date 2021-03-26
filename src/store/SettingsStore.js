import { autorun, makeAutoObservable } from "mobx";

const SettingsStore = {
    global: makeAutoObservable({
        backgroundImage: window.localStorage.getItem('backgroundImage') || "https://github.com/andrej22116/shikimori-stylesheet/blob/main/bg.jpg?raw=true",
    
        setBackgroundImage( src ) {
            this.backgroundImage = src
        },
    }),
}

autorun( () => {document.body.style.backgroundImage = SettingsStore.global.backgroundImage});

export default SettingsStore;