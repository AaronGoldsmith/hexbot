import React from "react";
import "./BubbleColor.css";

const BubbleColor = props => {
  const { size } = props;
  return (
    <div
      className="boxColor"
      onClick={props.handleClick}
      style={{ width: size, height: size, ...props }}
    />
  );
};
export default BubbleColor;
