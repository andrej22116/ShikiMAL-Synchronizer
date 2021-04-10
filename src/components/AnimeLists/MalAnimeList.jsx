import React from "react";
import AnimeStore from "../../store/AnimeStore";

const MalAnimeList = () => {
    return (
        <div>
            <button onClick={() => AnimeStore.myAnimeList.updateMaps()}>Update MyAnimeList list</button>
        </div>
    );
};

export default MalAnimeList;