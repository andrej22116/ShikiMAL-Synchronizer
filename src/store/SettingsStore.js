import axios from "axios";
import { autorun, makeAutoObservable, runInAction } from "mobx";

const SettingsStore = {
    global: makeAutoObservable({
        backgroundImage: window.localStorage.getItem('backgroundImage') || "https://github.com/andrej22116/shikimori-stylesheet/blob/main/bg.jpg?raw=true",
        useAccentBlur: (window.localStorage.getItem('accentBlur') === 'true'),
        useItemHighlite: (window.localStorage.getItem('itemHighlite') === 'true'),
        cardTitleLang: (window.localStorage.getItem('cardTitleLang')),

        setBackgroundImage( src ) {
            if ( !src || !src.length ) {
                return;
            }
            axios.get(src).then( () => {
                runInAction(() => {
                    this.backgroundImage = src;
                    window.localStorage.setItem('backgroundImage', src);
                });
            });
        },

        setUsingAccentBlur( needUse ) {
            this.useAccentBlur = needUse;
            window.localStorage.setItem('accentBlur', needUse)
        },

        setUsingItemHighlite( needUse ) {
            this.useItemHighlite = needUse;
            window.localStorage.setItem('itemHighlite', needUse)
        },

        setCardTitleLang( lang ) {
            this.cardTitleLang = lang;
            window.localStorage.setItem('cardTitleLang', lang)
        },
    }),
}

autorun( () => {
    document.body.style.backgroundImage = `url('${SettingsStore.global.backgroundImage}'`;
});

export default SettingsStore;