import { Compiler } from "./compiler.abstract";

export class BFToJSCompiler extends Compiler {
  constructor() {
    super();
    this.dict = {
      ...this.dict,

      "start with": "let output='',lastInputIndex=0;",
      "end with": "return output",

      ",": "charCode=String(input).charCodeAt(lastInputIndex++);mem[pointer]=Number.isNaN(charCode)?0:charCode;",
      ".": "output+=String.fromCharCode(mem[pointer]);",
    };
  }
}

// function anonymous() {
//   // start
//   const mem = Array(30_000).fill(0);
//   let pointer = 0;

//   let output = "",
//     input = "",
//     lastInputIndex = 0;
//   //

//   // [
//   while (mem[pointer] !== 0) {
//     let charCode;
//     //

//     // ,
//     charCode = String(input).charCodeAt(lastInputIndex++);
//     mem[pointer] = Number.isNaN(charCode) ? 0 : charCode;
//     //

//     // .
//     output += String.fromCharCode(mem[pointer]);
//     //

//     // >
//     pointer++;
//     //

//     // <
//     pointer--;
//     //

//     // +
//     mem[pointer]++;
//     //

//     // -
//     mem[pointer]--;
//     //

//     // ]
//   }
//   //
//   // end
//   return output;
//   //
// }
