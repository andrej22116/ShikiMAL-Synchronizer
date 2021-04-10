import { observer } from "mobx-react-lite";
import React from "react";
import AnimeListGridViewItem from "./AnimeListGridViewItem";
import { Scrollbars } from "react-custom-scrollbars";
import "./style/AnimeListGridView.css";

class VirtualScrollGridSpace {
    constructor(data, spaceSize, spacePadding, itemSize, itemMargin) {
        this.data = data;
        this.spaceSize = spaceSize;
        this.spacePadding = spacePadding;
        this.itemSize = itemSize;
        this.itemMargin = itemMargin;
        this.itemsInRow = 0;
        this.itemHeight = 0;
        this.innerHeight = 0;
        this.fullHeight = 0;
        this.maxRenderedRows = 0;

        this._recalculateItemsInRow();
        this._recalculateItemHeight();
        this._recalculateInnerHeight();
        this._recalculateFullHeight();
        this._recalculateMaxRenderedRows();

        this.scrollTopOffset = 0;
        this.fillSpaceTop = 0;
        this.fillSpaceBottom = 0;
    }

    _recalculateItemsInRow() {
        const itemWidth = this.itemSize.width + this.itemMargin.left + this.itemMargin.right;
        const spaceWidth = this.spaceSize.width - this.spaceSize.left + this.spaceSize.right
        this.itemsInRow = Math.floor(spaceWidth / itemWidth);
    }
    _recalculateItemHeight() {
        this.itemHeight = this.itemSize.height + this.itemMargin.top + this.itemMargin.bottom;
    }
    _recalculateInnerHeight() {
        const rows = Math.ceil(this.data.length / this.itemsInRow);
        this.innerHeight = rows * this.itemHeight;
    }
    _recalculateFullHeight() {
        this.fullHeight = this.innerHeight = this.spacePadding.top + this.spacePadding.bottom;
    }
    _recalculateMaxRenderedRows() {
        this.maxRenderedRows = Math.ceil(this.fullHeight / this.itemHeight) + 2;
    }
    
    _recalculateFillSpaces() {
        
    }
}

const AnimeListGridView = observer(({store}) => {
    return (
        <div className="anime-list-grid-view">
            {
                store.animeList.map( anime => <AnimeListGridViewItem anime={anime}/> )
            }
        </div>
    )
});

export default AnimeListGridView;