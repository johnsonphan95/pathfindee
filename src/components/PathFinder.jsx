import React, { useState, useEffect } from "react";
import Node from "./Node";
import NodeObject from "../utils/node";
import { aStar, aStarShortestPath } from "../utils/algorithms/astar";
import { dijkstra, dijkstraShortestPath } from "../utils/algorithms/dijkstra";
import { depthFirstSearch } from "../utils/algorithms/dfs";
import { breadthFirstSearch, bfsShortestPath } from "../utils/algorithms/bfs";
import "./PathFinder.css";

const Visualizer = () => {
  const [grid, setGrid] = useState([]);
  const [finished, setFinished] = useState(false);
  const [finding, setFinding] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [moveStart, setMoveStart] = useState(false);
  const [moveEnd, setMoveEnd] = useState(false);
  const [weighted, setWeighted] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const [coordinates, setCoordinates] = useState({
    START_NODE_COL: 10,
    START_NODE_ROW: 10,
    END_NODE_COL: 30,
    END_NODE_ROW: 10
  });

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const getInitialGrid = () => {
    const grid = [];
    for (let col = 0; col < 40; col++) {
      const curr = [];
      for (let row = 0; row < 20; row++) {
        curr.push(new NodeObject(col, row, coordinates));
      }
      grid.push(curr);
    }
    return grid;
  };

  const getWalledGrid = (col, row) => {
    const newGrid = grid.slice();
    const node = grid[col][row];
    const newNode = {
      ...node,
      wall: !node.wall
    };
    newGrid[col][row] = newNode;
    return newGrid;
  };

  const getNewNodeGrid = (col, row) => {
    const newGrid = grid.slice();
    const node = grid[col][row];
    const newNode = {
      ...node,
      start: moveStart ? true : false,
      end: moveEnd ? true : false
    };
    newGrid[col][row] = newNode;
    return newGrid;
  };

  const getWeightedGrid = (col, row) => {
    const newGrid = grid.slice();
    const node = grid[col][row];
    const newNode = {
      ...node,
      wall: false,
      weight: node.weight === 0 ? 5 : 0
    };
    newGrid[col][row] = newNode;
    return newGrid;
  };

  const toggleWeight = () => {
    if (algorithm === "dijkstra" || algorithm === "a*") {
      weighted ? setWeighted(false) : setWeighted(true);
    }
  };

  const getPaths = (grid, startNode, endNode) => {
    let visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];
    if (algorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(grid, startNode, endNode);
      nodesInShortestPathOrder = dijkstraShortestPath(endNode);
    }
    if (algorithm === "a*") {
      visitedNodesInOrder = aStar(grid, startNode, endNode);
      nodesInShortestPathOrder = aStarShortestPath(endNode);
    }
    if (algorithm === "dfs") {
      visitedNodesInOrder = depthFirstSearch(grid, startNode, endNode);
      nodesInShortestPathOrder = visitedNodesInOrder;
    }
    if (algorithm === "bfs") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, endNode);
      nodesInShortestPathOrder = bfsShortestPath(endNode);
    }
    return [visitedNodesInOrder, nodesInShortestPathOrder];
  };

  const changeAlgorithm = e => {
    e.preventDefault();
    setAlgorithm(e.target.id);
    const newGrid = grid.slice();
    if (e.target.id === "dijkstra" || e.target.id === "a*") {
      newGrid.map(col =>
        col.map(node => {
          node.visited = false;
          node.distance = 0;
          node.seen = false;
          node.prev = null;
        })
      );
    } else {
      newGrid.map(col =>
        col.map(node => {
          node.visited = false;
          node.weight = 0;
        })
      );
    }
    setGrid(newGrid);
  };

  const resetGrid = () => {
    if (!finished) return;
    let visited = document.getElementsByClassName("node-visited");
    while (visited.length) {
      visited[0].className = "node";
    }
    document.getElementById(
      `${coordinates.START_NODE_ROW}-${coordinates.START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(
      `${coordinates.END_NODE_ROW}-${coordinates.END_NODE_COL}`
    ).className = "node node-end";
    const newGrid = [];
    for (let col = 0; col < 40; col++) {
      const curr = [];
      for (let row = 0; row < 20; row++) {
        curr.push(new NodeObject(col, row, coordinates));
      }
      newGrid.push(curr);
    }
    setFinished(false);
    setGrid(newGrid);
  };

  const animateAlgorithm = paths => {
    const visitedNodesInOrder = paths[0];
    const nodesInShortestPathOrder = paths[1];
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className +=
          " " + "node-visited";
      }, 20 * i);
    }
  };

  const animateShortestPath = nodesInShortestPathOrder => {
    const delay = algorithm === "dfs" ? 20 : 50;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        if (i === nodesInShortestPathOrder.length - 1) {
          setFinished(true);
          setFinding(false);
        }
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).className +=
          " " + "node node-shortest-path";
      }, delay * i);
    }
  };

  const visualizeAlgorithm = () => {
    setFinding(true);
    const {
      START_NODE_ROW,
      START_NODE_COL,
      END_NODE_ROW,
      END_NODE_COL
    } = coordinates;
    const startNode = grid[START_NODE_COL][START_NODE_ROW];
    const endNode = grid[END_NODE_COL][END_NODE_ROW];
    if (startNode.visited && endNode.visited) return;
    const paths = getPaths(grid, startNode, endNode);
    animateAlgorithm(paths);
  };

  const getAlgorithmName = () => {
    if (algorithm === "") {
      return "Choose an Algorithm";
    }
    if (algorithm === "a*") {
      return "A*";
    }
    if (algorithm === "dijkstra") {
      return "Dijkstra's";
    }
    if (algorithm === "dfs") {
      return "Depth First Search";
    }
    if (algorithm === "bfs") {
      return "Breadth First Search";
    }
  };

  const getWeightButton = () => {
    const style = {
      display:
        algorithm === "dijkstra"
          ? "initial"
          : algorithm === "a*"
          ? "initial"
          : "none",
      background: weighted ? "#e7f2f8" : "#74bdcb",
      color: weighted ? "#74bdcb" : "#e7f2f8"
    };

    return (
      <button className="button" style={style} onClick={() => toggleWeight()}>
        Weighted Node
      </button>
    );
  };

  const getMainButton = () => {
    let text;
    let func;

    const noAlgoAlert = () => {
      alert("Choose an Algorithm!");
    };

    if (algorithm === "") {
      text = "Choose an Algorithm!";
      func = noAlgoAlert;
    } else if (finished || finding) {
      text = "Reset";
      func = resetGrid;
    } else {
      text = `Visualize ${getAlgorithmName()}`;
      func = visualizeAlgorithm;
    }

    return (
      <button className="button" onClick={() => func()}>
        {text}
      </button>
    );
  };

  const handleMouseDown = (col, row) => {
    if (finding) {
      return;
    }
    if (grid[col][row].start) {
      setMoveStart(true);
    } else if (grid[col][row].end) {
      setMoveEnd(true);
    } else if (weighted) {
      const newGrid = getWeightedGrid(col, row);
      setGrid(newGrid);
    } else {
      const newGrid = getWalledGrid(col, row);
      setGrid(newGrid);
    }
    setMouseDown(true);
  };

  const handleMouseEnter = (col, row) => {
    let newGrid;
    let newCoordinates = Object.assign({}, coordinates);
    if (!mouseDown) return;
    if (!moveStart && !moveEnd) {
      newGrid = getWalledGrid(col, row);
    }
    if (moveStart) {
      newGrid = getNewNodeGrid(col, row);
      newCoordinates.START_NODE_COL = col;
      newCoordinates.START_NODE_ROW = row;
      setCoordinates(newCoordinates);
    }
    if (moveEnd) {
      newGrid = getNewNodeGrid(col, row);
      newCoordinates.END_NODE_COL = col;
      newCoordinates.END_NODE_ROW = row;
      setCoordinates(newCoordinates);
    }
    if (weighted) {
      newGrid = getWeightedGrid(col, row);
    }
    setGrid(newGrid);
  };

  const handleMouseLeave = (col, row) => {
    if (!mouseDown) return;
    if (moveStart || moveEnd) {
      const newGrid = grid.slice();
      const node = grid[col][row];
      const newNode = {
        ...node,
        start: false,
        end: false
      };
      newGrid[col][row] = newNode;
      return newGrid;
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMoveStart(false);
    setMoveEnd(false);
  };

  const displayGrid = () => {
    return grid.map((col, colIdx) => (
      <div className="col" key={colIdx}>
        {col.map(node => {
          const { row, col, end, start, wall, weight } = node;
          return (
            <Node
              key={row}
              row={row}
              col={col}
              start={start}
              end={end}
              wall={wall}
              weight={weight}
              mouseDown={mouseDown}
              onMouseDown={(col, row) => handleMouseDown(col, row)}
              onMouseEnter={(col, row) => handleMouseEnter(col, row)}
              onMouseLeave={(col, row) => handleMouseLeave(col, row)}
              onMouseUp={() => handleMouseUp()}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <div className="navbar">
        <p className="logo">Pathfindee</p>
        <div className="buttons">
          <button className="dropdown">
            &#9660; Algorithms &#9660;
            <div className="dropdown-content">
              <div id="a*" defaultValue onClick={e => changeAlgorithm(e)}>
                A* Algorithm
              </div>
              <div id="dijkstra" defaultValue onClick={e => changeAlgorithm(e)}>
                Dijkstra's Algorithm
              </div>
              <div id="dfs" onClick={e => changeAlgorithm(e)}>
                Depth First Search
              </div>
              <div id="bfs" onClick={e => changeAlgorithm(e)}>
                Breadth First Search
              </div>
            </div>
          </button>
          {getMainButton()}
          {getWeightButton()}
        </div>
        <div className="legend" style={{ display: "flex" }}>
          <div style={{ color: "black" }}>&#9679;</div>
          <label>weighted </label>
          <div style={{ color: "#81894e" }}>&#9632;</div>
          <label>start </label>
          <div style={{ color: "#de98ab" }}>&#9632;</div>
          <label>end</label>
        </div>
      </div>
      <div className="grid">{displayGrid()}</div>
    </div>
  );
};

export default Visualizer;
