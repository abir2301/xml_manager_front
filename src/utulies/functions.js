// eslint-disable-next-line no-undef
const { create } = require("xmlbuilder2");

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

  // schemaToXSD(schema) {
  //   // Create an XML builder
  //   const xml = create();

  //   // Define the XML schema structure
  //   const xsd = xml.ele("xs:schema", {
  //     xmlns: "http://www.w3.org/2001/XMLSchema",
  //   });

  //   function convertToXML(parentElement, data) {
  //     for (const item of data) {
  //       const element = parentElement.ele("xs:element", { name: item.name });
  //       if (item.childrens.length == 0) {
  //         element.att("type", item.type);
  //       }
  //       if (item.is_attribute) {
  //         const attribute = parentElement.ele("xs:attribute", {
  //           name: item.name,
  //         });
  //         attribute.att("type", item.type);
  //       } else {
  //         if (item.childrens.length >= 1) {
  //           const complexType = element.ele("xs:complexType");
  //           const sequence = complexType.ele("xs:sequence");

  //           if (item.childrens && item.childrens.length > 0) {
  //             convertToXML(sequence, item.childrens);
  //           }
  //         }
  //       }
  //     }
  //   }

  //   convertToXML(xsd, schema.data);

  //   const xsdString = xml.end({ prettyPrint: true });

  //   const filePath = `schema_v${schema.version}.xsd`;
  //   fs.writeFileSync(filePath, xsdString, "utf-8");

  //   console.log(`Schema exported to ${filePath}`);
  // }
}

export default new Fn();
