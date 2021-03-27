import axios from "axios";
import { autorun, makeAutoObservable, runInAction } from "mobx";

const SettingsStore = {
    global: makeAutoObservable({
        backgroundImage: window.localStorage.getItem('backgroundImage') || "https://github.com/andrej22116/shikimori-stylesheet/blob/main/bg.jpg?raw=true",
    
        setBackgroundImage( src ) {
            axios.head(src).then( () => {
                runInAction(() => {
                    this.backgroundImage = src;
                    window.localStorage.setItem('backgroundImage', src);
                });
            });
        },
    }),
}

autorun( () => {
    document.body.style.backgroundImage = `url('${SettingsStore.global.backgroundImage}'`;
});

export default SettingsStore;