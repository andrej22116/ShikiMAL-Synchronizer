import React, { useState } from "react";
import GridView from "./GridView";
import { buildBaseAnimeListStore } from "../../store/BaseAnimeListStore";
import AnimeListHeader from "./AnimeListHeader";
import "./style/AnimeList.css";
import AnimeLoader from "../Other/AnimeLoader";
import AnimeStore from "../../store/AnimeStore";
import { observer } from "mobx-react-lite";

const AnimeList = observer(() => {
    const [baseAnimeListStore] = useState(buildBaseAnimeListStore())

    return (
        <div className="anime-list">
            <div className="anime-list-header-wrap">
                <AnimeListHeader store={baseAnimeListStore}/>
            </div>
            <div className="anime-list-wrap">
                <GridView key={baseAnimeListStore.selectedWatchingGroup} store={baseAnimeListStore}/>
            </div>
            {
                AnimeStore.general.waitList
                ?
                <div className="anime-list-wrap loading">
                    <AnimeLoader/>
                </div>
                :
                null
            }
        </div>
    );
});

export default AnimeList;