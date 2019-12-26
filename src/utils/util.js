export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const END_NODE_ROW = 10;
export const END_NODE_COL = 3;

export const createNode = (row, col) => {
  return {
    row,
    col,
    distance: Infinity,
    prev: null,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isVisited: false,
    isWall: false
  };
};
