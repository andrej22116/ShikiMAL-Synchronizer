import { animeStatusToMalStatus } from "../../utils/AnimeUtils";
import AnimeChangesCommiter from "../AnimeChangesCommiter";
import IApiWrap from "../IApiWrap";
import MyAnimeListApi from "./MyAnimeListApi";

export default class MyAnimeListApiWrap extends IApiWrap {
    constructor( api = MyAnimeListApi ) {
        super();

        this.__changeAnimeRait = this.__changeAnimeRait.bind(this);

        this.__api = api;
        this.__changeCommiter = new AnimeChangesCommiter(this.__changeAnimeRait);
    }

    async user() {
        return MyAnimeListApi.Users.me().then(data => ({
            id: data.id,
            nickname: data.name,
            picSrc: data.picture
        }));
    }

    async animeList() {
        return this.__api.Users.animeList();
    }

    async animeList_watching() {
        return this.__api.Users.animeList({status: "watching"});
    }

    async animeList_completed() {
        return this.__api.Users.animeList({status: "completed"});
    }

    async animeList_dropped() {
        return this.__api.Users.animeList({status: "dropped"});
    }

    async animeList_onhold() {
        return this.__api.Users.animeList({status: "on_hold"});
    }

    async animeList_plane2watch() {
        return this.__api.Users.animeList({status: "plan_to_watch"});
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
        this.__api.Anime.update(anime.animeId, {
            num_watched_episodes: anime.watchedEpisodes,
            score: anime.score,
            status: animeStatusToMalStatus(anime),
        }).then(log => console.log(log)).catch(error => console.error(error));
    }
}