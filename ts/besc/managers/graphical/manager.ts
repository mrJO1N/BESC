import { MemoryManager } from "../memoryBank.manager";

export class GraphicalManager extends MemoryManager {
  onMemReaded(pos?: number): void | number {}
  onMemChanged(val: number, pos?: number): void | number {
    console.log("graph cha", val);
  }
  onEnd(): void {}
  onCellEqualOne() {}
}
