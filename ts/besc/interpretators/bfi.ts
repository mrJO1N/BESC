import { Runner } from "./runner.abstract";
import { DynamicEnum } from "../utils/structures";

export class BFI extends Runner {
  programm = "";
  private outputStr = "";
  private inputStr = "";

  set input(val: string) {
    this.inputStr = val;
  }

  get output() {
    return this.outputStr;
  }

  constructor(dynamicEnum: DynamicEnum) {
    super(dynamicEnum);

    this.commandRunners = {
      ...this.commandRunners,
      ",": (commandIndex, pointer, lastInputCharPointer) => {
        for (let i of Array(Number(this.afterTurboCommands) || 1)) {
          let charCode = String(this.inputStr).charCodeAt(
            lastInputCharPointer++
          );
          if (Number.isNaN(charCode)) {
            this.memory[pointer] = 0;
          } else {
            this.memory[pointer] = charCode;
          }
        }
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },

      ".": (commandIndex, pointer, lastInputCharPointer) => {
        this.outputStr += String.fromCharCode(this.memory[pointer]).repeat(
          Number(this.afterTurboCommands) || 1
        );
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },
    };
  }
  protected onRunnerEnd(): void {}
}
