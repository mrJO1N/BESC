abstract class Compiler {
  constructor() {
    this.bfToJsDict;

    for (const key in this.bfToJsDict) {
      // this.bfToJsDict[key] = this.bfToJsDict[key].replace(/(\B\s)|\t|\n/g, "");
    }
  }

  protected bfToJsDict = {
    start: `
      const input={inputStr},
        memory=Array(30_000).fill(0);
      let output='',
        pointer=0,
        nextInputIndex=0,
        isTurbo=false,
        afterTurboNum="";

      const setNotTurbo=()=>{
        isTurbo=false;
        afterTurboNum="";
      }
    `,
    end: "return output;",
    "+": `
      memory[pointer] += Number(afterTurboNum) || 1;
      if (memory[pointer] > 256) this.memory[pointer] = 0;
      setNotTurbo();
    `,
    "-": `
      memory[pointer] -= Number(afterTurboNum) || 1;
      if (memory[pointer] < 0) memory[pointer] = 0;
      setNotTurbo();
    `,
    ">": `
      pointer += Number(afterTurboNum) || 1;
      if (pointer > 30_000) pointer = 0;
      setNotTurbo();
    `,
    "<": `
      pointer -= Number(afterTurboNum) || 1;
      if (pointer < 0) pointer = 30_000;
      setNotTurbo();
    `,
    ".": `
      output += String.fromCharCode(memory[pointer]).repeat(
        Number(afterTurboNum) || 1
      );
      setNotTurbo();
    `,
    ",": `
      for (let i of Array(Number(afterTurboNum) || 1)) {
        let charCode = String(input).charCodeAt(nextInputIndex++);
        if (Number.isNaN(charCode)) {
          this.memory[pointer] = 0;
        } else {
          this.memory[pointer] = charCode;
        }
      }
      setNotTurbo();
    `,
    "[": "while(memory[pointer]){",
    "]": "}",

    "!": "isTurbo=true;",
  };

  abstract compile(programm: string, input: string): () => string;
}

export class BFtoJSCompiler extends Compiler {
  compile(programm: string, input: string) {
    let compiledToJs = "";

    compiledToJs += this.bfToJsDict["start"].replace(
      "{inputStr}",
      '"' + input + '"'
    );

    for (const command of programm) {
      if (!this.bfToJsDict[command]) {
        continue;
      }
      compiledToJs += this.bfToJsDict[command];
    }

    compiledToJs += this.bfToJsDict["end"];
    console.log("compiled");
    // console.log(String(compiledToJs));
    return new Function(compiledToJs) as () => string;
  }
}
