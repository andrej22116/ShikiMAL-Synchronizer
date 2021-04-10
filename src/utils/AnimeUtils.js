import * as STATUS from "../constants/AnimeStatus";

export const animeStatusToMalStatus = anime => {
    switch (anime.status) {
        case STATUS.WATCHING: return "watching";
        case STATUS.COMPLETED: return "completed";
        case STATUS.PLANED: return "plan_to_watch";
        case STATUS.ON_HOLD: return "on_hold";
        case STATUS.DROPPED: return "dropped";
    }
};
export const animeStatusToShikimoriStatus = anime => {
    if ( anime.rewatching ) {
        return "rewatching";
    }
    switch (anime.status) {
        case STATUS.WATCHING: return "watching";
        case STATUS.COMPLETED: return "completed";
        case STATUS.PLANED: return "planned";
        case STATUS.ON_HOLD: return "on_hold";
        case STATUS.DROPPED: return "dropped";
    }
};