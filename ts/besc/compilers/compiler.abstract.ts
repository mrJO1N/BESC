import { TOneTypeObject } from "../utils/types";

export abstract class Compiler {
  protected dict: TDict = {};

  constructor() {
    this.dict = {
      ...this.dict,
      "[": "while(mem[pointer]!==0){let charCode;",
      "]": "}",
      "+": "mem[pointer]++;",
      "-": "mem[pointer]--;",
      ">": "pointer++;",
      "<": "pointer--;",
    };
  }

  compile(programm: string) {
    let compiled = `
      if(!input)return;
      const mem = Array(30_000).fill(0);
      let pointer = 0;
      ${this.dict["start with"]}
    `.replace(" ", "");

    for (const command of programm) {
      compiled += this.dict[command];
    }

    return new Function("input", compiled + this.dict["end with"]) as (
      input: string
    ) => string;
  }
}

type TDict =
  | { "start with": string; "end with": string }
  | TOneTypeObject<string>;
