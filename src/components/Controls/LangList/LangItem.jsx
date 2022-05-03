import React from "react";

const LangItem = props => {
    const name = props.name.toUpperCase();



    return (
        <button className="lang-item">
            {name}
        </button>
    );
};

export default LangItem;