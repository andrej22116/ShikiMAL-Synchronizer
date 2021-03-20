import IApiWrap from "../IApiWrap";
import ShikimoriApi from "./ShikimoriApi";

export default class ShikimoriApiWrap extends IApiWrap {
    async user() {
        return ShikimoriApi.Users.whoAmI().then(data => ({
            id: data.id,
            nickname: data.nickname,
            picSrc: data.image.x160
        }));
    }
    
    async animeList( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit});
    }

    async animeList_watching( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit, status: "watching"});
    }

    async animeList_completed( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit, status: "completed"});
    }

    async animeList_dropped( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit, status: "dropped"});
    }

    async animeList_onhold( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit, status: "on_hold"});
    }

    async animeList_plane2watch( page = 1, limit = 5000 ) {
        return ShikimoriApi.Users.animeRates({page, limit, status: "planned"});
    }
}