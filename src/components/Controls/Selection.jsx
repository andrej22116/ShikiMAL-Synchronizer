import React from "react";
import "./style/Selection.css";

const Selection = props => <select {...props} className={"base-selection " + (props.className ? props.className : "")}></select>; 

export default Selection;