export default class IApiWrap {
    async user() {
        throw new Error('Property "user" is not implemented!');
    }

    async animeList( page, limit ) {
        throw new Error('Property "animeList" is not implemented!');
    }

    async animeList_watching( page, limit ) {
        throw new Error('Property "animeList_watching" is not implemented!');
    }

    async animeList_completed( page, limit ) {
        throw new Error('Property "animeList_completed" is not implemented!');
    }

    async animeList_dropped( page, limit ) {
        throw new Error('Property "animeList_dropped" is not implemented!');
    }

    async animeList_onhold( page, limit ) {
        throw new Error('Property "animeList_onhold" is not implemented!');
    }

    async animeList_plane2watch( page, limit ) {
        throw new Error('Property "animeList_plane2watch" is not implemented!');
    }
};