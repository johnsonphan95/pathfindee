export const START_NODE_ROW = 10;
export const START_NODE_COL = 3;
export const END_NODE_ROW = 10;
export const END_NODE_COL = 15;

export const createNode = (row, col) => {
  return {
    row,
    col,
    visited: false,
    distance: Infinity,
    prev: null,
    start: row === START_NODE_ROW && col === START_NODE_COL,
    end: row === END_NODE_ROW && col === END_NODE_COL,
    wall: false,
    seen: false
  };
};
