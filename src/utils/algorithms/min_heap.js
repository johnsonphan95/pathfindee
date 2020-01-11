class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx, endIdx, heap) {
    let leftChildIdx = currentIdx * 2 + 1;
    while (leftChildIdx < endIdx) {
      const rightChildIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (
        rightChildIdx !== -1 &&
        heap[rightChildIdx].distance < heap[leftChildIdx].distance
      ) {
        idxToSwap = rightChildIdx;
      } else {
        idxToSwap = leftChildIdx;
      }
      if (heap[idxToSwap].distance < heap[currentIdx].distance) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        leftChildIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (
      currentIdx > 0 &&
      heap[currentIdx].distance < heap[parentIdx].distance
    ) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  insert(node) {
    this.heap.push(node);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, heap) {
    let temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

export default MinHeap;
