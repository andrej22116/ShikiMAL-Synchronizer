import { makeAutoObservable, reaction } from "mobx";
import AnimeStore from "./AnimeStore";

export const SORT_BY_NAME_ASC = "name";
export const SORT_BY_NAME_DESC = "name_r";
export const SORT_BY_SCORE_ASC = "score";
export const SORT_BY_SCORE_DESC = "score_r";
export const SORT_BY_TOTAL_SERIES_ASC = "series";
export const SORT_BY_TOTAL_SERIES_DESC = "series_r";

const sortComparatorsMap = {
    [SORT_BY_NAME_ASC]: (anime_1, anime_2) => {
        if (anime_1.name > anime_2.name) return 1;
        if (anime_1.name < anime_2.name) return -1;
        return 0;
    },
    [SORT_BY_NAME_DESC]: (anime_1, anime_2) => {
        if (anime_1.name < anime_2.name) return 1;
        if (anime_1.name > anime_2.name) return -1;
        return 0;
    },
    [SORT_BY_SCORE_ASC]: (anime_1, anime_2) => {
        return anime_1.score - anime_2.score;
    },
    [SORT_BY_SCORE_DESC]: (anime_1, anime_2) => {
        return anime_2.score - anime_1.score;
    },
    [SORT_BY_TOTAL_SERIES_ASC]: (anime_1, anime_2) => {
        return anime_1.totalEpisodes - anime_2.totalEpisodes;
    },
    [SORT_BY_TOTAL_SERIES_DESC]: (anime_1, anime_2) => {
        return anime_2.totalEpisodes - anime_1.totalEpisodes;
    },
};


const buildBaseAnimeListStore = () => {
    const BaseAnimeListStore = makeAutoObservable({
        selectedWatchingGroup: 0,
        sortField: SORT_BY_NAME_ASC,
        animeList: [],
        selectWatchingGroup(groupNumber) {
            this.selectedWatchingGroup = groupNumber;
            this.updateAnimeList();
        },
        reloadAnimeList() {
            AnimeStore.shikimori.updateMaps();
            AnimeStore.myAnimeList.updateMaps();
        },
        updateAnimeList() {
            this.animeList = AnimeStore.general.animeGeneralList.filter( anime => this.selectedWatchingGroup ? anime.status === this.selectedWatchingGroup : true );
            this.sortAnimeList();
        },
        setSortField(field) {
            this.sortField = sortComparatorsMap[field] ? field : SORT_BY_NAME_ASC;
            this.sortAnimeList();
        },
        sortAnimeList() {
            const sortedList = this.animeList.sort(sortComparatorsMap[this.sortField]);
            this.animeList.replace(sortedList);
        },
    });
    
    reaction(
        () => AnimeStore.general.waitList,
        () => {
            if ( !AnimeStore.general.waitList) {
                BaseAnimeListStore.updateAnimeList();
            }
        }
    )

    return BaseAnimeListStore;
}

export {buildBaseAnimeListStore};