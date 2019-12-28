export const dijkstra = (grid, start, end) => {
  const visitedNodes = [];
  start.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const next = unvisitedNodes.shift();
    if (next.distance === Infinity) return visitedNodes;
    next.isVisited = true;
    visitedNodes.push(next);
    if (next === end) return visitedNodes;
    updateUnvisitedNeighbors(next, grid);
  }
};

const getAllNodes = grid => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = unvisitedNodes => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const node of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.prev = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = now;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

export const getNodesInShortestPathOrder = end => {
  const shortestPath = [];
  let node = end;
  while (node !== null) {
    shortestPath.unshift(node);
    node = node.prev;
  }
  return shortestPath;
};
