/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;

    function minDepthHelper(node) {
      if(node.left === null && node.right === null) return 1;
      if(node.right === null) return minDepth(node.left) + 1;
      if(node.left === null) return minDepth(node.right) + 1;

      return (
        Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
      )
    }

    return minDepthHelper(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root) return 0;

    function maxDepthHelper(node) {
      if(node.left === null && node.right === null) return 1;
      if(node.left === null) return maxDepthHelper(node.right) + 1;
      if(node.right === null) return maxDepthHelper(node.left) + 1;

      return(
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      ) 
    }
    return maxDepthHelper(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    

    let sum = 0;

    function maxSumHelper(node) {
      if(node === null) return 0;

      const left = maxSumHelper(node.left);
      const right = maxSumHelper(node.right);
      sum = Math.max(sum, node.val + left + right)
      return Math.max(0, left + node.val, right + node.val)
    }

    maxSumHelper(this.root)
    return sum
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;

    let queue = [this.root];
    let closest = null;

    while(queue.length){
      let currentNode = queue.shift()
      let currentValue = currentNode.val;
      let higherThenLowerBound = currentValue > lowerBound;
      let shouldReassignClosest = currentValue < closest || closest === null;

      if(higherThenLowerBound && shouldReassignClosest) {
        closest = currentValue;
      }

      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right)
    }
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if(node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFInd,
      currentNode,
      level = 0,
      data = {level:0, parent:null}
    ) {
      if(data.parent) return data;
      if(currentNode.left === nodeToFInd || currentNode.right === nodeToFInd){
        data.level = level + 1;
        data.parent = currentNode;
      }
      if(currentNode.left){
        findLevelAndParent(nodeToFInd, currentNode.left, level+1, data)
      }
      if(currentNode.right){
        findLevelAndParent(nodeToFInd, currentNode.right, level+1, data)
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root)
    let node2Info = findLevelAndParent(node2, this.root)

    let sameLevel = node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents = node1Info && node2Info && node1Info.parent !== node2Info.parent;

    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const vals = [];

    function traverse(node){
      if(node){
        vals.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }else{
        vals.push('#')
      }
    }

    traverse(tree.root);
    return vals.join(' ');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(strTree) {
    if(!strTree) return null;

    const values = strTree.split(" ");

    function buildTree(){
      if(values.length) {
        const currentValue = values.shift();
        if(currentValue === "#") return null

        // convert values back in to numbers
        let currentNode = new BinaryTreeNode(+currentValue);
        currentNode.left = buildTree();
        currentNode.right = buildTree()

        return currentNode;
      }
    }
    const root = buildTree();
    return new BinaryTree(root)
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    if(currentNode === null) return null;

    if(currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if(left !== null && right !== null) return currentNode;

    if(left !== null || right !== null) return left || right;

    if(left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
