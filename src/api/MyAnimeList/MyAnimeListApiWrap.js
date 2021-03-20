import IApiWrap from "../IApiWrap";
import MyAnimeListApi from "./MyAnimeListApi";

export default class MyAnimeListApiWrap extends IApiWrap {
    async user() {
        return MyAnimeListApi.Users.me().then(data => ({
            id: data.id,
            nickname: data.name,
            picSrc: data.picture
        }));
    }

    async animeList( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit});
    }

    async animeList_watching( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit, status: "watching"});
    }

    async animeList_completed( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit, status: "completed"});
    }

    async animeList_dropped( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit, status: "dropped"});
    }

    async animeList_onhold( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit, status: "on_hold"});
    }

    async animeList_plane2watch( page = 1, limit = 1000 ) {
        return MyAnimeListApi.Users.animeList({offset: (page - 1) * limit, limit, status: "plan_to_watch"});
    }
}