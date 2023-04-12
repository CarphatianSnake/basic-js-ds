const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rt = null;
  }

  root() {
    return this.rt;
  }

  add(data) {
    this.rt = addData(this.rt, data);

    function addData(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = addData(node.left, value);
      } else {
        node.right = addData(node.right, value);
      }
      return node;
    }
  }

  checkData(node, data, type) {
    if (!node) {
      return type === "has" ? false : null;
    }
    if (data === node.data) {
      return type === "has" ? true : node;
    }
    if (data < node.data) {
      return this.checkData(node.left, data, type);
    } else {
      return this.checkData(node.right, data, type);
    }
  }

  has(data) {
    return this.checkData(this.rt, data, "has");
  }

  find(data) {
    return this.checkData(this.rt, data, "find");
  }

  remove(data) {
    this.rt = removeNode(this.rt, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let maxFromLeft = node.left;
        while(maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        node.left = removeNode(node.left, maxFromLeft.data);

        return node;
      }

    }
  }

  min() {
    let current = this.rt;
    while(current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.rt;
    while(current.right) {
      current = current.right;
    }
    return current.data;
  }
}

const tree = new BinarySearchTree();
tree.add(123);
tree.add(25);
tree.add(1);
tree.add(15);
tree.add(333);
console.log(tree.has(33));

module.exports = {
  BinarySearchTree
};