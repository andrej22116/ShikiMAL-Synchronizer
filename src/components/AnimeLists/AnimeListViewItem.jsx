import { observer } from "mobx-react-lite";
import React from "react";
import "./style/AnimeListViewItem.css";

const AnimeListViewItemImage = ({smallSrc, bigSrc}) => (
    <div className="anime-list-view-item-img">
        <div className="small-img">
            <img src={smallSrc} alt="anime"/>
        </div>
        <div className="big-img">
            <img src={bigSrc} alt="anime"/>
        </div>
    </div>
);

const AnimeListViewItemBase = observer(({anime, className, style}) => {
    const classList = className ? "anime-list-view-item " + className : "anime-list-view-item";
    return (
        <div key={anime.raitId} className={classList} style={style}>
            <AnimeListViewItemImage smallSrc={anime.smallImage} bigSrc={anime.bigImage}/>
            <div className="anime-list-view-item-wrap">
                <h4 title={anime.name}>{anime.name}</h4>
            </div>
        </div>
    );
});

const AnimeListViewItem = observer(({anime, style}) => <AnimeListViewItemBase anime={anime} style={style}/>);
const AnimeListViewItemMirrored = observer(({anime, style}) => <AnimeListViewItemBase anime={anime} style={style} className="mirrored"/>);

export default AnimeListViewItem;
export {
    AnimeListViewItem,
    AnimeListViewItemMirrored
};