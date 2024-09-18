import { MemoryManager } from "../memoryBank.manager";

export class StdIOManager extends MemoryManager {
  private _output = "";

  private toOutputNums: number[] = [];

  get output(): string {
    return this._output;
  }
  set input(val: string) {
    const charCodes = val.split("").map((c) => c.charCodeAt(0));
    for (let i = 0; i < val.length; i++) {
      if (!charCodes[i]) break;
      this.memory[i] = charCodes[i];
    }
  }

  onEnd(): void {
    for (const charCode of this.toOutputNums) {
      this._output += String.fromCharCode(charCode);
    }
  }
  onMemChanged(val: number, pos?: number): void | number {
    this.toOutputNums.push(val);
    return 1;
  }
  onMemReaded(pos?: number): void | number {
    return this.memory[this.pointerPosition++];
  }

  addDevOutput(val: string) {
    this._output += val;
  }
  onCellEqualOne() {}
}
