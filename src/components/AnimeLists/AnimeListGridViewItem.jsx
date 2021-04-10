import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import SettingsStore from "../../store/SettingsStore";
import * as STATUS from "../../constants/AnimeStatus";
import Button from "../Controls/Button";
import Input from "../Controls/Input";
import Selection from "../Controls/Selection";
import "./style/AnimeListGridViewItem.css"

const Score = ({anime, score}) => {
    const [isOver, setIsOver] = useState(false);
    const [overScore, setOverScore] = useState(1);

    score = isOver ? overScore + 1 : score;
    const res = [];
    for ( let i = 0; i < 10; i++ ) {
        res.push(
            <i 
                title={`Click for set ${i + 1} score`}
                key={i}
                className={(i < score ? "icon-star" : "icon-star-empty")}
                onMouseEnter={() => {
                    setIsOver(true);
                    setOverScore(i);
                }}
                onMouseOut={() => {
                    setIsOver(false);
                }}
                onClick={() => { anime.setScore(overScore + 1); }}
            >
            </i>
        );
    }
    return (
        <div 
            className="score"
            onMouseOver={() => setIsOver(true)}
            onMouseOut={() => setIsOver(false)}
        >
            {res}
            <span>{isOver ? overScore + 1 : score}</span>
        </div>
    );
};

const AnimeListGridViewItem = observer(({anime, style}) => (
    <div className="anime-grid-item" style={style}>
        {
            SettingsStore.global.useAccentBlur 
            ? <div className="anime-grid-item-overlay"></div>
            : null
        }
        <div className="anime-grid-item-wrap">
            {
                SettingsStore.global.useItemHighlite 
                ? (
                    <div className="anime-grid-item-bg blur">
                        <img src={anime.bigImage} alt="anime"/>
                    </div>
                ) : null
            }
            <div className="anime-grid-item-bg">
                <img src={anime.bigImage} alt="anime"/>
            </div>
            <div className="anime-grid-item-fg">
                <h4 className="title">{anime.name}</h4>
                <div className="controls">
                    <div className="status">
                        <Selection 
                            value={anime.status}
                            onChange={e => anime.setStatus(e.target.value)}
                        >
                            <option value={STATUS.WATCHING}>Watching</option>
                            <option value={STATUS.COMPLETED}>Completed</option>
                            <option value={STATUS.PLANED}>Plan to watch</option>
                            <option value={STATUS.ON_HOLD}>On hold</option>
                            <option value={STATUS.DROPPED}>Dropped</option>
                        </Selection>
                    </div>
                    <div className="watching">
                        <Button title="Decrement episode" onClick={() => anime.decrimentWatchedEpisod()}>-</Button>
                        <Input 
                            className="input" value={anime.watchedEpisodes} 
                            onChange={e => anime.setWatchedEpisod(e.target.value)}
                            title="Wathed episodes"
                        />
                        <Button title="Increment episode" onClick={() => anime.incrementWatchedEpisod()}>+</Button>
                    </div>
                    <Score anime={anime} score={anime.score}/>
                </div>
            </div>
        </div>
    </div>
));

export default AnimeListGridViewItem;