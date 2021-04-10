import React from "react";
import { observer } from "mobx-react-lite";
import "./style/AnimeListVariantSelector.css";

const baseStyle = "anime-list-variant-selector";
const activeStyle = baseStyle + " active";

const AnimeListVariantSelector = observer( ({store}) => (
    <div className="anime-list-variant">
        <button className={store.selectedWatchingGroup === 0 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(0)}>All anime</button>
        <button className={store.selectedWatchingGroup === 1 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(1)}>Watching</button>
        <button className={store.selectedWatchingGroup === 2 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(2)}>Completed</button>
        <button className={store.selectedWatchingGroup === 3 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(3)}>Plan to watch</button>
        <button className={store.selectedWatchingGroup === 4 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(4)}>On hold</button>
        <button className={store.selectedWatchingGroup === 5 ? activeStyle : baseStyle} onClick={() => store.selectWatchingGroup(5)}>Dropped</button>
    </div>
));

export default AnimeListVariantSelector;