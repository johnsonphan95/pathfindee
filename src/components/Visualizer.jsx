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
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const getInitialGrid = () => {
    const grid = [];
    for (let col = 0; col < 50; col++) {
      const curr = [];
      for (let row = 0; row < 20; row++) {
        curr.push(createNode(row, col));
      }
      grid.push(curr);
    }
    return grid;
  };

  const displayGrid = () => {
    return grid.map((row, rowIdx) => (
      <div className="row" key={rowIdx}>
        {row.map((node, nodeIdx) => {
          const { row, col, isEnd, isStart, isWall } = node;
          return (
            <Node
              key={nodeIdx}
              row={row}
              col={col}
              isStart={isStart}
              isEnd={isEnd}
              isWall={isWall}
            />
          );
        })}
      </div>
    ));
  };

  return <div className="grid">{displayGrid()}</div>;
};

export default Visualizer;
