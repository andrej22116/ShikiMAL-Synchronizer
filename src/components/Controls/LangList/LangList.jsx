import React from "react";

const LangList = props => {

    return (
        <div className="lang-list">
            <label className="lang-list-title">
                {props.title || 'Language'}
            </label>

            <div className="lang-list-wrap">
                {props.children}
            </div>
        </div>
    );
};

export default LangList;