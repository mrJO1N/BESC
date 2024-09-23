import { Validator } from "../validators/abstract.valid";

export abstract class Compiler {
  protected dict: TDict = { "start with": () => "", "end with": () => "" };

  constructor(validator: Validator) {
    this.dict = {
      ...this.dict,
      "[": () => "while(mem[pointer]!==0){",
      "]": () => "}",
      "+": (count = 1) => `mem[pointer]+=${count};`,
      "-": (count = 1) => `mem[pointer]-=${count};`,
      ">": (count = 1) => `pointer+=${count};`,
      "<": (count = 1) => `pointer-=${count};`,

      "!": () => "",
    };
  }

  compile(programm: string) {
    let compiled = `
      if(!input)input="";
      let isTurbo = false,
        charCode;
  
      const mem = Array(30_000).fill(0);
      let pointer = 0;
      ${this.dict["start with"]()}
    `.replace(/\s+\B/g, "");

    const turbos = {};
    [...programm.matchAll(/!(\d+)([+\-<>{},.])/g)].forEach((val) => {
      turbos[val.index + 2 + val[1].length] = val[1];
    });

    let commandIndex = 0;
    for (const command of programm) {
      commandIndex++;
      if (command.match(/\d/)) continue;

      compiled += this.dict[command](turbos[commandIndex]);
    }

    compiled += this.dict["end with"]();

    return new Function("input", compiled) as (input?: string) => string;
  }
}

type TDict = {
  "start with": () => string;
  "end with": () => string;
  [key: string]: (count?: number) => string;
};
