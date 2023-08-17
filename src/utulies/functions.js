// eslint-disable-next-line no-undef
const CryptoJS = require("crypto-js");

class Fn {
  getParent(data, parentId) {
    for (const node of data) {
      const childrens = node.childrens;
      if (node._id == parentId) {
        return node;
      }
      for (const subNode of childrens) {
        if (subNode._id !== parentId) {
          const result = this.getParent(childrens, parentId); // Use "this" to refer to the current instance of the class
          if (result !== null) {
            return result; // Return the result of the recursive call
          }
        } else {
          console.log(subNode);
          return subNode;
        }
      }
    }
    return null;
  }
  generateUniqueId() {
    const randomBytes = CryptoJS.lib.WordArray.random(8); // Generates 8 random bytes
    return randomBytes.toString(CryptoJS.enc.Hex); // Converts the bytes to a hexadecimal string
  }
}

export default new Fn();
