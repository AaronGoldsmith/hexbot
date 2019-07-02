import React from "react";

// icons used from https://materialdesignicons.com/
const plus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const minus = "M19,13H5V11H19V13Z";

const Icon = props => (
  <div className="icon" onClick={props.handleClick}>
    <svg width={24} height={24} viewBox="0 0 24 24">
      <path
        opacity={props.opacity || 1}
        fill={props.color || "#000"}
        d={props.expanded ? minus : plus}
      />
      )}
    </svg>
  </div>
);
export default Icon;
