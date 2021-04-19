import React, { useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import GridItem from "./GridItem";
import { Scrollbars } from 'react-custom-scrollbars';
import "./index.css";
import UiStore from "../../../store/UiStore";

const buildGrid = (list, offset) => {
    const {width, height} = UiStore.workspaceSize;
    const itemWidth = UiStore.animeListStyleProfile.finalSize.width;
    const itemHeight = UiStore.animeListStyleProfile.finalSize.height;
    const itemsInRow = Math.floor(width / itemWidth);
    const maxRowsForRender = Math.ceil(height / itemHeight + 3);
    const rowsAmount = Math.ceil(list.length / itemsInRow);

    let firstRowNumber = Math.floor(offset / itemHeight);
    if ( firstRowNumber - maxRowsForRender > rowsAmount ) {
        firstRowNumber -= maxRowsForRender;
    }
    else if ( firstRowNumber > 0 ) {
        firstRowNumber--;
    }

    const result = [];
    const buildRow = (key, items) => result.push(<div className="anime-list-grid-view-row" key={key}>{items}</div>);

    let itemOffset = firstRowNumber * itemsInRow;
    let renderedRows = 0;
    for (; renderedRows < maxRowsForRender && itemOffset < list.length; renderedRows++ ) {
        const rowItems = [];
        for( let i = 0; i < itemsInRow && itemOffset < list.length; i++, itemOffset++ ) {
            rowItems.push(<GridItem anime={list[itemOffset]}/>);
        }
        buildRow(firstRowNumber + renderedRows, rowItems);
    }

    return (
        <div 
            className="container"
            style={{
                paddingTop: firstRowNumber * itemHeight,
                paddingBottom: (rowsAmount - (firstRowNumber + renderedRows)) * itemHeight
            }}
        >
            {result}
        </div>
    );
}

const GridView = observer(({store}) => {
    const [offset, setOffset] = useState(0);
    let grid = buildGrid(store.animeList, offset);

    return (
        <Scrollbars 
            style={{ width: UiStore.workspaceSize.width, height: UiStore.workspaceSize.height }}
            renderTrackVertical={props => <div {...props} className="vertical-track"/>}
            renderThumbVertical={props => <div {...props} className="vertical-tumb"/>}
            onScrollFrame={e => setOffset(e.scrollTop)}
        >
            <div className="anime-list-grid-view">
                {grid}
            </div>
        </Scrollbars>
    )
});

export default GridView;