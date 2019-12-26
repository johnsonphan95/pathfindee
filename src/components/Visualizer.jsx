import React, { useState, useEffect } from "react";
import Node from "./Node";
import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL,
  createNode
} from "../utils/util";

import "./Visualizer.css";

const Visualizer = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    setInitialGrid();
  }, [grid]);

  const setInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const curr = [];
      for (let col = 0; col < 50; col++) {
        curr.push(createNode(row, col));
      }
      grid.push(curr);
    }
    setGrid(grid);
  };

  const displayGrid = () => {
    return grid.map((row, rowIdx) => (
      <div key={rowIdx}>
        {row.map((node, nodeIdx) => (
          <Node key={nodeIdx} node={node} />
        ))}
      </div>
    ));
  };

  return <div className="grid">{displayGrid()}</div>;
};

export default Visualizer;
