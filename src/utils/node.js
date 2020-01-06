class NodeObject {
  constructor(col, row, coordinates) {
    this.col = col;
    this.row = row;
    this.visited = false;
    this.distance = Infinity;
    this.prev = null;
    this.start =
      this.row === coordinates.START_NODE_ROW &&
      this.col === coordinates.START_NODE_COL;
    this.end =
      this.row === coordinates.END_NODE_ROW &&
      this.col === coordinates.END_NODE_COL;
    this.wall = false;
    this.seen = false;
  }
}

export default NodeObject;
