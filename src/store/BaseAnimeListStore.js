import { makeAutoObservable, reaction } from "mobx";
import AnimeStore from "./AnimeStore";

export const SORT_BY_NAME_ASC = "name";
export const SORT_BY_NAME_DESC = "name_r";
export const SORT_BY_SCORE_ASC = "name";
export const SORT_BY_SCORE_DESC = "name_r";
export const SORT_BY_TOTAL_SERIES_ASC = "name";
export const SORT_BY_TOTAL_SERIES_DESC = "name_r";

const sortComparatorsMap = {
    [SORT_BY_NAME_ASC]: (anime_1, anime_2) => {
        if (anime_1.name > anime_2.name) return 1;
        if (anime_2.name < anime_1.name) return -1;
        return 0;
    },
    [SORT_BY_NAME_DESC]: (anime_1, anime_2) => {
        if (anime_1.name < anime_2.name) return 1;
        if (anime_2.name > anime_1.name) return -1;
        return 0;
    },
    [SORT_BY_SCORE_ASC]: (anime_1, anime_2) => {
        if (anime_1.score > anime_2.score) return 1;
        if (anime_2.score < anime_1.score) return -1;
        return 0;
    },
    [SORT_BY_SCORE_DESC]: (anime_1, anime_2) => {
        if (anime_1.score < anime_2.score) return 1;
        if (anime_2.score > anime_1.score) return -1;
        return 0;
    },
    [SORT_BY_TOTAL_SERIES_ASC]: (anime_1, anime_2) => {
        if (anime_1.totalEpisodes > anime_2.totalEpisodes) return 1;
        if (anime_2.totalEpisodes < anime_1.totalEpisodes) return -1;
        return 0;
    },
    [SORT_BY_TOTAL_SERIES_DESC]: (anime_1, anime_2) => {
        if (anime_1.totalEpisodes < anime_2.totalEpisodes) return 1;
        if (anime_2.totalEpisodes > anime_1.totalEpisodes) return -1;
        return 0;
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
            this.animeList = AnimeStore.general.animeGeneralList.filter( anime => this.selectedWatchingGroup ? anime.status === this.selectedWatchingGroup : true )
        },
        setSortField(field) {
            this.sortField = sortComparatorsMap[field] ? field : "name";
            this.animeList.sort(sortComparatorsMap[this.sortField]);
        }
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