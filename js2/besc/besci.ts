import { BFI } from "./bfi";
import { IRunner, IRunnerStepFunc } from "./types";
import { DynamicEnum } from "./structures";

export class BESCI extends BFI implements IRunner {
  constructor(dynamicEnum: DynamicEnum) {
    super(dynamicEnum);
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
      case "(":
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
