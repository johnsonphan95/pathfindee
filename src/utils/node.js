import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL
} from "./constants";

class NodeObject {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.visited = false;
    this.distance = Infinity;
    this.prev = null;
    this.start = this.row === START_NODE_ROW && this.col === START_NODE_COL;
    this.end = this.row === END_NODE_ROW && this.col === END_NODE_COL;
    this.wall = false;
    this.seen = false;
  }
}

export default NodeObject;
