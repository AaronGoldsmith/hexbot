import React from "react";
import "./Input.css";
// uncontrolled input component
function Input(props) {
  return (
    <form className="textInput" autoComplete="off" id={props.id}>
      <input autoComplete="false" className="hide" name="hidden" type="text" />
      <input
        type="text"
        name={props.name}
        onChange={props.updateVal}
        onKeyPress={props.checkEnter}
        placeholder={props.text}
      />
    </form>
  );
}
export default Input;
