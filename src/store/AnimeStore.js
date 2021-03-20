import { makeAutoObservable } from "mobx";
import IApiWrap from "../api/IApiWrap";
import MyAnimeListApiWrap from "../api/MyAnimeList/MyAnimeListApiWrap";
import ShikimoriApiWrap from "../api/Shikimori/ShikimoriApiWrap";

/**
 * @param {IApiWrap} api
 */
function buildAnimeStore( api ) {
    return makeAutoObservable({
        currentWatchinMap: {},
        completedMap: {},
        onholdMap: {},
        planToWatchMap: {},
        droppedMap: {},
        clearMaps() {
            this.currentWatchinMap = {};
            this.completedMap = {};
            this.onholdMap = {};
            this.planToWatchMap = {};
            this.droppedMap = {};
        },
        async updateMaps() {
            const mapList = await api.animeList();
        },
        async updateCurrentWatchinMap() {

        },
        async updateCompletedMap() {

        },
        async updateOnholdMap() {

        },
        async updatePlanToWatchMap() {

        },
        async updateDroppedMap() {

        },
        appendToCurrentWatchinMap( anime ) {

        },
        appendToCompletedMap( anime ) {

        },
        appendToOnholdMap( anime ) {

        },
        appendToPlanToWatchMap( anime ) {

        },
        appendToDroppedMap( anime ) {

        },
    });
};

const AnimeStore = {
    shikimori: buildAnimeStore(new ShikimoriApiWrap),
    myAnimeList: buildAnimeStore(new MyAnimeListApiWrap)
};

export default AnimeStore;