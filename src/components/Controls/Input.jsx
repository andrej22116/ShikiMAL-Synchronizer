import React from "react";
import "./style/Input.css";

const Input = props => <input {...props} className={"base-input " + (props.className ? props.className : "")}/>; 

export default Input;