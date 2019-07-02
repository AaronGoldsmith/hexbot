import React from "react";
import "./Input.css";
// uncontrolled input component
function Input(props) {
  return (
    <div className="textInput" id={props.id}>
      <input
        type="text"
        name={props.name}
        onChange={props.updateVal}
        onKeyPress={props.checkEnter}
        placeholder={props.text}
      />
    </div>
  );
}
export default Input;
