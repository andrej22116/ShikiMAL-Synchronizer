import React from "react";
import AnimeStore from "../../store/AnimeStore";

const ShikimoriAnimeList = () => {
    return (
        <div>
            <button onClick={() => AnimeStore.shikimori.updateMaps()}>Update shikimori list</button>
        </div>
    );
};

export default ShikimoriAnimeList;