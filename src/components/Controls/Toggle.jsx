import React from "react";
import "./style/Toggle.css";

const Toggle = props => {
    const classList = ["base-toggle"];
    let checked = false;

    if ( props.checked ) {
        classList.push("checked");
        checked = true;
    }
    if ( props.className ) {
        classList.push(props.className);
    }

    return (
        <div 
            {...props}
            className={classList.join(" ")}
        >
            <div 
                onClick={() => { if (props.onChange) props.onChange(!checked) }}
            >
                {
                    checked
                    ? <div key="on" className="checked"></div>
                    : <div key="off" className="not-checked"></div>
                }
            </div>
            <p>{React.Children.toArray(props.children)}</p>
        </div>
    );
};

export default Toggle;