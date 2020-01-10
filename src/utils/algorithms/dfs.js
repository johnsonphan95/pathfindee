export function depthFirstSearch(grid, startNode, endNode) {
  const array = [startNode];
  let visitedNodes;
  const dfs = node => {
    if (node.visited || node.wall) {
      return;
    }
    if (node.end) {
      visitedNodes = array.slice();
    }
    const col = node.col;
    const row = node.row;
    array.push(node);
    node.visited = true;
    if (row > 0) dfs(grid[col][row - 1]);
    if (col < grid.length - 1) dfs(grid[col + 1][row]);
    if (row < grid[0].length - 1) dfs(grid[col][row + 1]);
    if (col > 0) dfs(grid[col - 1][row]);
  };
  dfs(startNode);
  return visitedNodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
