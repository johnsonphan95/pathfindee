export function breadthFirstSearch(grid, startNode, endNode) {
  const queue = [startNode];
  const visitedNodes = [];
  while (queue.length) {
    const node = queue.shift();
    if (node.visited || node.wall) {
      continue;
    }
    node.visited = true;
    visitedNodes.push(node);
    if (node === endNode) return visitedNodes;
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      queue.push(neighbor);
      neighbor.prev = node;
    }
  }
  return visitedNodes;
}

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[col][row + 1]);
  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < grid.length - 1) neighbors.push(grid[col + 1][row]);
  return neighbors.filter(neighbor => !neighbor.visited && !neighbor.wall);
};

export const bfsShortestPath = endNode => {
  const shortestPath = [];
  let node = endNode;
  while (node !== null) {
    shortestPath.unshift(node);
    node = node.prev;
  }
  return shortestPath;
};
