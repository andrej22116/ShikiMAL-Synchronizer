import Anime from "../entities/Anime";

export default class AnimeChangesCommiter {
    constructor( callback, timeoutDelay = 1000 )
    {
        this._objectsMap = {};
        this._callback = callback;
        this._timeoutDelay = timeoutDelay;
    }

    push( anime ) {
        const id = anime.raitId
        if ( this._objectsMap[id] ) {
            const animeObj = this._objectsMap[id];
            clearTimeout(animeObj.timeoutId);
            animeObj.timeoutId = this.__setTimeout(anime);
            return;
        }

        this._objectsMap[id] = {
            timeoutId: this.__setTimeout(anime),
            anime
        };
    }

    __timeoutCallback( anime ) {
        delete this._objectsMap[anime.raitId];
        this._callback(anime);
    }
    __setTimeout( anime ) {
        return setTimeout(this.__timeoutCallback.bind(this, anime), this._timeoutDelay);
    }
};