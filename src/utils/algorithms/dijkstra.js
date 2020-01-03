import MinHeap from "./min_heap";

export const dijkstra = (grid, startNode, endNode) => {
  const visitedNodes = [];
  startNode.distance = 0;
  const heap = new MinHeap([startNode]);
  while (heap) {
    const node = heap.remove();
    console.log(node);
    if (!node) return visitedNodes;
    if (node.distance === Infinity) return visitedNodes;
    node.visited = true;
    visitedNodes.push(node);
    if (node === endNode) return visitedNodes;
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    unvisitedNeighbors.forEach(neighbor => {
      if (neighbor.seen || neighbor.wall) return;
      neighbor.seen = true;
      neighbor.distance = node.distance + 1;
      neighbor.prev = node;
      heap.insert(neighbor);
    });
  }
  return visitedNodes;
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]);
  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < grid.length - 1) neighbors.push(grid[col + 1][row]);
  return neighbors.filter(neighbor => !neighbor.visited && !neighbor.wall);
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
