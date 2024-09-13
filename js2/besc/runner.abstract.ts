import { DynamicEnum } from "./structures";
import { IRunnerCommands } from "./types";
import { getMatchIndexes } from "./utils";

export abstract class Runner {
  programm: string;

  protected abstract onRunnerEnd(): void;

  protected memory: number[];
  protected breacketsMap: DynamicEnum;
  maxIterationsCount: number;
  private iterationsCount = 0;
  protected isTurbo: boolean;
  protected afterTurboCommands = "";
  protected commandRunners: IRunnerCommands = {};

  constructor(dynamicEnum: DynamicEnum) {
    this.breacketsMap = dynamicEnum;

    this.commandRunners = {
      ...this.commandRunners,
      "!": (commandIndex, pointer, lastInputCharPointer) => {
        this.isTurbo = true;
        return { commandIndex, pointer, lastInputCharPointer };
      },

      ">": (commandIndex, pointer, lastInputCharPointer) => {
        pointer += Number(this.afterTurboCommands) || 1;
        if (pointer > 30_000) pointer = 0;
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "<": (commandIndex, pointer, lastInputCharPointer) => {
        pointer -= Number(this.afterTurboCommands) || 1;
        if (pointer < 0) pointer = 30_000;
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "+": (commandIndex, pointer, lastInputCharPointer) => {
        this.memory[pointer] += Number(this.afterTurboCommands) || 1;
        if (this.memory[pointer] > 256) this.memory[pointer] = 0;
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "-": (commandIndex, pointer, lastInputCharPointer) => {
        this.memory[pointer] -= Number(this.afterTurboCommands) || 1;
        if (this.memory[pointer] < 0) this.memory[pointer] = 0;
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "[": (commandIndex, pointer, lastInputCharPointer) => {
        if (this.memory[pointer] == 0) {
          commandIndex = this.breacketsMap.find(commandIndex);
        }

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "]": (commandIndex, pointer, lastInputCharPointer) => {
        commandIndex = this.breacketsMap.find(commandIndex) - 1;

        return { commandIndex, pointer, lastInputCharPointer };
      },
    };
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

  run(): void {
    this.memory = Array(30_000).fill(0);
    let commandIndex = 0;
    let pointer = 0;
    let lastInputCharPointer = 0;
    let maxIterationsCount = this.maxIterationsCount ?? 10_000;

    this.breacketsMap = this.getreacketsMap(this.programm);
    while (commandIndex < this.programm.length) {
      if (this.iterationsCount > maxIterationsCount) break;

      const command = this.programm[commandIndex];

      if (!Number.isNaN(Number(command)) && this.isTurbo) {
        this.afterTurboCommands += command;
      } else
        ({ commandIndex, pointer, lastInputCharPointer } = this.commandRunners[
          command
        ](commandIndex, pointer, lastInputCharPointer));

      commandIndex++;
      this.iterationsCount++;
    }
    this.onRunnerEnd();
  }
}
