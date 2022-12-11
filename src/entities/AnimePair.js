import Anime from "./Anime"
import SettingsStore from "../store/SettingsStore";

export default class AnimePair {
    /**
     * 
     * @param {Anime} shikimoriAnime 
     * @param {Anime} malAnime 
     */
    constructor( shikimoriAnime, malAnime ) {
        this._shikimoriAnime = shikimoriAnime;
        this._malAnime = malAnime;
    }

    get shikimoriAnime() { return this._shikimoriAnime; }
    get malAnime() { return this._malAnime; }

    get name() {
        switch ( SettingsStore.global.cardTitleLang ) {
            case 'ru': return this._shikimoriAnime.raw.anime.russian;
            case 'en': return this._malAnime.raw.node.alternative_titles['en'] || this._malAnime.name;
            case 'jp': return this._malAnime.raw.node.alternative_titles['ja'] || this._malAnime.name;
            default: return this._malAnime.name;
        }
    }

    get isEqualEpisodes() { return this._shikimoriAnime.episodes.watched === this._malAnime.episodes.watched; }
    get watchedEpisodes() { return this._malAnime.episodes.watched; }
    get totalEpisodes() { return this._malAnime.episodes.total; }
    get shikimoriWatchedEpisodes() { return this._shikimoriAnime.episodes.watched; }
    get malWatchedEpisodes() { return this._malAnime.episodes.watched; }

    get isEqualStatuses() { return this._shikimoriAnime.status === this._malAnime.status; }
    get status() { return +this._malAnime.status; }
    get shikimoriStatus() { return this._shikimoriAnime.status; }
    get malStatus() { return this._malAnime.status; }

    get isEqualScores() { return this._shikimoriAnime.score === this._malAnime.score; }
    get score() { return this._malAnime.score; }
    get shikimoriScore() { return this._shikimoriAnime.score; }
    get malScore() { return this._malAnime.score; }

    get isEqualRewatchings() { return this._shikimoriAnime.rewatching === this._malAnime.rewatching; }
    get rewatching() { return this._malAnime.rewatching; }
    get shikimoriRewatching() { return this._shikimoriAnime.rewatching; }
    get malRewatching() { return this._malAnime.rewatching; }

    get smallImage() { return this._malAnime.image.small; }
    get bigImage() { return this._malAnime.image.big; }

    setWatchedEpisod = (episode) => {
        this._malAnime.setWatchedEpisod(episode);
        this._shikimoriAnime.setWatchedEpisod(episode);
    }

    incrementWatchedEpisod = () => {
        this._malAnime.incrementWatchedEpisod(this.watchedEpisodes + 1);
        this._shikimoriAnime.incrementWatchedEpisod(this.watchedEpisodes + 1);
    }

    decrimentWatchedEpisod = () => {
        this._malAnime.decrimentWatchedEpisod(this.watchedEpisodes - 1);
        this._shikimoriAnime.decrimentWatchedEpisod(this.watchedEpisodes - 1);
    }

    setScore = (score) => {
        this._malAnime.setScore(score);
        this._shikimoriAnime.setScore(score);
    }

    setRewatching = (rewatching) => {
        this._malAnime.setRewatching(rewatching);
        this._shikimoriAnime.setRewatching(rewatching);
    }

    setStatus = (status) => {
        this._malAnime.setStatus(status);
        this._shikimoriAnime.setStatus(status);
    }

    get hasDifferent() {
        return this._shikimoriAnime.episodes.watched !== this._malAnime.episodes.watched
            || this._shikimoriAnime.score !== this._malAnime.score
            || this._shikimoriAnime.status !== this._malAnime.status
            || this._shikimoriAnime.rewatching !== this._malAnime.rewatching;
    }

    setWatchedEpisodesLikeShikimori() {
        this._malAnime.setWatchedEpisod(this._shikimoriAnime.episodes.watched);
    }
    setWatchedEpisodesLikeMyAnimeList() {
        this._shikimoriAnime.setWatchedEpisod(this._malAnime.episodes.watched);
    }

    setStatusLikeShikimori() {
        this._malAnime.setStatus(this._shikimoriAnime.status);
    }
    setStatusLikeMyAnimeList() {
        this._shikimoriAnime.setStatus(this._malAnime.status);
    }

    setScoreLikeShikimori() {
        this._malAnime.setScore(this._shikimoriAnime.score);
    }
    setScoreLikeMyAnimeList() {
        this._shikimoriAnime.setScore(this._malAnime.score);
    }

    setRewatchingLikeShikimori() {
        this._malAnime.setRewatching(this._shikimoriAnime.rewatching);
    }
    setRewatchingLikeMyAnimeList() {
        this._shikimoriAnime.setRewatching(this._malAnime.rewatching);
    }

    setAllParamsLikeShikimori() {
        this.setWatchedEpisodesLikeShikimori();
        this.setStatusLikeShikimori();
        this.setScoreLikeShikimori();
        this.setRewatchingLikeShikimori();
    }
    setAllParamsLikeMyAnimeList() {
        this.setWatchedEpisodesLikeMyAnimeList();
        this.setStatusLikeMyAnimeList();
        this.setScoreLikeMyAnimeList();
        this.setRewatchingLikeMyAnimeList();
    }
};