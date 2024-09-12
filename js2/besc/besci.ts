import { BFI } from "./bfi";
import { IRunner, IRunnerStepFunc } from "./types";
import { DynamicEnum } from "./structures";
import managersForTyping from "./managers/main.manager";
import { MemoryManager } from "./managers/memoryBank.manager";

export class BESCI extends BFI implements IRunner {
  private selectedMemBank: MemoryManager;
  private managers: typeof managersForTyping;
  private selectedManagerNameIndex: number;

  constructor(dynamicEnum: DynamicEnum, managers: typeof managersForTyping) {
    super(dynamicEnum);
    this.managers = managers;
    this.selectedManagerNameIndex = 0;
    this.selectedMemBank = managers.stdIO;
    this.runSteps.push(this.besciStep);
  }

  // chains ()_|
  // mem ${}
  // addict ^`
  besciStep: IRunnerStepFunc = (
    commandIndex,
    pointer,
    lastInputCharPointer
  ) => {
    let isWorked = true;
    switch (this.programm[commandIndex]) {
      case "^":
        pointer = this.memory[pointer];
        break;

      case "`":
        this.output += ("_/|pointer:" + String(pointer) + "|\\_").repeat(
          Number(this.afterTurboCommands) || 1
        );
        this.setNotTurbo();
        break;

      case "$":
        let nameIndex = this.selectedManagerNameIndex++;
        if (nameIndex >= Object.keys(this.managers).length - 1)
          this.selectedManagerNameIndex = 0;

        const selectedManagerName = Object.keys(this.managers)[nameIndex];
        this.selectedMemBank = this.managers[selectedManagerName];
        break;

      case "}":
        this.selectedMemBank.pointerPosition++;
        break;
      case "{":
        this.selectedMemBank.pointerPosition--;
        break;

      default:
        isWorked = false;
    }

    return {
      isWorked,
      commandIndex,
      pointer,
      lastInputCharPointer,
    };
  };
}
