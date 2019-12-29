import MinHeap from "./min_heap";

export const dijkstra = (grid, startNode, endNode) => {
  const visitedNodes = [];
  startNode.distance = 0;
  const heap = new MinHeap([startNode]);
  while (heap) {
    const node = heap.remove();
    if (node.wall) continue;
    if (node.distance === Infinity) return visitedNodes;
    node.visited = true;
    visitedNodes.push(node);
    if (node === endNode) return visitedNodes;
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    unvisitedNeighbors.forEach(neighbor => {
      if (neighbor.seen) return;
      neighbor.seen = true;
      neighbor.distance = node.distance + 1;
      neighbor.prev = node;
      heap.insert(neighbor);
    });
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.visited);
};

export const getNodesInShortestPathOrder = endNode => {
  const shortestPath = [];
  let node = endNode;
  while (node !== null) {
    shortestPath.unshift(node);
    node = node.prev;
  }
  return shortestPath;
};
