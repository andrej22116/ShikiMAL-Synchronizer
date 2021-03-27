import React from "react";
import "./style/LeftMenuPopup.css";

const LeftMenuPopup = ({iconName, children, title}) => {
    return (
        <div className="left-menu-popup" title={title}>
            <div className="left-menu-popup-icon"><i className={iconName}></i></div>
            <div className="left-menu-popup-wrap">
                {React.Children.toArray(children)}
            </div>
        </div>
    );
};

export default LeftMenuPopup;