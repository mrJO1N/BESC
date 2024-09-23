import { Validator } from "../validators/abstract.valid";
import { Compiler } from "./compiler.abstract";

export class BFToJSCompiler extends Compiler {
  constructor(validator: Validator) {
    super(validator);
    this.dict = {
      ...this.dict,

      "start with": () => "let output='',lastInputIndex=0;",
      "end with": () => "return output;",

      ",": (count = 1) =>
        `lastInputIndex+=${count};charCode=String(input).charCodeAt(lastInputIndex-1);mem[pointer]=Number.isNaN(charCode)?0:charCode;`,
      ".": (count = 1) =>
        `output+=String.fromCharCode(mem[pointer]).repeat(${count});`,
    };
  }
}
