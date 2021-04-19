import { animeStatusToShikimoriStatus } from "../../utils/AnimeUtils";
import AnimeChangesCommiter from "../AnimeChangesCommiter";
import IApiWrap from "../IApiWrap";
import ShikimoriApi from "./ShikimoriApi";

export default class ShikimoriApiWrap extends IApiWrap {
    constructor() {
        super();
        this.__changeCommiter = new AnimeChangesCommiter(this.__changeAnimeRait);
    }

    async user() {
        return ShikimoriApi.Users.me().then(data => ({
            id: data.id,
            nickname: data.nickname,
            picSrc: data.image.x160
        }));
    }
    
    async animeList() {
        return ShikimoriApi.Users.animeList();
    }

    async animeList_watching() {
        return ShikimoriApi.Users.animeList({status: "watching"});
    }

    async animeList_completed() {
        return ShikimoriApi.Users.animeList({status: "completed"});
    }

    async animeList_dropped() {
        return ShikimoriApi.Users.animeList({status: "dropped"});
    }

    async animeList_onhold() {
        return ShikimoriApi.Users.animeList({status: "on_hold"});
    }

    async animeList_plane2watch() {
        return ShikimoriApi.Users.animeList({status: "planned"});
    }

    setEpisode( anime ) {
        this.__changeCommiter.push(anime);
    }

    setStatus( anime ) {
        this.__changeCommiter.push(anime);
    }

    setScore( anime ) {
        this.__changeCommiter.push(anime);
    }

    setRewatching( anime ) {
        this.__changeCommiter.push(anime);
    }

    __changeAnimeRait( anime ) {
        console.log(animeStatusToShikimoriStatus(anime));
        ShikimoriApi.Raits.update(anime.raitId, {
            episodes: anime.watchedEpisodes,
            score: anime.score,
            status: animeStatusToShikimoriStatus(anime),
        }).then(log => console.log(log)).catch(error => console.error(error));
    }
}