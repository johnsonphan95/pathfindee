import React from "react";
import "./Node.css";

const Node = ({ row, col, start, end, wall }) => {
  const attributes = end
    ? "node-end"
    : start
    ? "node-start"
    : wall
    ? "node-wall"
    : "";
  return <div id={`${row}-${col}`} className={`node ${attributes}`}></div>;
};

export default Node;
