import React from "react";
import "./style/Button.css";

const Button = props => <button {...props} className={"base-button " + (props.className ? props.className : "")}></button>; 

export default Button;