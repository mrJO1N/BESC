import { Runner } from "./runner.abstract";
import { DynamicEnum } from "./structures";
import { StdIOManager } from "./managers/stdIO/manager";
import { MemoryManager } from "./managers/memoryBank.manager";
import { BESCISlave } from "./slave-besci";

export class BESCI extends Runner {
  private selectedMemBank: MemoryManager;
  private managers: IManagers;
  private selectedManagerNameIndex: number;

  private chains: { [key: number]: () => Promise<void> } = {};

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
      "(": (commandIndex, pointer, lastInputCharPointer) => {
        const startMatchIndex = this.programm
            .slice(commandIndex)
            .match(/\(/)?.index,
          endMatchIndex = this.programm.slice(commandIndex).match(/\)/)?.index;

        if (startMatchIndex === undefined || endMatchIndex === undefined) {
          throw new Error("Invalid chain syntax");
        }

        commandIndex = endMatchIndex;

        let addictManagerIndex = this.selectedManagerNameIndex;

        if (addictManagerIndex <= 1) addictManagerIndex = 2;
        if (addictManagerIndex > Object.keys(this.managers).length - 1)
          throw new Error("missing addict manager");

        const runner = new BESCISlave(dynamicEnum, {
          stdIO: this.managers.stdIO,
          arithmetic: this.managers.arithmetic,
          addictManager:
            this.managers[Object.keys(this.managers)[addictManagerIndex]],
        });
        runner.programm = this.programm.slice(
          startMatchIndex + 1,
          endMatchIndex
        );

        this.chains[this.memory[pointer]] = async () => runner.run();

        const { graphical, ...managers } = this.managers;
        this.managers = managers;

        return { commandIndex, pointer, lastInputCharPointer };
      },

      ")": (commandIndex, pointer, lastInputCharPointer) => {
        return { commandIndex, pointer, lastInputCharPointer };
      },

      _: (commandIndex, pointer, lastInputCharPointer) => {
        let chain = this.chains[this.memory[pointer]];
        chain();

        return { commandIndex, pointer, lastInputCharPointer };
      },
    };
  }

  set input(val: string) {
    this.managers.stdIO.input = val;
  }

  get output() {
    return this.managers.stdIO.output;
  }

  protected onRunnerEnd(): void {
    for (const key in this.managers) {
      // console.log("ended this", key);
      this.managers[key].onEnd();
    }
  }
}

interface IManagers {
  stdIO: StdIOManager;
  [key: string]: MemoryManager;
}
