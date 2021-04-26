/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if(!this.root) return 0;
 
    let result = 0;
    const toVisitStack = [this.root];
    while (toVisitStack.length){
      const currnet = toVisitStack.pop();
      if(currnet.val !== null){
        result += currnet.val;
      }
      for(let chield of currnet.children){
        toVisitStack.push(chield);
      }
    }
    return result;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if(!this.root) return 0;
 
    let result = 0;
    const toVisitStack = [this.root];
    while (toVisitStack.length){
      const currnet = toVisitStack.pop();
      if(currnet.val % 2 === 0){
        result += 1;
      }
      for(let chield of currnet.children){
        toVisitStack.push(chield);
      }
    }
    return result;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if(!this.root) return 0;
 
    let result = 0;
    const toVisitStack = [this.root];
    while (toVisitStack.length){
      const currnet = toVisitStack.pop();
      if(currnet.val > lowerBound){
        result += 1;
      }
      for(let chield of currnet.children){
        toVisitStack.push(chield);
      }
    }
    return result;
  }
}

module.exports = { Tree, TreeNode };
