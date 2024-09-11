import { DynamicEnum } from "./structures";
import { IRunner, IRunnerStepFunc } from "./types";
import { getMatchIndexes } from "./utils";

export class BFI implements IRunner {
  output = "";
  programm = "";
  input = "";

  protected memory: number[];
  private breacketsMap: DynamicEnum;
  maxIterationsCount: number;
  private iterationsCount = 0;
  protected isTurbo: boolean;
  protected afterTurboCommands = "";
  protected runSteps: IRunnerStepFunc[] = [];

  constructor(dynamicEnum: DynamicEnum) {
    this.breacketsMap = dynamicEnum;
    this.runSteps.push(this.bfStep);
  }

  private getreacketsMap(programm: string): DynamicEnum {
    const map = new DynamicEnum();
    const startMatches = getMatchIndexes(programm, /\[/g),
      endMatches = getMatchIndexes(programm, /\]/g);

    if (!startMatches || !endMatches) {
      console.log("'[' or ']' is not exist");
    }
    if (startMatches.length != endMatches.length) {
      console.log("quantity of '[' and ']' is different");
    }
    for (let i = 0; i < startMatches.length; i++) {
      map.add({ key: startMatches[i], val: endMatches[i] });
    }
    return map;
  }

  protected readonly setNotTurbo = () => {
    this.afterTurboCommands = "";
    this.isTurbo = false;
  };

  bfStep: IRunnerStepFunc = (commandIndex, pointer, lastInputCharPointer) => {
    const command = this.programm[commandIndex];
    let isWorked = true;
    switch (command) {
      case "!":
        this.isTurbo = true;
        break;
      case ">":
        pointer += Number(this.afterTurboCommands) || 1;
        if (pointer > 30_000) pointer = 0;
        this.setNotTurbo();
        break;

      case "<":
        pointer -= Number(this.afterTurboCommands) || 1;
        if (pointer < 0) pointer = 30_000;
        this.setNotTurbo();
        break;

      case "+":
        this.memory[pointer] += Number(this.afterTurboCommands) || 1;
        if (this.memory[pointer] > 256) this.memory[pointer] = 0;
        this.setNotTurbo();
        break;

      case "-":
        this.memory[pointer] -= Number(this.afterTurboCommands) || 1;
        if (this.memory[pointer] < 0) this.memory[pointer] = 0;
        this.setNotTurbo();
        break;

      case ".":
        this.output += String.fromCharCode(this.memory[pointer]).repeat(
          Number(this.afterTurboCommands) || 1
        );
        this.setNotTurbo();
        break;

      case ",":
        for (let i of Array(Number(this.afterTurboCommands) || 1)) {
          let charCode = String(this.input).charCodeAt(lastInputCharPointer++);
          if (Number.isNaN(charCode)) {
            this.memory[pointer] = 0;
          } else {
            this.memory[pointer] = charCode;
          }
        }
        this.setNotTurbo();
        break;

      case "[":
        if (this.memory[pointer] == 0) {
          commandIndex = this.breacketsMap.find(commandIndex);
        }
        break;

      case "]":
        commandIndex = this.breacketsMap.find(commandIndex) - 1;
        break;
      case !Number.isNaN(Number(command)) ? command : "0":
        if (this.isTurbo) {
          this.afterTurboCommands += command;
        }
        break;
      default:
        isWorked = false;
    }

    return {
      commandIndex,
      pointer,
      lastInputCharPointer,
      isWorked,
    };
  };

  run(): void {
    this.memory = Array(30_000).fill(0);
    let commandIndex = 0;
    let pointer = 0;
    let lastInputCharPointer = 0;
    let maxIterationsCount =
      this.maxIterationsCount ?? this.programm.length ** this.input.length * 2;

    this.breacketsMap = this.getreacketsMap(this.programm);
    while (commandIndex < this.programm.length) {
      if (this.iterationsCount > maxIterationsCount) break;

      let isWorked = false;
      for (const runStep of this.runSteps) {
        ({ commandIndex, pointer, lastInputCharPointer, isWorked } = runStep(
          commandIndex,
          pointer,
          lastInputCharPointer
        ));

        if (isWorked) {
          break;
        }
      }

      commandIndex++;
      this.iterationsCount++;
    }
  }
}
