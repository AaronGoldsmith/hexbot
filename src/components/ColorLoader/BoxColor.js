import React from "react";
import "./BoxColor.css";

const BoxColor = props => {
  const { size } = props;
  return (
    <div
      className="boxColor"
      onClick={props.handleClick}
      style={{ width: size, height: size, ...props }}
    />
  );
};
export default BoxColor;
