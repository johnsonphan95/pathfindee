import React, { useEffect, useState } from "react";
import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL
} from "../utils/util";

import "./Node.css";

export default Node = props => {
  const { row, col, isStart, isEnd, isWall } = props;
  const attributes = isEnd
    ? "node-end"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return <div id={`${row}-${col}`} className={`node ${attributes}`}></div>;
};
