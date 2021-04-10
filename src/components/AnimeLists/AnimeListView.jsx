import { observer } from "mobx-react-lite";
import React from "react";
import AnimeStore from "../../store/AnimeStore";
import AnimeListViewItem from "./AnimeListViewItem";

const AnimeListView = observer(({status}) => {
    return (
        <div>
            {
                AnimeStore.general.animeGeneralList
                    .filter( anime => status ? anime.status === status : true )
                    .map( anime => <AnimeListViewItem anime={anime}/> )
            }
        </div>
    )
});

export default AnimeListView;