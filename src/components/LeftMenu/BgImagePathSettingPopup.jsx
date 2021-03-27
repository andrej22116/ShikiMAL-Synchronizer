import React, { useState } from "react";
import Input from "../Controls/Input";
import Button from "../Controls/Button";
import LeftMenuPopup from "./LeftMenuPopup";
import "./style/BgImagePathSettingPopup.css";
import SettingsStore from "../../store/SettingsStore";

const BgImagePathSettingPopup = () => {
    const [url, setUrl] = useState();

    const setBgImage = () => {
        SettingsStore.global.setBackgroundImage(url);
        setUrl('');
    };

    return (
        <LeftMenuPopup iconName="icon-picture" title="Setup background image">
            <div className="bg-image-path-setting">
                <h3>Setup background image</h3>
                <div>
                    <Input title="Enter image URL to this place" type="text" placeholder="Image URL" value={url} onChange={e => setUrl(e.target.value)} />
                    <Button className="bg-image-path-setting-btn" onClick={() => setBgImage()}>Setup</Button>
                </div>
            </div>
        </LeftMenuPopup>
    )
};

export default BgImagePathSettingPopup;