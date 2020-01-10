import React from "react";
import "./Node.css";

const Node = ({
  row,
  col,
  start,
  end,
  wall,
  weight,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseLeave
}) => {
  const attributes = end
    ? "node-end"
    : start
    ? "node-start"
    : weight > 0
    ? "node-weight"
    : wall
    ? "node-wall"
    : "";
  return (
    <div
      id={`${row}-${col}`}
      className={`node ${attributes}`}
      onMouseDown={() => onMouseDown(col, row)}
      onMouseEnter={() => onMouseEnter(col, row)}
      onMouseLeave={() => onMouseLeave(col, row)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
