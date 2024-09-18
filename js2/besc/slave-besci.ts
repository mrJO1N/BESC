import { Runner } from "./runner.abstract";
import { DynamicEnum } from "./structures";
import { MemoryManager } from "./managers/memoryBank.manager";
import { StdIOManager } from "./managers/stdIO/manager";

export class BESCISlave extends Runner {
  private selectedMemBank: MemoryManager;
  private managers: IManagers;
  private selectedManagerNameIndex: number;

  constructor(dynamicEnum: DynamicEnum, managers: IManagers) {
    super(dynamicEnum);
    this.managers = managers;
    this.selectedManagerNameIndex = 1;
    this.selectedMemBank = managers.stdIO;

    // add addict commands
    this.commandRunners = {
      ...this.commandRunners,
      "^": (commandIndex, pointer, lastInputCharPointer) => {
        pointer = this.memory[pointer];

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "`": (commandIndex, pointer, lastInputCharPointer) => {
        this.managers.stdIO.addDevOutput(
          ("_/|pointer:" + String(pointer) + "|\\_").repeat(
            Number(this.afterTurboCommands) || 1
          )
        );
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },
    };

    // add memory management
    this.commandRunners = {
      ...this.commandRunners,

      $: (commandIndex, pointer, lastInputCharPointer) => {
        let nameIndex = this.selectedManagerNameIndex++;
        if (nameIndex >= Object.keys(this.managers).length - 1) {
          this.selectedManagerNameIndex = 0;
        }

        const selectedManagerName = Object.keys(this.managers)[nameIndex];
        this.selectedMemBank = this.managers[selectedManagerName];

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "}": (commandIndex, pointer, lastInputCharPointer) => {
        this.selectedMemBank.pointerPosition++;

        return { commandIndex, pointer, lastInputCharPointer };
      },

      "{": (commandIndex, pointer, lastInputCharPointer) => {
        this.selectedMemBank.pointerPosition--;

        return { commandIndex, pointer, lastInputCharPointer };
      },

      ".": (commandIndex, pointer, lastInputCharPointer) => {
        if (!this.afterTurboCommands) {
          this.selectedMemBank.cell = this.memory[pointer];
        } else {
          for (let i = 0; i < Number(this.afterTurboCommands) - 1 || 1; i++) {
            this.selectedMemBank.cell = this.memory[pointer];
          }
          this.setNotTurbo();
        }

        return { commandIndex, pointer, lastInputCharPointer };
      },

      ",": (commandIndex, pointer, lastInputCharPointer) => {
        for (let i of Array(Number(this.afterTurboCommands) || 1)) {
          let charCode = this.selectedMemBank.cell;
          if (!Number.isNaN(charCode)) {
            this.memory[pointer] = charCode;
          }
        }
        this.setNotTurbo();

        return { commandIndex, pointer, lastInputCharPointer };
      },
    };

    // add chains management
    this.commandRunners = {
      ...this.commandRunners,

      "|": (commandIndex, pointer, lastInputCharPointer) => {
        console.log("foo");
        return { commandIndex, pointer, lastInputCharPointer };
      },
    };
  }

  protected onRunnerEnd(): void {}
}

interface IManagers {
  stdIO: StdIOManager;
  [key: string]: MemoryManager;
}
