import React, { useState } from "react";
import Input from "../Controls/Input";
import Toggle from "../Controls/Toggle";
import LeftMenuPopup from "./LeftMenuPopup";
import "./style/OptionsPopup.css";
import SettingsStore from "../../store/SettingsStore";
import { observer } from "mobx-react-lite";
import Switch from "../Controls/Switch";

const OptionsPopup = observer(() => {
    return (
        <LeftMenuPopup iconName="icon-cog" title="Setup background image">
            <div className="options-toggles">
                <h3>List options</h3>
                <div>
                    <Switch
                        active={SettingsStore.global.cardTitleLang}
                        variants={{ ru: 'RU', en: 'EN', jp: 'JP' }}
                        onChange={langKey => SettingsStore.global.setCardTitleLang(langKey)}
                    >
                        Lang of card title
                    </Switch>

                    <Toggle 
                        checked={SettingsStore.global.useAccentBlur} 
                        onChange={needUse => SettingsStore.global.setUsingAccentBlur(needUse)}
                    >
                        Use accent blure
                    </Toggle>

                    <Toggle
                        checked={SettingsStore.global.useItemHighlite} 
                        onChange={needUse => SettingsStore.global.setUsingItemHighlite(needUse)}
                    >
                        Use item highlight
                    </Toggle>
                </div>
            </div>
        </LeftMenuPopup>
    )
});

export default OptionsPopup;