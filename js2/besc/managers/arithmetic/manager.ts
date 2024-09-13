import { MemoryManager } from "../memoryBank.manager";

export class ArithmeticManager extends MemoryManager {
  onMemReaded(pos?: number): void | number {
    console.log("arithmetic mem read");
  }
  onEnd(): void {}
  onMemChanged(): void | number {
    console.log("arithmetic mem change");
  }
}
