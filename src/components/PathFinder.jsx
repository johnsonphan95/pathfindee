import React, { useState, useEffect } from "react";
import Node from "./Node";
import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL,
  createNode
} from "../utils/util";
import {
  dijkstra,
  getNodesInShortestPathOrder
} from "../utils/algorithms/dijkstra";

import "./PathFinder.css";

const Visualizer = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const curr = [];
      for (let col = 0; col < 20; col++) {
        curr.push(createNode(row, col));
      }
      grid.push(curr);
    }
    return grid;
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = nodesInShortestPathOrder => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_COL][START_NODE_ROW];
    console.log(startNode);
    const finishNode = grid[END_NODE_COL][END_NODE_ROW];
    if (startNode.visited && finishNode.visited) return;
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const displayGrid = () => {
    return grid.map((col, colIdx) => (
      <div className="col" key={colIdx}>
        {col.map((node, rowIdx) => {
          const { row, col, end, start, wall } = node;
          return (
            <Node
              key={colIdx}
              row={rowIdx}
              col={colIdx}
              start={start}
              end={end}
              wall={wall}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">{displayGrid()}</div>
    </div>
  );
};

export default Visualizer;
