import React, { useState } from "react";
import Input from "../Controls/Input";
import Toggle from "../Controls/Toggle";
import LeftMenuPopup from "./LeftMenuPopup";
import "./style/OptionsPopup.css";
import SettingsStore from "../../store/SettingsStore";
import { observer } from "mobx-react-lite";

const OptionsPopup = observer(() => {
    return (
        <LeftMenuPopup iconName="icon-cog" title="Setup background image">
            <div className="options-toggles">
                <h3>List options</h3>
                <div>
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