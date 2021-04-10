import React from "react";
import AnimeListVariantSelector from "./AnimeListVariantSelector";
import "./style/AnimeListHeader.css";

const AnimeListHeader = ({store}) => {

    return (
        <div className="anime-list-header">
            <div className="anime-list-header-left">
                
            </div>
            <div className="anime-list-header-center">
                <AnimeListVariantSelector store={store}/>
            </div>
            <div className="anime-list-header-right">
                <button className="action-button" onClick={() => store.reloadAnimeList()}><i className="icon-cw"></i></button>
            </div>
        </div>
    )
};

export default AnimeListHeader;