import { Compiler } from "./compiler.abstract";

export class BESCToJSCompiler extends Compiler {
  constructor() {
    super();
    this.dict = {
      ...this.dict,
    };
  }
}
