import React from "react";
import { observer } from "mobx-react-lite";
import { 
    SORT_BY_NAME_ASC,
    SORT_BY_NAME_DESC,
    SORT_BY_SCORE_ASC,
    SORT_BY_SCORE_DESC,
    SORT_BY_TOTAL_SERIES_ASC,
    SORT_BY_TOTAL_SERIES_DESC
} from "../../../../store/BaseAnimeListStore";
import "./index.css";

const sortVariantNameToIndexMap = {
    [SORT_BY_NAME_ASC]: 0,
    [SORT_BY_NAME_DESC]: 1,
    [SORT_BY_TOTAL_SERIES_ASC]: 2,
    [SORT_BY_TOTAL_SERIES_DESC]: 3,
    [SORT_BY_SCORE_ASC]: 4,
    [SORT_BY_SCORE_DESC]: 5
};

const buildSortVariantItem = (store, key, title, sortCode, icon) => (
    <div 
        key={key}
        title={title}
        onClick={() => store.setSortField(sortCode)}
    >
        <i className={icon}/>
    </div>
);

const buildSortVariantList = store => {
    const result = [
        buildSortVariantItem(store, 0, "Sort by name (asc)", SORT_BY_NAME_ASC, "icon-sort-by-name-asc"),
        buildSortVariantItem(store, 1, "Sort by name (desc)", SORT_BY_NAME_DESC, "icon-sort-by-name-desc"),
        buildSortVariantItem(store, 2, "Sort by total series (asc)", SORT_BY_TOTAL_SERIES_ASC, "icon-sort-by-series-asc"),
        buildSortVariantItem(store, 3, "Sort by total series (desc)", SORT_BY_TOTAL_SERIES_DESC, "icon-sort-by-series-desc"),
        buildSortVariantItem(store, 4, "Sort by score (asc)", SORT_BY_SCORE_ASC, "icon-sort-by-score-asc"),
        buildSortVariantItem(store, 5, "Sort by score (desc)", SORT_BY_SCORE_DESC, "icon-sort-by-score-desc"),
    ];
    const activeIndex = sortVariantNameToIndexMap[store.sortField];
    result[activeIndex] = React.cloneElement(
        result[activeIndex],
        {className: "active", onClick: null}
    );
    return result;
}

const SortVariantSelector = observer(({store}) => (
    <div className="sort-variant-list">
        {buildSortVariantList(store)}
    </div>
));

export default SortVariantSelector;