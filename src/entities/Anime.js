import { makeObservable, observable, action } from "mobx";

export default class Anime {
    constructor(
        animeId,
        raitId,
        name,
        status,
        smallImage,
        bigImage,
        watchedEpisodes,
        totalEpisodes,
        score,
        rewatching,
        rawObject,
    ) {
        this.animeId = animeId;
        this.raitId = raitId;
        this.name = name;
        this.status = +status;
        this.image = {
            small: smallImage,
            big: bigImage
        };
        this.episodes = {
            watched: watchedEpisodes,
            total: totalEpisodes
        };
        this.score = score;
        this.rewatching = rewatching;

        this.raw = rawObject;

        makeObservable(this, {
            episodes: observable,
            status: observable,
            score: observable,
            rewatching: observable,
            setWatchedEpisod: action,
            incrementWatchedEpisod: action,
            decrimentWatchedEpisod: action,
            setScore: action,
            setRewatching: action,
            setStatus: action
        });
    }

    get watchedEpisodes() { return this.episodes.watched; }
    get totalEpisodes() { return this.episodes.total; }

    get smallImage() { return this.image.small; }
    get bigImage() { return this.image.big; }

    setWatchedEpisod = (episode) => {
        if ( 0 <= episode && episode <= this.episodes.total || !this.episodes.total ) {
            this.episodes.watched = +episode;
        }
    }

    incrementWatchedEpisod = () => {
        this.episodes.watched = !this.episodes.total || this.episodes.watched < this.episodes.total ? this.episodes.watched + 1 : this.episodes.total;
    }

    decrimentWatchedEpisod = () => {
        this.episodes.watched = !this.episodes.total || this.episodes.watched > 0 ? this.episodes.watched - 1 : 0;
    }

    setScore = (score) => {
        this.score = score;
    }

    setRewatching = (rewatching) => {
        this.rewatching = rewatching;
    }

    setStatus = (status) => {
        this.status = status;
    }
    
};