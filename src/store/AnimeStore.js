import { makeAutoObservable, reaction } from "mobx";
import MyAnimeListApiWrap from "../api/MyAnimeList/MyAnimeListApiWrap";
import ShikimoriApiWrap from "../api/Shikimori/ShikimoriApiWrap";
import Anime from "../entities/Anime";
import AnimePair from "../entities/AnimePair";
import OauthStore from "./OauthStore";
import * as STATUS from "../constants/AnimeStatus";

const statusMap = {
    "watching": STATUS.WATCHING,
    "completed": STATUS.COMPLETED,
    "planned": STATUS.PLANED,
    "plan_to_watch": STATUS.PLANED,
    "on_hold": STATUS.ON_HOLD,
    "dropped": STATUS.DROPPED,
    "rewatching": 6
};

/**
 * @param {IApiWrap} api
 */
function buildAnimeStore( api, animeItemAdapter ) {
    return makeAutoObservable({
        listLoaded: false,
        loadingAnimeList: false,
        fullList: [],
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
            this.updateListLoadedStatus(false);
            this.loadingAnimeList = true;
            const animeList = await api.animeList();

            const targetMapsByStatus = {
                [STATUS.WATCHING]: this.currentWatchinMap,
                [STATUS.COMPLETED]: this.completedMap,
                [STATUS.PLANED]: this.planToWatchMap,
                [STATUS.ON_HOLD]: this.onholdMap,
                [STATUS.DROPPED]: this.droppedMap,
            };
            
            for (const key in animeList.list) {
                const item = animeItemAdapter(animeList.list[key]);

                reaction(
                    () => item.episodes.watched,
                    () => { api.setEpisode(item) }
                );
                reaction(
                    () => item.status,
                    () => { api.setStatus(item) }
                );
                reaction(
                    () => item.score,
                    () => { api.setScore(item) }
                );
                reaction(
                    () => item.rewatching,
                    () => { api.setRewatching(item) }
                );
                targetMapsByStatus[item.status][item.raitId] = item;
                this.fullList.push(item);
            }

            this.loadingAnimeList = false;
            this.updateListLoadedStatus(true);
        },
        updateListLoadedStatus( status ) {
            this.listLoaded = status;
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

const shikimoriAnimeItemAdapter = item => {
    let status = statusMap[item.status];
    let rewatching = false;
    if ( status === 6 ) {
        status = 1;
        rewatching = true;
    }
    return new Anime (
        item.anime.id,
        item.id,
        item.anime.name,
        status,
        `https://shikimori.one${item.anime.image.preview}`,
        `https://shikimori.one${item.anime.image.original}`,
        item.episodes,
        item.anime.episodes,
        item.score,
        rewatching
    );
};
const malAnimeItemAdapter = item => {
    return new Anime(
        item.node.id,
        item.node.id,
        item.node.title,
        statusMap[item.node.my_list_status.status],
        item.node.main_picture.medium,
        item.node.main_picture.large,
        item.node.my_list_status.num_episodes_watched,
        item.node.num_episodes,
        item.node.my_list_status.score,
        item.node.my_list_status.is_rewatching
    );
};

const buildGeneralStore = () => makeAutoObservable({
    generalListAnimeNamesMap: {},
    animeGeneralList: [],
    onlyShikimoriList: [],
    onlyMalList: [],
    waitList: true,
    setWaitingStatus( status ) {
        this.waitList = status;
    },
    makeGeneralList() {
        const buildMap = list => {
            const map = {};
            for( const key in list ) {
                map[list[key].name.toLowerCase()] = list[key];
            }
            return map;
        };
        const difference = (firstKeyList, secondMap) => {
            const diffList = [];
            for ( let i = 0; i < firstKeyList.length; i++ ) {
                if ( !secondMap[firstKeyList[i]] ) {
                    diffList.push(firstKeyList[i]);
                }
            }
            return diffList;
        };
        const shikiMap = buildMap(AnimeStore.shikimori.fullList);
        const malMap = buildMap(AnimeStore.myAnimeList.fullList);
        const shikiKeyList = Object.keys(shikiMap);
        const malKeyList = Object.keys(malMap);

        const generalList = [];
        const generalListAnimeNamesMap = {};
        for ( let i = 0; i < shikiKeyList.length; i++ ) {
            if ( malMap[shikiKeyList[i]] ) {
                generalList.push(new AnimePair(shikiMap[shikiKeyList[i]], malMap[shikiKeyList[i]]));
                generalListAnimeNamesMap[shikiKeyList[i]] = true;
            }
        }
        this.generalListAnimeNamesMap = generalListAnimeNamesMap;
        this.animeGeneralList = generalList;

        this.onlyShikimoriList = difference(shikiKeyList, malMap);
        this.onlyMalList = difference(malKeyList, shikiMap);

        this.setWaitingStatus(false);
    }
},{
    generalListAnimeNamesMap: false
});

const AnimeStore = {
    shikimori: buildAnimeStore(new ShikimoriApiWrap(), shikimoriAnimeItemAdapter),
    myAnimeList: buildAnimeStore(new MyAnimeListApiWrap(), malAnimeItemAdapter),
    general: buildGeneralStore()
};


const onTwoListLoadedReaction = () => {
    if ( AnimeStore.shikimori.listLoaded && AnimeStore.myAnimeList.listLoaded ) {
        AnimeStore.general.makeGeneralList();
    }
    else {
        AnimeStore.general.setWaitingStatus(true);
    }
};

reaction(
    () => AnimeStore.shikimori.listLoaded,
    onTwoListLoadedReaction
);
reaction(
    () => AnimeStore.myAnimeList.listLoaded,
    onTwoListLoadedReaction
);
reaction(
    () => OauthStore.shikimori.isAuthorized,
    () => AnimeStore.shikimori.updateMaps()
);
reaction(
    () => OauthStore.myAnimeList.isAuthorized,
    () => AnimeStore.myAnimeList.updateMaps()
);

export default AnimeStore;