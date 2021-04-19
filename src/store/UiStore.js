import { makeAutoObservable } from "mobx";

const animeListGridItemProfileGenerator = (
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft
) => ({
    size: { width, height },
    margin: {
        top: marginTop,
        left: marginLeft,
        right: marginRight,
        bottom: marginBottom
    },
    finalSize: {
        width: width + marginLeft + marginRight,
        height: height + marginTop + marginBottom
    }
});
export const ANIME_LIST_GRID_PROFILE_TYPE_NAME = "grid";
const c_animeListGridItemProfileMap = {
    large: animeListGridItemProfileGenerator(300, 426, 24, 8, 24, 8),
    medium: animeListGridItemProfileGenerator(300, 426, 24, 8, 24, 8),
    small: animeListGridItemProfileGenerator(300, 426, 24, 8, 24, 8),
}

export const MENU_BAR_WIDTH = 30;
export const UI_DEVICE_FORMATS = {
    DESKTOP: 0,
    MOBILE: 1
};

const UiStore = makeAutoObservable({
    animeListStyleProfileType: ANIME_LIST_GRID_PROFILE_TYPE_NAME,
    animeListStyleProfile: c_animeListGridItemProfileMap.large,
    windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    workspaceSize: {
        width: window.innerWidth - MENU_BAR_WIDTH,
        height: window.innerHeight
    },
    uiDeviceFormat: UI_DEVICE_FORMATS.DESKTOP,
    updateWindowSize(width, height) {
        this.windowSize.width = width;
        this.windowSize.height = height;
        this.workspaceSize.width = width - MENU_BAR_WIDTH;
        this.workspaceSize.height = height;
    },
});

window.addEventListener("resize", () => {
    UiStore.updateWindowSize(window.innerWidth, window.innerHeight);
});

export default UiStore;