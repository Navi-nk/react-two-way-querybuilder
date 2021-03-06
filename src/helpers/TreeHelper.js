export default class TreeHelper {
  constructor(data) {
    this.data = data;
  }

  //this is changed as earlier the new node number was taken as max of rules array + 1 which will cause conflict if 
  // any rule apart from the last gets deleted
  generateNodeName(node) {
    if (node.rules.length > 0) {
      var childNodeName = node.rules[node.rules.length - 1].nodeName;
      var childNodeNumber = childNodeName.split('/').splice(-1)[0];
      return `${node.nodeName}/${childNodeNumber + 1}`;
    }
    return `${node.nodeName}/${node.rules.length + 1}`;
  }

  removeNodeByName(index) {
    this.removeNode(this.data, index, 0);
    return this.data;
  }

  getNodeByName(name) {
    return this.getNode(this.data, name);
  }

  removeNode(data, name) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        if (property === 'rules') {
          for (let i = 0; i < data.rules.length; i += 1) {
            if (data.rules[i].nodeName === name) {
              data.rules.splice(i, 1);
              return;
            } else if (data.rules[i].combinator) {
              this.removeNode(data.rules[i], name);
            }
          }
        }
      }
    }
  }

  getNode(treeData, name) {
    if (name === '1') {
      return treeData;
    }
    for (const property in treeData) {
      if (treeData.hasOwnProperty(property)) {
        if (property === 'rules') {
          let node = null;
          for (let i = 0; i < treeData.rules.length; i += 1) {
            if (treeData.rules[i].nodeName === name) {
              node = treeData.rules[i];
            } else if (treeData.rules[i].combinator && node === null) {
              node = this.getNode(treeData.rules[i], name);
            }
          }
          return node;
        }
      }
    }
  }
}
