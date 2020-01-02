import React from "react";
import "./Node.css";

const Node = ({
  row,
  col,
  start,
  end,
  wall,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}) => {
  const attributes = end
    ? "node-end"
    : start
    ? "node-start"
    : wall
    ? "node-wall"
    : "";
  return (
    <div
      id={`${row}-${col}`}
      className={`node ${attributes}`}
      onMouseDown={() => onMouseDown(col, row)}
      onMouseEnter={() => onMouseEnter(col, row)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
