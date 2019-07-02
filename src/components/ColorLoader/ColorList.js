import React from "react";
import BubbleColor from "./BubbleColor";

export const ColorList = ({ colorsPicked }) => {
  console.log(colorsPicked);
  return (
    colorsPicked &&
    colorsPicked.map((color, i) => (
      <BubbleColor
        key={`select-${i}`}
        backgroundColor={color}
        handleClick={() => {}}
      />
    ))
  );
};
