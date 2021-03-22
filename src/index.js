const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

var code = `
  const answer = 42; 
  async function log(value){
    console.log('value:', value)
  }
`;
// 分词--token 数组
const tokens = esprima.tokenize(code);
console.log("tokens:", tokens);

// 生成ast树，类似@babel/parser（前身babylon）的功能。

const ast = esprima.parseScript(code);

// 遍历AST 类似 @babel/traverse的功能，在此过程中对节点进行添加、更新及移除等操作，生成新的ast
estraverse.traverse(ast, {
  enter(node) {
    console.log("enter", node.type);
    // 修改变量名
    if (node.kind === "const") {
      node.kind = "var"; // 在此做修改
    }
  },
  leave(node) {
    console.log("leave", node.type);
  }
});

// 编译修改后的ast， 类似 @babel/generator
let compileTreeJS = escodegen.generate(ast);
console.log(compileTreeJS);
